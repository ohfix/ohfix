---
title: "C++ Cú pháp Xuống dòng"
date: 2019-08-25T16:45:57+07:00
draft: false
toc: true
images:
  - https://picsum.photos/1024/768/?random
tags: 
  - C++
  - Đề xuất
categories:
  - Lập trình
series:
  - C++
---

## Nguyên tắc

Thích `'\n'` hay `"\n"` hơn `std::endl`.

## Lý do

Từ khóa điều khiển `std::endl` hầu hết tương đương với `'\n'` và `"\n"`; khi được sử dụng thường xuyên, hầu hết nó chỉ đơn giản là làm chậm đầu ra bằng cách thực hiện `flush()` s dự phòng. Sự chậm lại này có thể là đáng kể so với đầu ra kiểu `printf`.

## Ví dụ

```C++
std::cout << "Hello, World!" << std::endl; // 2 toán tử xuất và 1 flush
std::cout << "Hello, World!\n";            // 1 toán tử xuất và không flush
```

## Chú ý

- Đối với tương tác `cin` / `cout` (và tương đương), không có lý do gì để `flush`; điều đó được thực hiện tự động. Để ghi vào một tập tin, hiếm khi cần phải `flush`.
- Ngoài vấn đề (đôi khi quan trọng) về hiệu suất, sự lựa chọn giữa `'\n'` và `std::endl` gần như hoàn toàn về mặt thẩm mỹ. 

<p align="right">Tham khảo:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>