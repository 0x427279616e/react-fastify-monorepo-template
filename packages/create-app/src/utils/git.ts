import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import path from 'path';

const REPO_URL = 'https://github.com/0x427279616e/react-fastify-monorepo-template.git';

export async function cloneTemplate(dest: string): Promise<void> {
  if (existsSync(dest)) {
    throw new Error(`Destination "${dest}" already exists. Use --force to overwrite.`);
  }

  execSync(`git clone --depth 1 ${REPO_URL} "${dest}"`, {
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
