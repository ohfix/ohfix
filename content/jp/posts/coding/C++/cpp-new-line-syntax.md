---
title: "C++ 改行構文"
date: 2019-08-25T16:45:57+07:00
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

`std::endl` よりも `'\n'` または `"\n"` を優先してください。

## 理由

`std::endl` マニピュレータは、ほとんどが `'\n'` および `"\n"` と同等です。 最も一般的に使用されるように、冗長な `flush()`を実行することにより、出力を単に遅くします。 この速度の低下は、`printf` スタイルの出力と比較して大幅な場合があります。

## 例

```C++
std::cout << "Hello, World!" << std::endl; // 2 つの出力操作と 1 flush
std::cout << "Hello, World!\n";            // 1 つの出力操作といいえ flush
```

## 注意

- `cin` / `cout`（および同等の）対話の場合、`flush`する理由はありません。 それは自動的に行われます。 ファイルに書き込むために、`flush` する必要はほとんどありません。
- パフォーマンスの（ときどき重要な）問題は別として、`'\n'` と `std::endl` の選択はほぼ完全に美的です。

<p align="right">参照:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>