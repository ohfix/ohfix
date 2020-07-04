+++
categories = ["Javascript"]
date = 2020-05-26T17:00:00Z
draft = true
images = []
series = ["Javascript"]
tags = ["Vanila Javascript", "Javascript basic", "Javascript"]
title = "Types, Values, and Variables"
toc = true

+++
# Overview and Definitions

* JavaScript types can be divided into two categories: primitive types and object types. JavaScript’s primitive types include numbers, strings of text (known as strings), and Boolean truth values (known as booleans). A significant portion of this blog is dedicated to a detailed explanation of the numeric, Boolean and string types in JavaScript.
* The special JavaScript values null and undefined are primitive values, but they are not numbers, strings, or booleans. Each value is typically considered to be the sole member of its own special type.
* Any JavaScript value that is not a number, a string, a boolean, a symbol, null or undefined is an object. An object (that is, a member of the type object) is a collection of properties where each property has a name and a value (either a primitive value or another object).

# Numbers

* JavaScript represents numbers using the 64-bit floating-point format defined by the IEEE 754 standard,1 which means it can represent numbers as large as ±1.7976931348623157 × 10308 and as small as ±5 × 10−324.
* The JavaScript number format allows you to exactly represent all integers between −9007199254740992 (−253) and 9007199254740992 (253), inclusive.

### Integer Literals

* Decimal: 17, 1283,...
* Hexadecimal: start with 0X or 0x, ex: 0xA2, 0xABFC136,...
* In ECMAScript 6 and later you can also express integers in binary (base 2) or octal (base 8) using the prefixes 0b and 0o (or 0B and 0O) instead of 0x.

  0b10101  // => 21:  (116 + 08 + 14 + 02 + 11)
  0o377    // => 255: (364 + 78 + 71)

### Floating-Point Literals

* Syntax is:

      [digits][.digits][(E|e)[(+|-)]digits]
* For example:

      3.14
      2345.6789
      .333333333333333333
      6.02e23        // 6.02 × 10²³
      1.4738223E-32  // 1.4738223 × 10⁻³²

#### SEPARATORS IN NUMERIC LITERALS

* You can use underscores within numeric literals to break long literals up into chunks that are easier to read:

  let billion = 1_000_000_000;   // Underscore as a thousands separator.
  let bytes = 0x89_AB_CD_EF;     // As a bytes separator.
  let bits = 0b0001_1101_0111;   // As a nibble separator.
  let fraction = 0.123_456_789;  // Works in the fractional part, too.
* At the time of this writing in early 2020, underscores in numeric literals are not yet formally standardized as part of JavaScript. But they are in the advanced stages of the standardization process, are implemented by all major browsers, and by Node.

### Arithmetic in JavaScript

JavaScript programs work with numbers using the arithmetic operators that the language provides. These include + for addition, - for subtraction, * for multiplication, / for division, and % for modulo (remainder after division). ECMAScript 2016 adds ** for exponentiation.

    let zero = 0;         // Regular zero
    let negz = -0;        // Negative zero
    zero === negz         // => true: zero and negative zero are equal
    1/zero === 1/negz     // => false: Infinity and -Infinity are not equal
    //
    let x = 0/0           // => NaN
    x === NaN             // => false
    x != x                // => true
    Number.isNaN(x)       // => true

### Binary Floating-Point and Rounding Errors

* The IEEE-754 floating-point representation used by JavaScript (and just about every other modern programming language) is a binary representation, which can exactly represent fractions like 1/2, 1/8, and 1/1024. Unfortunately, the fractions we use most commonly (especially when performing financial calculations) are decimal fractions 1/10, 1/100, and so on. Binary floating-point representations cannot exactly represent numbers as simple as 0.1.

      let x = .3 - .2;    // thirty cents minus 20 cents
      let y = .2 - .1;    // twenty cents minus 10 cents
      x === y             // => false: the two values are not the same!
      x === .1            // => false: .3-.2 is not equal to .1
      y === .1            // => true: .2-.1 is equal to .1
* Because of rounding error, the difference between the approximations of .3 and .2 is not exactly the same as the difference between the approximations of .2 and .1. It is important to understand that this problem is not specific to JavaScript: it affects any programming language that uses binary floating-point numbers.

### Arbitrary Precision Integers with BigInt

* As the name implies, BigInt is a numeric type whose values are integers. The type was added to JavaScript mainly to allow the representation of 64-bit intergers.

      1234n                // A not-so-big BigInt literal
      0b111111n            // A binary BigInt
      0o7777n              // An octal BigInt
      0x8000000000000000n  // => 2n**63n: A 64-bit integer
      //
      BigInt(Number.MAX_SAFE_INTEGER)     // => 9007199254740991n
      let string = "1" + "0".repeat(100); // 1 followed by 100 zeros.
      BigInt(string)                      // => 10n**100n: one googol
* Arithmetic with BigInt values works like arithmetic with regular JavaScript numbers, except that division drops any remainder and rounds down (toward zero).
* **It is important to understand that you may not mix operands of type BigInt with regular number operands.**
* Comparison operators, by contrast, do work with mixed numeric types:

      1 < 2n     // => true
      2 > 1n     // => true
      0 == 0n    // => true
      0 === 0n   // => false: the === checks for type equality as well

### Dates and Times

JavaScript Date are objects but they also have a numeric representation as a timestamp that specifies the number of elapsed milliseconds since January 1st, 1970:

    let timestamp = Date.now();  // The current time as a timestamp (a number).
    let now = new Date();        // The current time as a Date object.
    let ms = now.getTime();      // Convert to a millisecond timestamp.
    let iso = now.toISOString(); // Convert to a string in standard format.

# Text

* A string is an immutable ordered sequence of 16-bit values, each of which typically represents a Unicode character. The length of a string is the number of 16-bit values it contains.
* JavaScript does not have a special type that represents a single element of a string. To represent a single 16-bit value, simply use a string that has a length of 1.

      let euro = "€";
      let love = "💙";
      euro.length   // => 1: this character has one 16-bit element
      love.length   // => 2: UTF-16 encoding of 💙 is "\ud83d\udc99"

### String Literals

* To include a string in a JavaScript program, simply enclose the characters of the string within a matched pair of single or double quotes or backticks (' or " or \`).
* Strings delimited with backticks are a feature of ECMAScript 6, and allow JavaScript expressions to be embedded within (or interpolated into) the string literal.

      // A one-line string written on 3 lines:
      "one\
      long\
      line"
      // A two-line string written on two lines:
      `the newline character at the end of this line
      is included literally in this string`
      //
      <button onclick="alert('Thank you')">Click Me</button>

  ### Escape Sequences in String Literals
  * \\0 : The NULL character (\\u0000)
  * \\b : Backspace (\\u0008)
  * \\t : Horizontal tab (\\u0009)
  * \\n : Newline (\\u000A)
  * \\v : Vertical tab (\\u000B)
  * \\f : Form feed (\\u000C)
  * \\r : Carriage return (\\u000D)
  * \\" : Double quote (\\u0022)
  * \\' : Apostrophe or single quote (\\u0027)
  * \\\\ : Backslash (\\u005C)
  * \\xnn : The Unicode character specified by the two hexadecimal digits nn
  * \\xnnnn : The Unicode character specified by the four hexadecimal digits nnnn
  * \\u{n} : The Unicode character specified by the codepoint n, where n is one to six hexadecimal digits between 0 and 10FFFF. (ES6)

If the \\ character precedes any character other than those shown, the backslash is simply ignored (although future versions of the language may, of course, define new escape sequences).

### Working with Strings

    let msg = "Hello, " + "world";   // Produces the string "Hello, world"
    let greeting = "Welcome to my blog," + " " + name;