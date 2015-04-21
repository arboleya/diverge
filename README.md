# Condilation

Simple text preprocessor with general conditional compilation goodies.

The best friend of your next hybrid builds.

- [Installation](#installation)
- [Usage](#usage)
  - [Examples:](#examples)
- [Directives](#directives)
- [Comparison](#comparison)
- [Instructions](#instructions)
- [Compiling](#compiling)
  - [#1 env=cjs](##1-envcjs)
  - [#2 env=meteor](##2-envmeteor)
  - [#3 env=meteor](##3-envmeteor)

# Installation

````
npm install condilation
````

# Usage

````bash
condilation [input] [output] [locals...]
````

  * **Input** `(required)`: Input file path
  * **Output** `(required)`: Output file path
  * **Locals** `(optional)`: Variables to access in your conditions
    * Default to `process.env`

## Examples

````bash
$ condilation input.js output.js env=cjs
$ condilation input.js output.js env=cjs coverage=yes
$ condilation input.js output.js env=cjs coverage=yes variable=value etc=xyz
````

# Directives

There's 4 conditional directives available:

  * `condilation:if`
  * `condilation:elif`
  * `condilation:else`
  * `condilation:fi`

# Comparison

You can use both equality and inequality operators:

````javascript
// condilation:if env=browser
var equality = 'is browser';
// condilation:elif env!=browser
var inequality = 'is not browser';
// condilation:fi
````


# Instructions

In this example, we have a javascript file which we want to use in:
  - `commonjs`
  - `globals`
  - `meteor`

So, first we need to instruct our text files.


````javascript
/* mymodule.js */

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

> Note that **comments** are used, so the original functionality doesn't get
modified whatsoever.

# Compiling

Now lets see our output for three different cases:

## #1 env=cjs

````javascript
// $ condilation mymodule.js cjs/mymodule.js env=cjs
module.exports
= function(){
  console.log('Hello World');
}
````

## #2 env=meteor

````javascript
// $ condilation mymodule.js meteor/mymodule.js env=meteor
MyModule
= function(){
  console.log('Hello World');
}
````

## #3 env=meteor

````javascript
// $ condilation mymodule.js mymodule.js env=globals
window.MyModule
= function(){
  console.log('Hello World');
}
````

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