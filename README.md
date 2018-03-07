# Simple CRUD app

A simple base for React and Redux app with webpack and css compilation support.

## Development environment requirements

- NodeJS - https://nodejs.org/en/download/

After installing NodeJS you need to install 'yarn' which will be later on used to build and start the app.

`npm install -g yarn`

**NOTE:** you don't need yarn as npm can be used directly, but yarn is much much faster.

## First time launch

Before you will be able to build an application you need to install all needed modules.
You can do it by executing:

`yarn`

or if you are not usiing yarn:

`npm install`

## Debugging

Instead of building an entire app while development you can use configured `webpack` server to serve javascript files to the browser.

To use webpack, execute

`yarn dev`

or

`npm run dev`

It will launch local webpack server with which will serve javascript files on:

`http://localhost:8080`.

## Production

In order to create a build compilation for production you need to execute npm command:

`yarn build`

or

`npm run build`.

If you would like to launch it locally you can do it with:

`yarn start`

or

`npm run start`
