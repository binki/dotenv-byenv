# Purpose

The purpose of this package is to load `.env` files in a similar way to how [`react-scripts` does](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) for server-side apps.
This is quite different from the popular [`dotenv`](https://www.npmjs.com/package/dotenv) works.

# Install

```
npm install -S dotenv-byenv
```

# Usage

Before accessing `process.env`, you must call `config()`.
For example:

```js
require('dotenv-byenv').config();
```

`.env` files are found and loaded depending on your current environment.
Recommended environments are `development`, `production`, and `test`.
If no environment is specified by the system, `NODE_ENV` will be set to `development.
Due to the nature of the load order, specifying `NODE_ENV` in `.env.local` does not make sense and the value will be ignored (because it is set prior to checking `.env` files).
To specify the environment, set `NODE_ENV` in the system environment (e.g., on POSIX: `NODE_ENV=production node index.js`).

The load order is as follows: `.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, `.env.local`, `.env`.
Common NODE_ENV values are below:

1. `development`: `.env.development.local`, `.env.development`, `.env.local`, `.env`.
2. `production`: `.env.production.local`, `.env.production`, `.env.local`, `.env`.
3. `test`: `.env.test.local`, `.env.test`, `.env.local`, `.env`.

If a variable is already set on `process.env` and a file, the value already in `process.env` takes precedence.
Since the files are loaded in the order above, this means that only the value in the most specific file will be used.
For example, if a variable is both in `.env.local` and `.env`, the value in `.env` will be ignored.
Additionally, if a variable is passed via the system environment (e.g., on POSIX: `MY_VAR=x node index.js`) and in a file, the variable from the system environment is preferred.

You should commit all `.env` files except for those ending in `.local`.
This way, each developer can configure their specific values by editing `.env.local` or an environment-specific `.local` file without conflicting with other developers working on the same project.
*Note: this recommendation goes against [the best practice recommended by the `dotenv` project](https://www.npmjs.com/package/dotenv#should-i-commit-my-env-file).
This difference is intentional.*
To achieve this, place the following in `.gitignore`:

```
*.local
```

## Preload

You may use the preload script to inject configuration into scripts without modifying them.
Simply instruct the environment to load the `dotenv-byenv/config` module:

```
$ node -r dotenv-byenv/config index.js
```
