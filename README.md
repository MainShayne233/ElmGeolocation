# Elm Orlando Hack Project

Building an Elm geolocation project that works with the Google Maps API.

# Setup

- `npm install --global elm create-elm-app`
- `git clone https://github.com/ElmOrlando/ElmGeolocation.git`
- `cd ElmGeolocation`
- `elm-package install`
- `npm start`

# Create Elm App Info

This project is bootstrapped with [Create Elm App](https://github.com/halfzebra/create-elm-app).

## Installing Elm packages

```sh
elm-app package install <package-name>
```

## Installing JavaScript packages

To use JavaScript packages from npm, you'll need to add a `package.json`, install the dependencies, and you're ready to go.

```sh
npm init -y # Add package.json
npm install --save-dev pouchdb-browser # Install library from npm
```

```js
// Use in your JS code
var PouchDB = require('pouchdb-browser');
var db = new PouchDB('mydb');
```

## Folder structure

```
my-app/
  .gitignore
  README.md
  elm-package.json
  src/
    App.elm
    favicon.ico
    index.html
    index.js
    main.css
  tests/
    elm-package.json
    Main.elm
    Tests.elm
```

For the project to build, these files must exist with exact filenames:

- `src/index.html` is the page template;
- `src/favicon.ico` is the icon you see in the browser tab;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside src.

## Available scripts

In the project directory you can run:

### `elm-app build`

Builds the app for production to the `build` folder.  

The build is minified, and the filenames include the hashes.  

Your app is ready to be deployed!

### `elm-app start`

Runs the app in the development mode.  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  

You will also see any lint errors in the console.

### `elm-app test`

Run tests with [node-test-runner](https://github.com/rtfeldman/node-test-runner/tree/master)

You can make test runner watch project files by running:

```sh
elm-app test --watch
```

### `elm-app eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Elm Platform, etc.) right into your project, so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you’re on your own.

You don’t have to use 'eject' The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `elm-app <elm-platform-comand>`

Create Elm App does not rely on the global installation of Elm Platform, but you still can use it's local Elm Platform to access default command line tools:

#### `package`

Alias for [elm-package](http://guide.elm-lang.org/get_started.html#elm-package)

Use it for installing Elm packages from [package.elm-lang.org](http://package.elm-lang.org/)

To use packages in tests, you also need to install them in `tests` directory.

```sh
cd tests
elm-app package install xxx/yyy
```

#### `repl`

Alias for [elm-repl](http://guide.elm-lang.org/get_started.html#elm-repl)

#### `make`

Alias for  [elm-make](http://guide.elm-lang.org/get_started.html#elm-make)

#### `reactor`

Alias for  [elm-reactor](http://guide.elm-lang.org/get_started.html#elm-reactor)

## Adding Images and Fonts

With Webpack, using static assets like images and fonts works similarly to CSS.

By requiring an image in JavaScript code, you tell Webpack to add a file to the build of your application. The variable will contain a unique path to the said file.

Here is an example:

```js
require('./main.css');
var logoPath = require('./logo.svg'); // Tell Webpack this JS file uses this image
var Elm = require('./App.elm');

var root = document.getElementById('root');

Elm.App.embed(root, logoPath); // Pass image path as a flag.
```

Later on, you can use the image path in your view for displaying it in the DOM.

```elm
view : Model -> Html Msg
view model =
    div []
        [ img [ src model.logo ] []
        , div [] [ text model.message ]
        ]
```

## Setting up API Proxy

To forward the API ( REST ) calls to backend server, add a proxy to the `elm-package.json` in the top level json object.

```json
{
    ...
    "proxy" : "http://localhost:1313",
    ...
}
```

Make sure the XHR requests set the `Content-type: application/json` and `Accept: application/json`.
The development server has heuristics, to handle it's own flow, which may interfere with proxying of 
other html and javascript content types.

```sh
 curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  http://localhost:3000/api/list
```

## IDE setup for Hot Module Replacement

Remember to disable [safe write](https://webpack.github.io/docs/webpack-dev-server.html#working-with-editors-ides-supporting-safe-write) if you are using VIM or IntelliJ IDE, such as WebStorm.

## Deployment


`elm-app build` creates a `build` directory with a production build of your app. Set up your favourite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

### GitHub Pages

>Note: this feature is available with `react-scripts@0.2.0` and higher.

#### Step 1: Add `homepage` to `package.json`

**The step below is important!**<br>
**If you skip it, your app will not deploy correctly.**

Open your `package.json` and add a `homepage` field:

```js
  "homepage": "https://myusername.github.io/my-app",
```

Create React App uses the `homepage` field to determine the root URL in the built HTML file.

The `predeploy` script will run automatically before `deploy` is run.

#### Step 2: Deploy the site by running `gh-pages -d build`

Then run:

```sh
gh-pages -d build
```

#### Step 3: Ensure your project’s settings use `gh-pages`

Finally, make sure **GitHub Pages** option in your GitHub project settings is set to use the `gh-pages` branch:

<img src="http://i.imgur.com/HUjEr9l.png" width="500" alt="gh-pages branch setting">

#### Step 4: Optionally, configure the domain

You can configure a custom domain with GitHub Pages by adding a `CNAME` file to the `public/` folder.

#### Notes on client-side routing

GitHub Pages doesn’t support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`). This is because when there is a fresh page load for a url like `http://user.github.io/todomvc/todos/42`, where `/todos/42` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/todos/42`. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:

* You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to `hashHistory` for this effect, but the URL will be longer and more verbose (for example, `http://user.github.io/todomvc/#/todos/42?_k=yknaj`). [Read more](https://reacttraining.com/react-router/web/api/Router) about different history implementations in React Router.
* Alternatively, you can use a trick to teach GitHub Pages to handle 404 by redirecting to your `index.html` page with a special redirect parameter. You would need to add a `404.html` file with the redirection code to the `build` folder before deploying your project, and you’ll need to add code handling the redirect parameter to `index.html`. You can find a detailed explanation of this technique [in this guide](https://github.com/rafrex/spa-github-pages).
