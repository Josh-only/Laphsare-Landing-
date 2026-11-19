# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Waitlist submissions

The waitlist form submits email addresses and the selected role (Student or Agent) to Formspree.

1. Create a form in your [Formspree dashboard](https://formspree.io/forms) and configure its notification email.
2. Copy the form ID from the form's endpoint.
3. Set `VITE_FORMSPREE_FORM_ID` to that ID in your local `.env.local` file and in the Vercel project's environment variables.
4. Redeploy after setting the Vercel variable.

Example local `.env.local`:

```dotenv
VITE_FORMSPREE_FORM_ID=your_form_id
```

The Formspree form ID is used by the browser to submit the form; do not put a private API key in a `VITE_` variable. The contact form is still a local preview and does not send submissions.
