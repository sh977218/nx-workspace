#!/usr/bin/env node

const prTitle = process.argv[2];

const TYPE = 'feat|fix|docs|style|refactor|perf|test|chore|build|ci|revert|poc';
const SCOPE = 'repo|ui|api|ui & api';
const BOT_SCOPE = 'deps|deps-dev';

const regex = new RegExp(
  `^(${TYPE})\\(${SCOPE}|${BOT_SCOPE}\\)(!)?:\\s.+$`,
  'i',
);

console.log('PR Title:', prTitle);
console.log('Validating against pattern:', regex);

if (!regex.test(prTitle)) {
  console.error('❌ Invalid PR title!');
  console.error('Example: feat(repo): adds fancy feature');
  console.error(`Pattern: ${regex}`);
  process.exit(1);
}

process.exit(0);
