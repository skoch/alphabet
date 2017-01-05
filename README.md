# Alphabet
Each letter of the alphabet is represented, choose a letter and random searches for specific nouns will display those objects.

## Dependencies

### Core Requirements
- Node v6 (installation via [NVM](https://github.com/creationix/nvm) highly recommended)

## Installation
```
npm install
```
This will install the project's node packages, which are largely responsible for the build/watch processes. For a full listing of installed packages, see  [package.json](https://github.com/hardcandyshell/hcs-boilerplate/blob/master/package.json).

## Running Builds
#### Development Mode (watch)
```
npm start
```
This will run the project's default "watch:all" script, which will monitor/update any changed files. It is also paired with [Browsersync](https://github.com/Browsersync/browser-sync), so any changes will be live-updated in the browser.

#### Production Mode (build)
```
npm run production:all
```
This will run the project's build script, which optimizes all of the required assets and files and prepares the site for a build-worthy upload.

---

### Core Platform
This boilerplate includes the following core libraries:
- [ExpressJs](https://github.com/expressjs/express): Node server/router/framework
- [Twig](https://github.com/twigjs/twig.js): Template engine, ported from original PHP version
- [Nodemon](https://github.com/remy/nodemon): Server monitoring and restarting

### Automation Features
Workflow streamlining achieved with the following packages:
- [Autoprefixer](https://github.com/postcss/autoprefixer): CSS Auto prefixing
- [Babel](https://github.com/babel/babel): ES6 Transpilation
- [BrowserSync](https://github.com/BrowserSync/browser-sync): Browser testing/hot reloading
- [cpx](https://github.com/mysticatea/cpx): File tree sync, with watch
- [eslint](https://github.com/eslint/eslint): JS Linting
- [imageMin](https://github.com/imagemin/imagemin): Image Minifiaction
- [Node-Sass](https://github.com/sass/node-sass): SASS/SCSS compilation
- [svg-sprite](https://github.com/jkphl/svg-sprite): SVG Optimization/Minification/Spriting
- [Webpack](https://github.com/webpack/webpack): Javascript Bundling/Optimization

### Convenience packages
Making your development life easier with the following packages:
- [jQuery](https://github.com/jquery/jquery): Duh
- [Lodash](https://github.com/lodash/lodash): Utility/helper library for vanilla js
- [Moment](https://github.com/moment/moment): Time/Date manipulation
- [Normalize-Scss](https://github.com/JohnAlbin/normalize-scss): CSS Reset in Sass, wrapped in an NPM package
