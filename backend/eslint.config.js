import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn',
            'no-debugger': 'error',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { 'argsIgnorePattern': '^_' }
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    'selector': 'interface',
                    'format': ['PascalCase'],
                    'prefix': ['I']
                },
                {
                    'selector': 'typeAlias',
                    'format': ['PascalCase']
                }
            ],
        },
    },
    prettierConfig,
    {
        ignores: ['dist/**', 'node_modules/**', 'prisma/**', 'eslint.config.js'],
    }
);