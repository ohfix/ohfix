---
title: "C++ Biểu diễn Con trỏ Rỗng"
date: 2019-08-19T19:43:53+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - Đề xuất
  - Con trỏ
categories:
  - Lập trình
series:
  - C++
---

## Quy tắc

Dùng `nullptr` thay vì `0` hay `NULL`.

## Lý do

- Dễ đọc. Vì C++ định nghĩa `NULL` là một hằng số kiểu `int` có giá trị `0`, điều này có thễ dẫn đến sai sót trong một số trường hợp như ví dụ bên dưới. Giảm thiểu bất ngờ: `nullptr` không gây bối rối như `NULL`, do nó được định nghĩa là một `con trỏ` rỗng.

- Thế nên, `nullptr` có kiểu được quy định rõ (rất hạn chế), và do vậy hoạt động tốt trong nhiều bối cảnh nơi mà [type deduction](https://www.modernescpp.com/index.php/c-insights-type-deduction) có thể sai trên `NULL` hay `0` .

## Ví dụ

```C++
void f(int);
void f(char*);
f(NULL);    // gọi f(int)
f(nullptr); // gọi f(char*)
```

## Thực thi

Gắn cờ việc sử dụng `0` và `NULL` cho con trỏ. Việc chuyển đổi có thể được giúp đỡ bằng các chương trình chuyển đổi đơn giản.

<p align="right">Tham khảo:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>