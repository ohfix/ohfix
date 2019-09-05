---
title: "C++ ヌルポインターを表す"
date: 2019-08-19T19:43:53+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - お勧め
  - ポインタ
categories:
  - プログラミング
series:
  - C++
---

## ルール

つかいます `nullptr` つかいます `0` または `NULL`。

## 理由

- 読みやすさ。C++ で定義されている `NULL` は `const` 型であるため、`int` の値は `0` であるため、次の例のような状況では誤った結果になる可能性があります。驚きを最小限に抑える：`nullptr` は `int` と混同することはできません。これは、ヌル `ポインター` として定義されているためです。

- したがって、`nullptr` には適切に指定された（非常に制限的な）型があるため、[型の推定](https://www.modernescpp.com/index.php/c-insights-type-deduction) が `NULL`または `0` に対して間違った動作をする可能性のあるシナリオで機能します。

## 例

```C++
void f(int);
void f(char*);
f(NULL);    // コール f(int)
f(nullptr); // コール f(char*)
```

## 執行

ポインターに `0` と `NULL` の使用を示すフラグ。変換は、単純なプログラム変換によって支援される場合があります。

<p align="right">参照:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>