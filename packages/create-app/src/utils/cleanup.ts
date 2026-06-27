import { rm } from 'fs/promises';
import path from 'path';

const REMOVALS = [
  'packages/create-app',
  '.commandcode',
  '.turbo',
  'pnpm-lock.yaml',
  'package-lock.json',
];

export async function cleanupScaffold(projectRoot: string): Promise<void> {
  const errors: string[] = [];

  for (const name of REMOVALS) {
    try {
      await rm(path.join(projectRoot, name), { recursive: true, force: true });
    } catch {
      // file may not exist — ignore
    }
  }

  if (errors.length > 0) {
    throw new Error(`Failed to remove: ${errors.join(', ')}`);
  }
}
