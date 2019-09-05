---
title: "C++ Cú pháp Khởi tạo"
date: 2019-08-23T15:57:38+07:00
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

## Quy tắc

- Thích cú pháp khởi tạo `{}`.
- Tránh cú pháp khởi tạo `()`, vì nó cho phép phân tích cú pháp mơ hồ.

## Lý  do

- Các quy tắc cho khởi tạo `{}` đơn giản hơn, tổng quát hơn, ít mơ hồ hơn và an toàn hơn so với các hình thức khởi tạo khác.
- Chỉ sử dụng `=` khi các bạn chắc chắn rằng không thể có chuyển đổi hẹp. Đối với các kiểu số học tích hợp, chỉ sử dụng `=` với `auto`.

## Ví dụ

```C++
int x {7.9}; // lỗi: chuyển đổi hẹp
int y (7.9); // OK: y trở thành 7. Hy vọng trình biên dịch cảnh báo
int z = 7.9; // OK: z trở thành 7. Hy vọng trình biên dịch cảnh báo
```

```C++
template<typename T, typename U>
void f(T t, U u) {
   T v1(x);       // v1 là hàm hay biến?
   T v2 {x};      // biến
   auto x = T(u); // hàm tạo hay chuyển đổi?
}
```

## Thực thi

- Gắn cờ việc sử dụng `=` để khởi tạo các kiểu số học trong đó có chuyển đổi hẹp xảy ra.
- Gắn cờ việc sử dụng cú pháp khởi tạo `()` nhưng thực sự là khai báo. (Nhiều trình biên dịch nên cảnh báo về điều này rồi.)

<p align="right">Tham khảo:
<a href="http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines">
The C++ Core Guidelines
</a>
</p>