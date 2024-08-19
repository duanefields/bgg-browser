# BGG Collection Browser

Board Game Geek collection browser, deployed at <https://bgg2.fastwombat.com>.

This application uses the Board Game Geek XML API to allow you to browse anyone's collection. The
application is optimized for mobile use and makes extensive use of caching and background updating
to be nice and fast after the initial load. Click or tap on any game to open it at Board Game Geek.
Filters let you find a game in your collection quickly, by player count and play time. You can even
sort the results randomly to help in choosing a game from the filtered titles.

## Dependencies and Prerequisites

You will need the version of node specified in the [`.nvmrc`](.nvmrc) file. If you are using
[nvm](https://github.com/nvm-sh/nvm) you can switch to the correct version of node by running the
command:

```shell
nvm use
```

You will need to install the required node modules:

```shell
npm install
```

## Running in Development Mode

This application was build with [Vite](https://vitejs.dev). Running the development server is
simple:

```shell
npm run dev
```

## Code Formatting and Style

### Prettier

This project enforces code formatting with [Prettier](https://prettier.io/). If you are running
Visual Studio Code it is recommended that you install the
[Prettier Formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### ESLint

This project enforces code quality with [ESLint](https://eslint.org). If you are running Visual
Studio Code it is recommended that you install the
[ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This
will provide you with real-time linting on files in your editor. See the documentation for tips on
[integration with other editors](https://eslint.org/docs/user-guide/integrations). But if you prefer
you can from the linter from the command line:

```shell
npm run lint
```

## Testing

This project uses [Vitest](https://vitest.dev) for testing. None of the tests hit the proxy server
and utilize mock responses provided by [Mock Service Worker](https://mswjs.io). You can mock
additional responses by editing [mockServer.ts](src/mockServer.ts) and adding the JSON responses to
the [test](src/test) folder.

If you are running Visual Studio Code it is recommended that you install the
[Vitest extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer). But if you
prefer you can run tests from the command line:

```shell
npm run test
```

To run tests with code coverage:

```shell
npm run coverage
```
