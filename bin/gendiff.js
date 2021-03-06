#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.2')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options = program.opts()) => {
    const difference = genDiff(filepath1, filepath2, options.format);
    console.log(difference);
  });

program.parse(process.argv);
