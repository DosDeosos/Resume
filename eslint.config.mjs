import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  sonarjs.configs.recommended,
  {
    rules: {
      "react-hooks/set-state-in-effect": "error",
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-dead-store": "error",
      "sonarjs/no-nested-conditional": "error",
      "sonarjs/pseudo-random": "error",
      "sonarjs/no-unused-vars": "error",
      "sonarjs/use-type-alias": "error",
      "sonarjs/unused-import": "error",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
          message:
            "Raw HTML injection is prohibited. Render React nodes instead.",
        },
        {
          selector: "JSXAttribute[name.name='srcDoc']",
          message:
            "iframe srcDoc is prohibited because it creates an HTML injection sink.",
        },
        {
          selector: "AssignmentExpression[left.property.name='innerHTML']",
          message: "Direct innerHTML assignment is prohibited.",
        },
        {
          selector: "AssignmentExpression[left.property.name='outerHTML']",
          message: "Direct outerHTML assignment is prohibited.",
        },
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: "insertAdjacentHTML is prohibited.",
        },
        {
          selector:
            "CallExpression[callee.object.name='document'][callee.property.name='write']",
          message: "document.write is prohibited.",
        },
      ],
    },
  },
  {
    files: [
      "src/**/*.{ts,tsx}",
      ".storybook/**/*.{ts,tsx}",
      "scripts/**/*.mjs",
      "e2e/**/*.ts",
    ],
    rules: {
      "max-lines": [
        "error",
        { max: 500, skipBlankLines: true, skipComments: true },
      ],
    },
  },
  {
    files: ["src/app/**/opengraph-image.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "coverage/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
