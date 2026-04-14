export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'test', 'chore', 'docs', 'perf', 'revert'],
    ],
    'subject-case': [0],
  },
}