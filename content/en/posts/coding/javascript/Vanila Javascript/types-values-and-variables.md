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

* JavaScript types can be divided into two categories: *primitive* types and *object* types. JavaScript’s primitive types include *numbers*, *strings* of text (known as strings), and *Boolean* truth values (known as booleans). A significant portion of this blog is dedicated to a detailed explanation of the numeric, Boolean and string types in JavaScript.
* The special JavaScript values *null* and *undefined* are primitive values, but they are not numbers, strings, or booleans. Each value is typically considered to be the sole member of its own special type. ES6 adds a new special-purpose type, known as *Symbol*, that enables the definition of language extensions without harming backward compatibility.
* Any JavaScript value that is not a number, a string, a boolean, a symbol, null or undefined is an object. An object (that is, a member of the type object) is a collection of properties where each property has a name and a value (either a primitive value or another object).
* An ordinary JavaScript *object* is an *unordered* collection of named values. The language also defines a special kind of object, known as an *array*, that represents an *ordered* collection of numbered values.
* A *Set* object represents a set of *unique* values. A *Map* object represents a mapping from keys to values. Various “*typed array*” types facilitate operations on arrays of bytes and other binary data. The *RegExp* type represents textual patterns and enables sophisticated matching, searching, and replacing operations on strings. The *Date* type represents dates and times and supports rudimentary date arithmetic. *Error* and its subtypes represent errors that can arise when executing JavaScript code.
* JavaScript differs from more static languages in that *functions* and *classes* are not just part of the language syntax: they are themselves values that can be manipulated by JavaScript programs.
* The JavaScript interpreter performs *automatic garbage collection* for memory management. This means that a JavaScript programmer generally does not need to worry about destruction or deallocation of objects or other values.
* JavaScript supports an *object-oriented programming* style.
* JavaScript’s *object* types are *mutable* and its *primitive* types are *immutable*.
* Constants and variables allow you to use names to refer to values in your programs. Constants are declared with *const* and *variables* are declared with *let* (or with *var* in older JavaScript code). JavaScript constants and variables are *untyped*: declarations do not specify what kind of values will be assigned.

# Numbers

* JavaScript represents numbers using the 64-bit floating-point format defined by the IEEE 754 standard,1 which means it can represent numbers as large as ±1.7976931348623157 × 10308 and as small as ±5 × 10^−324^.
* The JavaScript number format allows you to exactly represent all integers between −9007199254740992 (-2^53^) and 9007199254740992 (2^53^), inclusive.

### Integer Literals

* Decimal: 17, 1283,...
* Hexadecimal: start with 0X or 0x, ex: 0xA2, 0xABFC136,...
* In ECMAScript 6 and later you can also express integers in binary (base 2) or octal (base 8) using the prefixes 0b and 0o (or 0B and 0O) instead of 0x.

  ```javascript
  0b10101  // => 21:  (1*16 + 0*8 + 1*4 + 0*2 + 1*1)
  0o377    // => 255: (3*64 + 7*8 + 7*1)
  ```

### Floating-Point Literals

* Syntax is:

  ```javascript
  [digits][.digits][(E|e)[(+|-)]digits]
  ```
* For example:

  ```javascript
  3.14
  2345.6789
  .333333333333333333
  6.02e23        // 6.02 × 10²³
  1.4738223E-32  // 1.4738223 × 10⁻³²
  ```

#### SEPARATORS IN NUMERIC LITERALS

* You can use underscores within numeric literals to break long literals up into chunks that are easier to read:

  ```javascript
  let billion = 1_000_000_000;   // Underscore as a thousands separator.
  let bytes = 0x89_AB_CD_EF;     // As a bytes separator.
  let bits = 0b0001_1101_0111;   // As a nibble separator.
  let fraction = 0.123_456_789;  // Works in the fractional part, too.
  ```
  
* At the time of this writing in early 2020, underscores in numeric literals are not yet formally standardized as part of JavaScript. But they are in the advanced stages of the standardization process, are implemented by all major browsers, and by Node.

### Arithmetic in JavaScript

JavaScript programs work with numbers using the arithmetic operators that the language provides. These include + for addition, - for subtraction, * for multiplication, / for division, and % for modulo (remainder after division). ECMAScript 2016 adds ** for exponentiation.

```javascript
let zero = 0;         // Regular zero
let negz = -0;        // Negative zero
zero === negz         // => true: zero and negative zero are equal
1/zero === 1/negz     // => false: Infinity and -Infinity are not equal
//
let x = 0/0           // => NaN
x === NaN             // => false
x != x                // => true
Number.isNaN(x)       // => true
```

### Binary Floating-Point and Rounding Errors

* The IEEE-754 floating-point representation used by JavaScript (and just about every other modern programming language) is a binary representation, which can exactly represent fractions like 1/2, 1/8, and 1/1024. Unfortunately, the fractions we use most commonly (especially when performing financial calculations) are decimal fractions 1/10, 1/100, and so on. Binary floating-point representations cannot exactly represent numbers as simple as 0.1.

  ```javascript
  let x = .3 - .2;    // thirty cents minus 20 cents
  let y = .2 - .1;    // twenty cents minus 10 cents
  x === y             // => false: the two values are not the same!
  x === .1            // => false: .3-.2 is not equal to .1
  y === .1            // => true: .2-.1 is equal to .1
  ```
* Because of rounding error, the difference between the approximations of .3 and .2 is not exactly the same as the difference between the approximations of .2 and .1. It is important to understand that this problem is not specific to JavaScript: it affects any programming language that uses binary floating-point numbers.

### Arbitrary Precision Integers with BigInt

* As the name implies, BigInt is a numeric type whose values are integers. The type was added to JavaScript mainly to allow the representation of 64-bit intergers.

  ```javascript
  1234n                // A not-so-big BigInt literal
  0b111111n            // A binary BigInt
  0o7777n              // An octal BigInt
  0x8000000000000000n  // => 2n**63n: A 64-bit integer
  //
  BigInt(Number.MAX_SAFE_INTEGER)     // => 9007199254740991n
  let string = "1" + "0".repeat(100); // 1 followed by 100 zeros.
  BigInt(string)                      // => 10n**100n: one googol
  ```
* Arithmetic with BigInt values works like arithmetic with regular JavaScript numbers, except that division drops any remainder and rounds down (toward zero).
* **It is important to understand that you may not mix operands of type BigInt with regular number operands.**
* Comparison operators, by contrast, do work with mixed numeric types:

  ```javascript
  1 < 2n     // => true
  2 > 1n     // => true
  0 == 0n    // => true
  0 === 0n   // => false: the === checks for type equality as well
  ```

### Dates and Times

JavaScript Date are objects but they also have a numeric representation as a timestamp that specifies the number of elapsed milliseconds since January 1st, 1970:

```javascript
let timestamp = Date.now();  // The current time as a timestamp (a number).
let now = new Date();        // The current time as a Date object.
let ms = now.getTime();      // Convert to a millisecond timestamp.
let iso = now.toISOString(); // Convert to a string in standard format.
```

# Text

* A string is an immutable ordered sequence of 16-bit values, each of which typically represents a Unicode character. The length of a string is the number of 16-bit values it contains.
* JavaScript does not have a special type that represents a single element of a string. To represent a single 16-bit value, simply use a string that has a length of 1.

  ```javascript
  let euro = "€";
  let love = "💙";
  euro.length   // => 1: this character has one 16-bit element
  love.length   // => 2: UTF-16 encoding of 💙 is "\ud83d\udc99"
  ```

### String Literals

* To include a string in a JavaScript program, simply enclose the characters of the string within a matched pair of single or double quotes or backticks (' or " or \`).
* Strings delimited with backticks are a feature of ECMAScript 6, and allow JavaScript expressions to be embedded within (or interpolated into) the string literal.

  ```javascript
  // A one-line string written on 3 lines:
  "one\
  long\
  line"
  // A two-line string written on two lines:
  `the newline character at the end of this line
  is included literally in this string`
  //
  ```
  ```html
  <button onclick="alert('Thank you')">Click Me</button>
  ```
  
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

```javascript
let msg = "Hello, " + "world";   // Produces the string "Hello, world"
let greeting = "Welcome to my blog," + " " + name;
//

let s = "Hello, world"; // Start with some text.

// Obtaining portions of a string
s.substring(1,4)        // => "ell": the 2nd, 3rd, and 4th characters.
s.slice(1,4)            // => "ell": same thing
s.slice(-3)             // => "rld": last 3 characters
s.split(", ")           // => ["Hello", "world"]: split at delimiter string

// Searching a string
s.indexOf("l")          // => 2: position of first letter l
s.indexOf("l", 3)       // => 3: position of first "l" at or after 3
s.indexOf("zz")         // => -1: s does not include the substring "zz"
s.lastIndexOf("l")      // => 10: position of last letter l

// Boolean searching functions in ES6 and later
s.startsWith("Hell")    // => true: the string starts with these
s.endsWith("!")         // => false: s does not end with that
s.includes("or")        // => true: s includes substring "or"

// Creating modified versions of a string
s.replace("llo", "ya")  // => "Heya, world"
s.toLowerCase()         // => "hello, world"
s.toUpperCase()         // => "HELLO, WORLD"
s.normalize()           // Unicode NFC normalization: ES6
s.normalize("NFD")      // NFD normalization. Also "NFKC", "NFKD"

// Inspecting individual (16-bit) characters of a string
s.charAt(0)             // => "H": the first character
s.charAt(s.length-1)    // => "d": the last character
s.charCodeAt(0)         // => 72: 16-bit number at the specified position

s.codePointAt(0)        // => 72: ES6, works for codepoints > 16 bits

// String padding functions in ES2017
"x".padStart(3)         // => "  x": add spaces on the left to a length of 3
"x".padEnd(3)           // => "x  ": add spaces on the right to a length of 3
"x".padStart(3, "*")    // => "**x": add stars on the left to a length of 3
"x".padEnd(3, "-")      // => "x--": add dashes on the right to a length of 3

// Space trimming functions. trim() is ES5; others ES2019
" test ".trim()         // => "test": remove spaces at start and end
" test ".trimStart()    // => "test ": remove spaces on left. Also trimLeft
" test ".trimEnd()      // => " test": remove spaces at right. Also trimRight

// Miscellaneous string methods
s.concat("!")           // => "Hello, world!": just use + operator instead
"<>".repeat(5)          // => "<><><><><>": concatenate n copies. ES6
```

### Template Literals

```javascript
let name = "Bill";
let greeting = `Hello ${ name }.`;  // greeting == "Hello Bill."

`\n`.length            // => 1: the string has a single newline character
String.raw`\n`.length  // => 2: a backslash character and the letter n
```

### Pattern Matching

JavaScript defines a datatype known as a regular expression (or RegExp) for describing and matching patterns in strings of text. RegExps are not one of the fundamental datatypes in JavaScript, but they have a literal syntax like numbers and strings do, so they sometimes seem like they are fundamental

```javascript
let text = "testing: 1, 2, 3";   // Sample text
let pattern = /\d+/g;            // Matches all instances of one or more digits
pattern.test(text)               // => true: a match exists
text.search(pattern)             // => 9: position of first match
text.match(pattern)              // => ["1", "2", "3"]: array of all matches
text.replace(pattern, "#")       // => "testing: #, #, #"
text.split(/\D+/)                // => ["","1","2","3"]: split on nondigits
```

# Boolean Values

Any JavaScript value can be converted to a boolean value. The following values convert to, and therefore work like, false:

```javascript
undefined
null
0
-0
NaN
""  // the empty string
```

All other values, including all objects (and arrays) convert to, and work like, true. false, and the six values that convert to it, are sometimes called falsy values, and all other values are called truthy. Any time JavaScript expects a boolean value, a falsy value works like false and a truthy value works like true.

# null and undefined

I consider undefined to represent a system-level, unexpected, or error-like absence of value and null to represent a program-level, normal, or expected absence of value. I avoid using null and undefined when I can, but if I need to assign one of these values to a variable or property or pass or return one of these values to or from a function, I usually use null. Some programmers strive to avoid null entirely and use undefined in its place wherever they can.

# Symbols

Symbols were introduced in ES6 to serve as non-string property names. The Symbol type does not have a literal syntax. To obtain a Symbol value, you call the Symbol() function. This function never returns the same value twice, even when called with the same argument.

```javascript
let strname = "string name";      // A string to use as a property name
let symname = Symbol("propname"); // A Symbol to use as a property name
typeof strname                    // => "string": strname is a string
typeof symname                    // => "symbol": symname is a symbol
let o = {};                       // Create a new object
o[strname] = 1;                   // Define a property with a string name
o[symname] = 2;                   // Define a property with a Symbol name
o[strname]                        // => 1: access the string-named property
o[symname]                        // => 2: access the symbol-named property
```

The Symbol.for() function is completely different than the Symbol() function: Symbol() never returns the same value twice, but Symbol.for() always returns the same value when called with the same string.

```javascript
let s = Symbol.for("shared");
let t = Symbol.for("shared");
s === t          // => true
s.toString()     // => "Symbol(shared)"
Symbol.keyFor(t) // => "shared"
```

# The Global Object

The global object is a regular JavaScript object that serves a very important purpose: the properties of this object are the globally defined identifiers that are available to a JavaScript program. When the JavaScript interpreter starts (or whenever a web browser loads a new page), it creates a new global object and gives it an initial set of properties that define:

- Global constants like undefined, Infinity, and NaN

- Global functions like isNaN(), parseInt() and eval()

- Constructor functions like Date(), RegExp(), String(), Object(), and Array()

- Global objects like Math and JSON

The initial properties of the global object are not reserved words, but they deserve to be treated as if they are. This chapter has already described some of these global properties. Most of the others will be covered elsewhere in this book.

In Node, the global object has a property named global whose value is the global object itself, so you can always refer to the global object by the name global in Node programs.

In web browsers, the Window object serves as the global object for all JavaScript code contained in the browser window it represents. This global Window object has a self-referential window property that can be used to refer to the global object. The Window object defines the core global properties, but it also defines quite a few other globals that are specific to web browsers and client-side JavaScript. Web worker threads (§15.13) have a different global object than the Window with which they are associated. Code in a worker can refer to its global object as self.

ES2020 finally defines globalThis as the standard way to refer to the global object in any context. As of early 2020, this feature has been implemented by all modern browsers and by Node.

# Immutable Primitive Values and Mutable Object References

Primitives are immutable: there is no way to change (or “mutate”) a primitive value.

Objects are different than primitives. First, they are mutable—their values can change.

Objects are not compared by value: two distinct objects are not equal even if they have the same properties and values. And two distinct arrays are not equal even if they have the same elements in the same order:

```javascript
let o = {x: 1}, p = {x: 1};  // Two objects with the same properties
o === p                      // => false: distinct objects are never equal
let a = [], b = [];          // Two distinct, empty arrays
a === b                      // => false: distinct arrays are never equal
```

Two object values are the same if and only if they refer to the same underlying object.

```javascript
let a = [];   // The variable a refers to an empty array.
let b = a;    // Now b refers to the same array.
b[0] = 1;     // Mutate the array referred to by variable b.
a[0]          // => 1: the change is also visible through variable a.
a === b       // => true: a and b refer to the same object, so they are equal.
```

# Type Conversions

```javascript
10 + " objects"     // => "10 objects":  Number 10 converts to a string
"7" * "4"           // => 28: both strings convert to numbers
let n = 1 - "x";    // n == NaN; string "x" can't convert to a number
n + " objects"      // => "NaN objects": NaN converts to string "NaN"
```

Strings that can be parsed as numbers convert to those numbers. Leading and trailing spaces are allowed, but any leading or trailing nonspace characters that are not part of a numeric literal cause the string-to-number conversion to produce NaN.

| Value             | to String        | to Number | to Boolean |
| ----------------- | ---------------- | --------- | ---------- |
| undefined         | "undefined"      | NaN       | false      |
| null              | "null"           | 0         | false      |
| true              | "true"           | 1         |            |
| false             | "false"          | 0         |            |
| "" (empty string) |                  | 0         | false      |
| "1.2"             |                  | 1.2       | true       |
| "one"             |                  | NaN       | true       |
| 0                 | "0"              |           | false      |
| -0                | "0"              |           | false      |
| 1                 | "1"              |           | true       |
| Infinity          | "Infinity"       |           | true       |
| -Infinity         | "-Infinity"      |           | true       |
| NaN               | "NaN"            |           | false      |
| {} (any object)   | see next         | see next  | true       |
| [] (empty array)  | ""               | 0         | true       |
| [9]               | "9"              | 9         | true       |
| ['a']             | "a" (use join()) | NaN       | true       |
| function(){}      | see next         | NaN       | true       |

### Conversions and Equality

```javascript
null == undefined // => true: These two values are treated as equal.
"0" == 0          // => true: String converts to a number before comparing.
0 == false        // => true: Boolean converts to number before comparing.
"0" == false      // => true: Both operands convert to 0 before comparing!
```

### Explicit Conversions

```javascript
Number("3")    // => 3
String(false)  // => "false":  Or use false.toString()
Boolean([])    // => true

x + ""   // => String(x)
+x       // => Number(x)
x-0      // => Number(x)
!!x      // => Boolean(x): Note double !

let n = 17;
let binary = "0b" + n.toString(2);  // binary == "0b10001"
let octal = "0o" + n.toString(8);   // octal == "0o21"
let hex = "0x" + n.toString(16);    // hex == "0x11"

let n = 123456.789;
n.toFixed(0)         // => "123457"
n.toFixed(2)         // => "123456.79"
n.toFixed(5)         // => "123456.78900"
n.toExponential(1)   // => "1.2e+5"
n.toExponential(3)   // => "1.235e+5"
n.toPrecision(4)     // => "1.235e+5"
n.toPrecision(7)     // => "123456.8"
n.toPrecision(10)    // => "123456.7890"

parseInt("3 blind mice")     // => 3
parseFloat(" 3.14 meters")   // => 3.14
parseInt("-12.34")           // => -12
parseInt("0xFF")             // => 255
parseInt("0xff")             // => 255
parseInt("-0XFF")            // => -255
parseFloat(".1")             // => 0.1
parseInt("0.1")              // => 0
parseInt(".1")               // => NaN: integers can't start with "."
parseFloat("$72.47")         // => NaN: numbers can't start with "$"

parseInt("11", 2)     // => 3: (1*2 + 1)
parseInt("ff", 16)    // => 255: (15*16 + 15)
parseInt("zz", 36)    // => 1295: (35*36 + 35)
parseInt("077", 8)    // => 63: (7*8 + 7)
parseInt("077", 10)   // => 77: (7*10 + 7)
```

### Object to Primitive Conversions

#### THE TOSTRING() AND VALUEOF() METHODS

```javascript
[1,2,3].toString()                  // => "1,2,3"
(function(x) { f(x); }).toString()  // => "function(x) { f(x); }"
/\d+/g.toString()                   // => "/\\d+/g"
let d = new Date(2010, 0, 1);   // January 1, 2010, (Pacific time)
d.valueOf()                     // => 1262332800000
d.toString()  // => "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)"
```

#### OBJECT-TO-PRIMITIVE CONVERSION ALGORITHMS

- The prefer-string algorithm first tries the toString() method. If the method is defined and returns a primitive value, then JavaScript uses that primitive value (even if it is not a string!). If toString() does not exist or if it returns an object, then JavaScript tries the valueOf() method. If that method exists and returns a primitive value, then JavaScript uses that value. Otherwise, the conversion fails with a TypeError.

- The prefer-number algorithm works like the prefer-string algorithm, except that it tries valueOf() first and toString() second.

- The no-preference algorithm depends on the class of the object being converted. If the object is a Date object, then JavaScript uses the prefer-string algorithm. For any other object, JavaScript uses the prefer-number algorithm.

```javascript
Number([])    // => 0: this is unexpected!
Number([99])  // => 99: really?
```

