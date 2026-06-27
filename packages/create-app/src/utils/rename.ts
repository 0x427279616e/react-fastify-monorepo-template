import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { execSync } from 'child_process';
import path from 'path';

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist']);
const TEXT_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.json', '.yaml', '.yml',
  '.md', '.html', '.css', '.env', '.env.example', '.gitattributes',
  '.gitignore', '.prettierrc', '.http', '.toml',
]);

function isTextFile(name: string): boolean {
  const ext = path.extname(name);
  return TEXT_EXTENSIONS.has(ext) || name === '.env' || name.startsWith('.env.');
}

async function walkAndReplace(
  dir: string,
  replacements: [RegExp, string][],
): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (SKIP_DIRS.has(entry.name)) continue;

    if (entry.isDirectory()) {
      await walkAndReplace(fullPath, replacements);
    } else if (entry.isFile() && isTextFile(entry.name)) {
      let content: string;
      try {
        content = await readFile(fullPath, 'utf-8');
      } catch {
        // skip binary files
        continue;
      }

      let changed = false;
      for (const [pattern, replacement] of replacements) {
        const newContent = content.replace(pattern, replacement);
        if (newContent !== content) {
          content = newContent;
          changed = true;
        }
      }

      if (changed) {
        await writeFile(fullPath, content, 'utf-8');
      }
    }
  }
}

export async function renameProject(
  projectRoot: string,
  projectName: string,
): Promise<void> {
  const replacements: [RegExp, string][] = [
    [/\bproject-template\b/g, projectName],
    [/\bProject Template\b/g, projectName],
    [/@template/g, `@${projectName}`],
  ];

  await walkAndReplace(projectRoot, replacements);

  execSync('git init', { cwd: projectRoot, stdio: 'ignore' });
}
