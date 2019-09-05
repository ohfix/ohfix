---
title: "C++ New Line Syntax"
date: 2019-08-25T16:45:57+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - Recommend
categories:
  - Coding
series:
  - C++
---

## Rule

Prefer `'\n'` or `"\n"` to `std::endl`.

## Reason

The `std::endl` manipulator is mostly equivalent to `'\n'` and `"\n"`; as most commonly used it simply slows down output by doing redundant `flush()`s. This slowdown can be significant compared to `printf`-style output.

## Example

```C++
std::cout << "Hello, World!" << std::endl; // two output operations and a flush
std::cout << "Hello, World!\n";            // one output operation and no flush
```

## Note

- For `cin` / `cout` (and equivalent) interaction, there is no reason to `flush`; that's done automatically. For writing to a file, there is rarely a need to `flush`.
- Apart from the (occasionally important) issue of performance, the choice between `'\n'` and `std::endl` is almost completely aesthetic.

<p align="right">Reference:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>