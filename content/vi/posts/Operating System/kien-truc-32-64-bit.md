---
title: Hệ điều hành 32 bit và 64 bit
date: 2020-05-04T17:00:00.000+00:00
images:
- https://picsum.photos/1024/768/?random
toc: true
tags:
- OS
categories:
- Viết lách
series:
- OS

---
## Lịch sử HĐH 32 bit

* Là hệ điều hành chính, được sử dụng rộng rãi vào những năm đầu thập niên 90.
* Kiến trúc 32 bit bắt đầu được sử dụng trong chip 2000 AMD và Intel Pentium

## Lịch sử HĐH 64 bit

* Kiến trúc 64 bit đã được sử dụng trong các Siêu máy tính từ đầu thập niên 70.
* Bộ xử lí AMD64 đầu tiên (Opteron), được phát hành vào đầu quý II năm 2003.

## Giống nhau:

* Không gian địa chỉ là luỹ thừa bậc n của 2

* Chúng đều có thể thực thi các chương trình có kiến trúc 32 bit

## Khác nhau:

| Thông số           | HĐH 32 bit                                                   | HĐH 64 bit                                   |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| Không gian địa chỉ | <MATH>2^32</MATH> bit - 4 GB                                 | <MATH>2^64</MATH> bit - 16 GB                |
| Ứng dụng hổ trợ    | Không hỗ trợ các chương trình / ứng dụng 64 bit              | Hỗ trợ cả các chương trình / ứng dụng 32 bit |
| HĐH hỗ trợ         | Chỉ hỗ trợ HĐH 32 bit                                        | Hỗ trợ cả HĐH 32 bit và 64 bit               |
| Bộ nhớ giới hạn    | Tối đa là 3.2 GB RAM 32 bit Windows. Điều ngày ngăn ta sử dụng hết 4GB của bộ nhớ vật lý | Tối đa là 17 tỷ GB RAM                       |
| Đa nhiệm           | Không lý tưởng do không gian địa chỉ quá nhỏ                 | Cực kì lý tưởng                              |

## Ưu điểm

| HĐH 32 bit                                                   | HĐH 64 bit                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Tương thích với hầu hết các thiết bị phát triển cuối thập niên 90 | Hiệu suất cực cao, cho phép truy cập bộ nhớ ảo trên mỗi tiến trình |
|                                                              | Khả năng bảo mật được nâng cao do được thêm một số sự bảo vệ (không có ở HĐH 32 bit) |

## Khuyết điểm

| HĐH 32 bit                                                   | HĐH 64 bit                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Nhà cung cấp đã không còn phát triển các ứng dụng cho HĐH này | Hầu như không tương thích với các phần cứng cũ               |
| Nhiều bộ xử lý yêu cầu HĐH phải là 64 bit                    | Tuy có thể chạy được các ứng dụng 32 bit, tuy vậy, nhiều ứng dụng 32 bit cũ vấn không chạy mượt mà trên HĐH này |
| Có thể thiếu drive do nhiều nhà sản xuất không cung cấp driver 32 bit do nhu cầu về các driver này không cao |                                                              |