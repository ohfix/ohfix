---
title: "C++ Initialize Syntax"
date: 2019-08-23T15:57:38+07:00
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

- Prefer the `{}`-initializer syntax.
- Avoid `()` initialization, which allows parsing ambiguities.

## Reason

- The rules for `{}` initialization are simpler, more general, less ambiguous, and safer than for other forms of initialization.
- Use `=` only when you are sure that there can be no narrowing conversions. For built-in arithmetic types, use `=` only with `auto`.

## Example

```C++
int x {7.9}; // error: narrowing
int y (7.9); // OK: y becomes 7. Hope for a compiler warning
int z = 7.9; // OK: z becomes 7. Hope for a compiler warning
```

```C++
template<typename T, typename U>
void f(T t, U u) {
   T v1(x);       // is v1 a function or a variable?
   T v2 {x};      // variable
   auto x = T(u); // construction or cast?
}
```

## Enforcement

- Flag uses of `=` to initialize arithmetic types where narrowing occurs.
- Flag uses of `()` initialization syntax that are actually declarations. (Many compilers should warn on this already.)

<p align="right">Reference:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>