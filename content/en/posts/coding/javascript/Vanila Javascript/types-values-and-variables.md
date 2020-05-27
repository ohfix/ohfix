+++
categories = ["Javascript"]
date = 2020-05-26T17:00:00Z
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
* In ECMAScript 6 and later you can also express integers in binary (base 2) or octal (base 8) using the prefixes 0b and 0o (or 0B and 0O) instead of 0x

    0b10101  // => 21:  (1*16 + 0*8 + 1*4 + 0*2 + 1*1)
    0o377    // => 255: (3*64 + 7*8 + 7*1)

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

Continue...