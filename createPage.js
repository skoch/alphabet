#!/usr/bin/env node
/**
 * createPage.js
 * 1. Creates the necessary files from template files for a new page in the prototype
 * 2. Updates `app.js` to have the new route
 * 3. Updates `src/scss/index.scss` to import the new SCSS file
 * 4. Optionally add the new page to the Table of Contents page
 */
const replace = require('replace-in-file');
const fs = require('fs-extra');
const cli = require('cli');
const padStart = require('lodash.padstart');

cli.parse({
    pagename: ['p', 'The name of the new page/module', 'string'],
    index: ['i', 'Add to index?', 'on'],
});

/**
 * Used by `copyFile` to find and replaces text in a file
 *
 * @param {String} newFilePath
 * @param {Regex or String} regex
 * @param {String} replacement
 */
function replaceInFile(newFilePath, regex, replacement) {
    console.log('Starting replacement:', regex, replacement);
    const options = {
        files: newFilePath,
        // Replacement to make (string or regex)
        replace: regex,
        with: replacement,
    };

    replace(options)
        .then((changedFiles) => {
            console.log('Modified files:', changedFiles.join(', '));
        })
        .catch((error) => {
            throw error;
        });
}

/**
 * Copies a file to a new file/name
 * Optionally, finds and replaces text in same file
 *
 * @param  {String} fileToCopy
 * @param  {String} newFilePath
 * @param  {Regex or String, optional} regex
 * @param  {String, optional} replacement
 * @return {Boolean}
 */
function copyFile(fileToCopy, newFilePath, regex, replacement) {
    console.log('Starting copy:', fileToCopy);
    fs.copy(fileToCopy, newFilePath, (err) => {
        if (err) {
            throw err;
        }

        if (regex && replacement) {
            replaceInFile(newFilePath, regex, replacement);
        }
        console.log('Success:', newFilePath);
        return true;
    });
}

/**
 * Inserts declaration of new page route
 *
 * @param {String} pagename
 */
function writeNewAppJs(pagename) {
    fs.readFile('app.js', (err, data) => {
        if (err) { throw err; }
        const array = data.toString().split('\n');
        let output = '';
        for (let i = 0; i < array.length; i++) {
            if (array[i].trim() === '// ~ dynamically generated ~ 0 ~') {
                output += `${array[i]}\nvar ${pagename} = require('./routes/${pagename}');\n`;
            } else if (array[i].trim() === '// ~ dynamically generated ~ 1 ~') {
                output += `${array[i]}\napp.use('/${pagename}', ${pagename});\n`;
            } else if (i === array.length - 1) {
                output += `${array[i]}`;
            } else {
                output += `${array[i]}\n`;
            }
        }

        // sk: write to TMP file
        fs.appendFileSync('TMP-app', output);
        console.log('Writing TMP app.js');

        // sk: delete app.js // rename TMP to app.js
        fs.unlink('app.js');
        console.log('Deleting old app.js');
        fs.renameSync('TMP-app', 'app.js');
        console.log('Writing new app.js');
    });
}

/**
 * Inserts new page into the table of contents
 *
 * @param {String} pagename
 */
function writeNewtableOfContentsJs(pagename) {
    fs.readFile('routes/table-of-contents.js', (err, data) => {
        if (err) { throw err; }
        const array = data.toString().split('\n');
        let output = '';
        for (let i = 0; i < array.length; i++) {
            if (array[i].trim() === '// ~ dynamically generated ~ 0 ~') {
                const upperCasePagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
                let route = `{ label: '${upperCasePagename}', url: '${pagename}' },\n`;
                route = padStart(route, route.length + 16);
                output += `${array[i]}\n${route}`;
            } else if (i === array.length - 1) {
                output += `${array[i]}`;
            } else {
                output += `${array[i]}\n`;
            }
        }

        // sk: write to TMP file
        fs.appendFileSync('TMP-toc', output);
        console.log('Writing TMP routes/table-of-contents.js');

        // sk: delete routes/table-of-contents.js // rename TMP to routes/table-of-contents.js
        fs.unlink('routes/table-of-contents.js');
        console.log('Deleting old routes/table-of-contents.js');
        fs.renameSync('TMP-toc', 'routes/table-of-contents.js');
        console.log('Writing new routes/table-of-contents.js');
    });
}

// main entry point
cli.main((args, options) => {
    if (options.pagename) {
        const p = options.pagename;

        // twig, scss, js controller, route
        copyFile('views/pages/_template.twig', `views/pages/${p}.twig`);
        copyFile('src/scss/_template.scss', `src/scss/_${p}.scss`, /classname/gi, p);
        copyFile('src/js/pages/_template.js', `src/js/pages/${p}.js`, '=== name ===', `=== ${p} ===`);
        copyFile('routes/_template.js', `routes/${p}.js`, /pagename/gi, p);

        // create new app.js
        writeNewAppJs(p);
        // import the new SCSS
        fs.appendFileSync('src/scss/index.scss', `@import "${p}"`);
        console.log('Appended `@import` for new SCSS');

        if (options.index) {
            writeNewtableOfContentsJs(p);
        }
        // `http://localhost:3000/${p}`
    } else {
        console.log('Use `-h` flag to list options');
    }
});
