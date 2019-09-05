---
title: "C++ Represent Null Pointer"
date: 2019-08-19T19:43:53+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - Recommend
  - Pointer
categories:
  - Coding
series:
  - C++
---

## Rule

Use `nullptr` rather than `0` or `NULL`.

## Reason

- Readability. Because C++ define `NULL` is an `const` type `int` has value `0`, that can lead to wrong in some situations like the following example. Minimize surprises: `nullptr` cannot be confused with an `int`, since it is defined as a null `pointer`.

- Therefore, `nullptr` has a well-specified (very restrictive) type, and thus works in more scenarios where [type deduction](https://www.modernescpp.com/index.php/c-insights-type-deduction) might do the wrong thing on `NULL` or `0` .

## Example

```C++
void f(int);
void f(char*);
f(NULL);    // call f(int)
f(nullptr); // call f(char*)
```

## Enforcement

Flag uses of `0` and `NULL` for pointers. The transformation may be helped by simple program transformation.

<p align="right">Reference:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>