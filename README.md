# Condilation

Dead simple conditional build tool for text files.

- [Installation](#installation)
- [Usage](#usage)
  - [Directives](#directives)
  - [Comparison](#comparison)
  - [Instrumenting](#instructions)
  - [Compiling](#compiling)
- [API](#programatic-api)

# Installation

````
npm install condilation
````

# Usage

````bash
  Usage: condilation <input> <output>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -f, --force    forces overwrite of output file

  Examples:

    $     env=cjs condilation common.js cjs.js
    $  env=meteor condilation common.js meteor.js
    $ env=globals condilation common.js globals.js
````

## Directives

There's 4 conditional directives available:

  * `condilation:if`
  * `condilation:elif`
  * `condilation:else`
  * `condilation:fi`

## Comparison

You can use both equality and inequality operators:

````javascript
// condilation:if env=browser
var equality = 'is browser';
// condilation:elif env!=browser
var inequality = 'is not browser';
// condilation:fi
````


## Instrumenting

In this example, we have a javascript file which we want to use in:
  - `commonjs`
  - `globals`
  - `meteor`

So, first we need to instrument it:

> __*sample.js*__

````javascript
// condilation:if env=cjs
module.exports
// condilation:elif env=meteor
MyModule
// condilation:else
window.MyModule;
// condilation:fi

= function(){
  console.log('Hello World');
}
````

> Note that **comments** are used so the original functionality doesn't get
modified whatsoever. You can do the same for the text file you're dealing with.

In the next step we'll see how we send the `env` value so our conditionals
can work properly.

## Compiling

In order to compile we need to set our `variables` accordingly, as we expect
them. In this example, we're checking conditions against the `env` variable. So
we set it right before the `condilation` call.

Lets see three examples and their corresponding outputs:

````javascript
// $ env=cjs condilation sample.js cjs.js
module.exports
= function(){
  console.log('Hello World');
}
````

````javascript
// $ env=meteor condilation sample.js meteor.js
MyModule
= function(){
  console.log('Hello World');
}
````

````javascript
// $ env=globals condilation sample.js globals.js
window.MyModule
= function(){
  console.log('Hello World');
}
````

# Programatic API

Signature is such as follows:

````php
condilation(<input>, <output>, {locals}, {options});

/*
    input - input file path
   output - output file path
   locals - variables accessible to instrumented code
  options - same as CLI options
 */
````

Practical example:

````javascript
var condilation = require('condilation');

condilation('source.js', 'cjs.js', {env: 'cjs'}, {force: true});
````

1. > Note that in the CLI mode our variables (`locals`) gets read from
`process.env` but in the Javascript mode, we need to explicitly set them.

1. > The options are the same of the CLI, but informed without alias or dashes.

# License

The MIT License (MIT)

Copyright (c) 2015 Anderson Arboleya

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.