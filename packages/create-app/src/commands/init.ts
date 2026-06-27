import path from 'path';
import { existsSync } from 'fs';
import { intro, outro, text, confirm, spinner, isCancel, cancel } from '@clack/prompts';
import { cloneTemplate, cloneTemplateForce } from '../utils/git.js';
import { cleanupScaffold } from '../utils/cleanup.js';
import { renameProject } from '../utils/rename.js';

export async function initAction(
  projectName?: string,
  destination?: string,
  options?: { force?: boolean },
): Promise<void> {
  intro('✨ Scaffold a new project');

  const name = projectName ?? (await text({
    message: 'What is the name of your project?',
    placeholder: 'my-project',
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (!/^[a-z0-9-]+$/.test(value)) return 'Use lowercase letters, numbers, and hyphens only';
    },
  }));

  if (isCancel(name)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  const defaultDest = `./${name}`;
  const dest = destination ?? (await text({
    message: 'Where should we create the project?',
    placeholder: defaultDest,
    defaultValue: defaultDest,
  }));

  if (isCancel(dest)) {
    cancel('Operation cancelled');
    process.exit(0);
  }

  const resolvedDest = path.resolve(dest as string);

  if (existsSync(resolvedDest) && !options?.force) {
    const overwrite = await confirm({
      message: `Directory "${dest}" already exists. Overwrite?`,
      initialValue: false,
    });

    if (isCancel(overwrite) || !overwrite) {
      cancel('Operation cancelled');
      process.exit(0);
    }
  }

  const s = spinner();

  s.start('Cloning template...');
  try {
    if (existsSync(resolvedDest)) {
      await cloneTemplateForce(resolvedDest);
    } else {
      await cloneTemplate(resolvedDest);
    }
  } catch (error) {
    s.stop('Clone failed');
    console.error((error as Error).message);
    process.exit(1);
  }

  s.message('Cleaning up template artifacts...');
  await cleanupScaffold(resolvedDest);

  s.message(`Renaming to "${name}"...`);
  await renameProject(resolvedDest, name as string);

  s.stop('Done!');

  outro(`
  ✅ Project "${name}" created at ${resolvedDest}

  Next steps:

    cd ${dest}
    pnpm install
    pnpm dev
  `);
}
