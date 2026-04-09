#!/usr/bin/env node

/**
 * F2 Data Validator
 *
 * Validates that a JSON data file conforms to F2 requirements:
 * - Must be a JSON array
 * - Each element must be a plain object (not null, array, or primitive)
 * - All elements should have consistent fields (warns on inconsistencies)
 * - Checks for common data quality issues
 *
 * Usage:
 *   node validate-data.mjs <data-file.json>
 *   echo '[{"x":1}]' | node validate-data.mjs --stdin
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node validate-data.mjs <data-file.json>');
  console.log('       echo \'[...]\' | node validate-data.mjs --stdin');
  process.exit(1);
}

let rawData;

if (args[0] === '--stdin') {
  // Read from stdin synchronously (for pipe usage)
  const fs = await import('fs');
  rawData = fs.readFileSync(0, 'utf8');
} else {
  const filePath = resolve(process.cwd(), args[0]);
  rawData = readFileSync(filePath, 'utf8');
}

let data;
try {
  data = JSON.parse(rawData);
} catch (e) {
  console.error('ERROR: Invalid JSON format.');
  console.error(`  ${e.message}`);
  process.exit(1);
}

const errors = [];
const warnings = [];

// Check 1: Must be an array
if (!Array.isArray(data)) {
  errors.push(`Data must be a JSON array, got ${typeof data}.`);
} else {
  // Check 2: Non-empty
  if (data.length === 0) {
    errors.push('Data array is empty.');
  }

  // Check 3: Each element must be a plain object
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null || data[i] === undefined) {
      errors.push(`data[${i}] is null/undefined. Each element must be a plain object.`);
    } else if (typeof data[i] !== 'object' || Array.isArray(data[i])) {
      errors.push(`data[${i}] is ${Array.isArray(data[i]) ? 'an array' : typeof data[i]}. Each element must be a plain object.`);
    }
  }

  // Check 4: Consistent fields
  if (data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0]) && data[0] !== null) {
    const referenceFields = Object.keys(data[0]).sort();
    const fieldSet = new Set(referenceFields);

    for (let i = 1; i < data.length; i++) {
      if (typeof data[i] !== 'object' || data[i] === null) continue;
      const currentFields = Object.keys(data[i]).sort();
      const currentSet = new Set(currentFields);

      // Missing fields
      for (const field of referenceFields) {
        if (!currentSet.has(field)) {
          warnings.push(`data[${i}] is missing field "${field}" (present in data[0]).`);
        }
      }

      // Extra fields
      for (const field of currentFields) {
        if (!fieldSet.has(field)) {
          warnings.push(`data[${i}] has extra field "${field}" (not in data[0]).`);
        }
      }
    }

    // Check 5: Field type consistency
    for (const field of referenceFields) {
      const types = new Set();
      for (const item of data) {
        if (item && typeof item === 'object' && field in item) {
          const val = item[field];
          if (val === null || val === undefined) continue;
          if (Array.isArray(val)) {
            types.add('array');
          } else {
            types.add(typeof val);
          }
        }
      }

      if (types.size > 1) {
        warnings.push(`Field "${field}" has mixed types: ${[...types].join(', ')}. F2 may auto-infer scale type incorrectly.`);
      }
    }

    // Check 6: Warn about null/undefined values
    let nullCount = 0;
    for (const item of data) {
      if (!item || typeof item !== 'object') continue;
      for (const field of referenceFields) {
        if (item[field] === null || item[field] === undefined) {
          nullCount++;
        }
      }
    }
    if (nullCount > 0) {
      warnings.push(`Found ${nullCount} null/undefined field value(s). Consider using connectNulls={true} on Line/Area components.`);
    }

    // Summary
    console.log(`Data validation for ${data.length} records, ${referenceFields.length} fields.`);
    console.log(`Fields: ${referenceFields.join(', ')}`);
  }
}

// Output results
if (errors.length > 0) {
  console.log('\nERRORS:');
  errors.forEach((e) => console.log(`  [x] ${e}`));
}

if (warnings.length > 0) {
  console.log('\nWARNINGS:');
  warnings.forEach((w) => console.log(`  [!] ${w}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\nOK: Data is valid for F2.');
  process.exit(0);
} else {
  process.exit(errors.length > 0 ? 1 : 0);
}
