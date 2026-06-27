#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';
import { initAction } from './commands/init.js';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
  .name('create-app')
  .description('Scaffold a new project from the react-fastify monorepo template')
  .version(version)
  .argument('[project-name]', 'Name of the new project (lowercase, hyphens only)')
  .argument('[destination]', 'Output directory (defaults to ./<project-name>)')
  .option('-f, --force', 'Overwrite destination if it already exists')
  .action(initAction);

program.parse();
