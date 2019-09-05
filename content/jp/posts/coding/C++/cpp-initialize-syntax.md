---
title: "C++ 構文の初期化"
date: 2019-08-23T15:57:38+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - お勧め
categories:
  - プログラミング
series:
  - C++
---

## ルール

- `{}`-初期化構文を優先します。
- あいまいさの解析を可能にする `()`初期化を避けます。

## 理由

- `{}` の初期化のルールは、他の形式の初期化よりも単純で、より一般的で、曖昧さが少なく、安全です。
- 変換を狭めることができないことが確実な場合にのみ、`=` を使用します。 組み込みの算術型の場合、`auto` でのみ `=` を使用します。

## 例

```C++
int x {7.9};   // エラー：ナローイング
int y (7.9);   // OK：y は 7 になります。コンパイラの警告を期待します
int z = 7.9;   // OK：z は 7 になります。コンパイラの警告を期待します
```

```C++
template<typename T, typename U>
void f(T t, U u) {
   T v1(x);       // v1 は関数または変数ですか？
   T v2 {x};      // 変数
   auto x = T(u); // 建設またはキャスト？
}
```

## 執行

- 絞り込みが発生する算術型を初期化するための `=` の使用にフラグを立てます。
- 実際には宣言である `()` 初期化構文の使用にフラグを立てます。（多くのコンパイラはこれについてすでに警告するはずです。）

<p align="right">参照:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>
