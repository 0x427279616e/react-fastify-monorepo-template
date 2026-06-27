import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MONOREPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

function getRepoUrl(): string {
  try {
    const origin = execSync('git config --get remote.origin.url', {
      encoding: 'utf-8',
      cwd: MONOREPO_ROOT,
    }).trim();
    return origin;
  } catch {
    return 'https://github.com/bryansurio14/react-fastify-monorepo-template.git';
  }
}

export async function cloneTemplate(dest: string): Promise<void> {
  if (existsSync(dest)) {
    throw new Error(`Destination "${dest}" already exists. Use --force to overwrite.`);
  }

  const repoUrl = getRepoUrl();

  execSync(`git clone --depth 1 ${repoUrl} "${dest}"`, {
    stdio: 'inherit',
  });

  await rm(path.join(dest, '.git'), { recursive: true, force: true });
}

export async function cloneTemplateForce(dest: string): Promise<void> {
  if (existsSync(dest)) {
    await rm(dest, { recursive: true, force: true });
  }
  await cloneTemplate(dest);
}
