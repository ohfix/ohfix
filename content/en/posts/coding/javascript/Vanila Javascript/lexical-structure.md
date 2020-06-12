+++
categories = ["Javascript"]
date = 2020-05-24T17:00:00Z
draft = true
images = []
series = ["Javascript"]
tags = ["Javascript basic", "Vanila Javascript", "Javascript"]
title = "Lexical Structure"
toc = true

+++
# The Text of a JavaScript Program

### Case-sensitive

    while != Whilte != WHILE

### Auto ignore spaces and line break

# Comments

    // This is a single-line comment.
    /* This is a
       multi-line comment
    */

# Literals

    12               // The number twelve
    1.2              // The number one point two
    "hello world"    // A string of text
    'Hi'             // Another string
    true             // A Boolean value
    false            // The other Boolean value
    null             // Absence of an object

# Identifiers and Reserved Words

A JavaScript identifier must begin with a letter, an underscore (_), or a dollar sign ($). Subsequent characters can be letters, digits, underscores, or dollar signs.

    i
    my_variable_name
    v13
    _dummy
    $str

# Reserved Words

The following words are a part of the JavaScript language, many of these must not be used as the names of constants, variables, functions or classes.

* as
* const
* export
* get
* null
* target
* void
* async
* continue
* extends
* if
* of
* this
* while
* await
* debugger
* false
* import
* return
* throw
* with
* break
* default
* finally
* in
* set
* true
* yield
* case
* delete
* for
* instanceof
* static
* try
* catch
* do
* from
* let
* super
* typeof
* class
* else
* function
* new
* switch
* var

# Unicode

    const π = 3.14;
    const sí = true;

### Unicode Escape Sequences

    console.log("\u{1F600}");  // Prints a smiley face emoji

### Unicode Normalization

    const café = 1;  // This constant is named "caf\u{e9}"
    const café = 2;  // This constant is different: "cafe\u{301}"
    café  // => 1: this constant has one value
    café  // => 2: this indistinguishable constant has a different value

### Optional Semicolons

    // This
    let a
    a
    =
    3
    console.log(a)
    
    // Will be treated like this
    let a; a = 3; console.log(a);

    // This
    let y = x + f
    (a+b).toString()
    
    // Will be treated like this
    let y = x + f(a+b).toString();

    // Write these lines
    return
    true;
    // You meant
    return true;
    // But Javascript will treated that like this
    return; true;

# Summary

This blog has shown how JavaScript programs are written at the lowest level. The next chapter takes us one step higher and introduces the primitive types and values (numbers, strings, and so on) that serve as the basic units of computation for JavaScript programs.