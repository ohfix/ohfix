+++
categories = []
date = 2020-05-19T17:00:00Z
images = []
series = []
tags = ["OS"]
title = "File Management"
toc = true

+++
# BOOT SECTOR

### Ý nghĩa

Là phần khởi động của volume, chứ một số thông tin cần thiết, được tổ chức thành 6 vùng theo thứ tự như sau:

1. **Jump Code** – chiếm 3 bytes từ offset 0 đến 2
2. **OEM ID** – chiếm 8 bytes từ offset 3 đến 10: EMX1.0
3. **BIOS Parameter Block (BPB)** – chiếm 53 bytes, nằm kế sau vùng OEM_ID (offset Bh)

   a. Số byte trên sector – chiếm 2 bytes tại offset 11, 12: 00 02h ð 512d

   b. Số sector trên cluster – chiếm 1 byte tại offset 13: 08h ð 8d

   c. Số sector dự phòng – chiếm 2 bytes tại offset 14, 15: D2 0Ch ð 53772d

   d. Số bảng FAT – chiếm 1 byte tại offset 16: 02h ð 2

   e. Sector không dùng – chiếm 9 bytes từ offset 17 đến 25

   f. Số lượng đầu đọc – chiếm 2 bytes tại offset 26, 27: FF 00h ð 65280d

   g. Số sector vùng hệ thống – chiếm 4 bytes tại offset 28 đến 31 : 00 08 00 00h ð 8d

   h. Tổng số sector của volume – chiếm 4 bytes từ offset 32 đến 35

   i. Số sector bảng FAT – chiếm 4 bytes từ offset 36 đến 39: 97 39 00 00h ð 14743d

   j. Version – chiếm 4 bytes từ offset 40 đến 43: 00 12 01 22h

   k. Cluster bắt đầu của RDET – chiếm 4 bytes từ offset 44 đến 47: 02 00 00 00h ð 2

   l. Sector chứa thông tin phụ – chiếm 2 bytes tại offset 48, 49: 01 00h ð 1

   m. Sector chứa bản lưu Boot Sector – chiếm 2 bytes tại offset 50, 51: 06 00h

   n. Không dùng – chiếm 12 bytes từ offset 52 đến 63
4. **BIOS Parameter Block mở rộng** – chiếm 26 bytes

   a. Physic drive – chiếm 1 byte tại offset 66: 80h ð 128

   b. Dự phòng – chiếm 1 byte tại offset 67: 00

   c. Kí hiệu nhận diện HĐH – chiếm 1 byte tại offset 68: 29h

   d. SerialNumber của Volume – chiếm 4 bytes từ offset 69 đến 72: D6 2A 0E D1h

   e. Volume Label – chiếm 11 bytes từ offset 73 đến 83: OCUN0G1

   f. File system – chiếm 8 bytes từ offset 84 đến 91 : EMXFAT
5. **Bootrap Code** – chiếm 420 bytes
6. **Dấu hiệu kết thúc** – 2 bytes cuối (offset 1FEh và 1FFh) và có giá trị 55h và AAh

# FAT (FileAllocationTable)

### Ý nghĩa

Đây là bảng cấp phát tập tin, giúp định vị các file trên đĩa

### Gồm 2 phần:

1. **_fat**: có cấu trúc tương tự như bảng FAT trong FAT32
2. **_clus_available**: là một queue chứa vị trị các cluster còn trống

### Một số chức năng nổi bật:

* FileAllocationTable: hàm khởi tạo FAT từ **_fat**, xét nếu entry nào của fat rỗng (giá trị bằng 0) thì sẽ Enqueue vào _clus_available để sử dụng về sau
* GetListNextClusterEmpty: lấy một chuỗi **size** (số lượng các cluster cần) các cluster trống, ví dụ \[3, 7, 14, ...\], đồng thời Dequeue _clus_available để đánh dấu là các cluster này không còn khả dụng nữa - Hỗ trợ chèn file vào hệ thống
* ReadFatEntry / SetFatEntry: đọc entry thứ n của **_fat** / gán entry thứ n của **_fat** bằng value_cluster - Hỗ trợ đọc / xóa file.

# RDET

Bảng thư mục gốc, chứa nhiều entry, mỗi entry sẽ chứa thông tin của tập tin / thư mục

### Gồm _srdet, là một mảng các SRDETEntry (tổng kích thước là 64 byte) có cấu trúc như sau:

* **FLAG**: là byte chứa giá trị của cờ hiệu, xác định trạng thái của file
* **FILE_NAME**: là một chuỗi chứa tên file (không bao gồm file extension), có kích thước là 23 byte
* **FILE_EXT**: là một chuỗi chứa file extension, có kích thước là 8 byte
* **FILE_ATTRIBUTE**: là byte chứa thuộc tính của file
* **REVERSED**: là byte xác định xem vị trí này đã được lấy chưa
* **DMSTIME**: tạm thời không dùng đến thuộc tính này
* **CREATED_DATETIME**: 4 byte chứa thời gian tạo
* **LAST_ACCESS_DATE**: 2 byte chứa thời gian truy cập gần nhất
* **MODIFIED_DATETIME**: 4 byte chứa thời gian chỉnh sửa gần nhất
* **FIRST_CLUSTER_LOW_WORD**: 4 byte chứa vị trí cluster đầu tiên
* **FILE_SIZE**: 4 byte chứa kích thước của file
* **PASSWORD**: chuỗi 11 byte chứa mật khẩu của file ở dạng đã mã hóa (hash)

### Một số chức năng nổi bật

* GetEmptyEntry: trả về vị trí entry còn trống trong _srdet (có FLAG = 0x00), nếu không còn entry trống thì trả về -1
* ReadEntryPos: trả về SRDETEntry tại vị trí pos trong _srdet

# FLAGS

### Ý nghĩa

Định nghĩa một số cờ hiệu giúp cho việc xác định cũng như thao tác trên file / tập tin thuận tiện hơn

### Ý nghĩa các cờ hiệu

* **READ_ONLY** = 0x01: đây là file chỉ đọc, không thể chỉnh sửa
* **HIDDEN** = 0x02: đây là file được ẩn đi
* **SYSTEM** = 0x04: đây là file hệ thống
* **VOLUMN_LABEL** = 0x08: đây là volume
* **SUB_DIRECTORY=** 0x10: đây là SDET
* **Archieve** = 0x20: đây là vùng lưu trữ
* **Device** = 0x40: đây là thiết bị
* **Reserved** =0x80: đây là vị trí đã được lấy

# DataComponent

### Ý nghĩa

Là một cấu trúc nền tảng dùng chung cho file và folder, hay còn gọi là Abstract Class

### Cấu trúc

* **parent_cluster**: số nguyên chứa vị trí cluster cha của DataComponent này, mặc định là root
* Cùng một số thuộc tính khác tựa như **SRDETEntry**
* **_entry**: là một SRDETEntry
* **_list_component**: chứa một mảng chính nó với chiều dài mặc định là 0
* **_tree_node**:

### Một số chức năng nổi bật

1. Chức năng ảo (để có thể override theo nhu cầu của file / folder):
   * GetTreeNode: là hàm đệ quy để lấy tất cả TreeNode con và trả về chúng
   * PrintPretty: là hàm đệ quy in ra tất cả những component con theo indent định sẵn
   * GetEntry: hàm trả về một entry được tạo mới từ những thuộc tính trong class này
   * Remove, Recover: đặt cờ hiệu cho Reversed,...
   * DataSize: trả về kích thước của DataComponent, được thiết kế mặc định là đệ quy vào trong để tính tổng kích thước, tức xem mặc định là folder
   * SearchComponent: trả component con với tên là **str**, nếu không tìm đươc thì trả về null
2. Chức năng mặc định (đều có ở file / folder):
   * Một hàm tạo với **entry** cho sẵn, gán một số giá trị cơ bản của **entry** vào **_entry**, cũng như đặt lại thời gian tạo / truy cập / chỉnh sửa thành thời gian hiện tại.
   * IsDeleted / IsHidden / IsReadOnly: xác định xem cấu trúc này có bị xóa / ẩn / chỉ đọc không, dựa vào cờ hiệu **_flag** cũng như **_reversed**
   * HasPassword: xác định xem nó có chứa password không, để có thể yêu cầu người dùng cung cấp password để có thể truy cập / chỉnh sửa
   * ToString: chỉ trả về tên FileName nếu là folder (trong trường hợp này FileName trở thành FolderName), nếu là file thì trả về FileName + FileExt

# FileModel

### Ý nghĩa

Là một lớp biểu diễn của file, kế thừa từ lớp **DataComponent** và override lại một số chức năng của riêng nó

### Cấu trúc

**_data**: là một chuỗi các byte, chứa nội dung của file

### Một số chức năng

* Đa phần đều kế thừa lại từ **DataComponent**
* Override hàm DataSize lại, trả về kích thước của file, tức trả về kích thước của **_data**

# FolderModel

### Ý nghĩa

Là một lớp biểu diễn của folder, kế thừa từ lớp **DataComponent** và override lại một số chức năng của riêng nó

### Cấu trúc

* **dir_cluster**: chứ địa chỉ cluster của folder cha
* **recursive**: có đệ quy hay không, mặc định là không
* **_core_disk**: là một **DiskManagement**, để quản lí ổ đĩa

### Một số chức năng nổi bật

* Đa phần đều kế thừa lại từ **DataComponent**
* GetAllInside: trả về mỗi chuỗi các DataComponent, trong đó đã xác định đâu là file, đâu là folder
* DataSize: do đây là folder, nên ta chỉ cần gọi lại hàm DataSize từ base (DataComponent) mà không cần phải làm gì thêm

# DiskManagement

### Ý nghĩa

Giúp quản lí ổ đĩa

### Cấu trúc

* cluster_size_in_bytes: kích thước cluster, mặc định là 4096 bytes
* boot_sector_size: kích thước của boot sector, mặc định là 3282 * 512
* fat1_pos: vị trí đầu tiên của bảng fat1, mặc định là 3282 * 512
* fat2_pos: vị trí đầu tiên của bảng fat2, mặc định là 18025* 512
* rdet_pos: vị trí đầu tiên của bảng rdet, mặc định là 32768 * 512
* data_pos: vị trí đầu tiên của vùng dữ liệu (data), mặc định là (32768 + 8) * 512
* EOF: kí hiệu kết thúc của file, tức 0x0FFFFFFF = 268435455
* Cùng một số class cần thiệt như FileStream, SFileAcllocationTable, FileAcllocationTable, SRDET, RDET
* _volumn_opened: xác định xem volume có được mở hay không

### Một số chức năng nổi bật

* OpenStream: Mở file volume lên, mặc định là file "disk.dat", sau đó đánh dấu là volume đã được mở. Ngược lại cho chức năng CloseStream
* CreateBootSector: tạo Boot Sector với một số thông số cơ bản như phần Boot Sector đã trình bày
* CreateFAT: tạo bảng FAT
* CreateRDET: tạo bảng RDET với một số thông số cơ bản đã trình bày trong phần RDET
* CreateVolumn: tạo volume mới, trong hàm này sẽ gọi lại 3 hàm trên để đủ cấu trúc cho một volume
* UpdateEntry / WriteNewEntry: chỉnh sửa entry / tạo mới một entry
* Cùng một số chức năng như đọc, ghi trên bảng fat, rdet,...
* ImportFile: xác định cluster đầu, kích thước cũng như xác định các cluster trống để ghi file, bên cạnh đó chỉnh sửa các fat entry để có thể đọc, ghi sau này. Cũng như tạo entry mới trong SRDET, để có thể xác định được các thông số cơ bản của file

# FileManagement

### Ý nghĩa

Giúp quản lí file

### Cấu trúc

Chứa **_disk** - là một DiskManagement như trên

### Một số chức năng nổi bật

* CreateNewFileRoot: Tạo một file mới trong thư mục chính (root) của volume
  * Tìm các cluster trống trong FAT ROOT
  * Lấy các danh sách cluster ghi
  * Ghi dữ liệu vào FAT các cluster đã dùng
  * Ghi entry
  * Ghi data
* AddNewFile: Tương tự như hàm trên, có điều bây giờ file sẽ có parent riêng, chứ không phải chỉ là root, tương tự cho hàm CreateFolder
* DeleteFile: trường hợp này sẽ đánh dấu Reversed của file thành 0xE5, sau đó update SRDETEntry, tương tự cho hàm DeleteFolder
* Tương tự cho hàm RecorverFile, nhưng lúc này cờ sẽ là 0x00
* GetAllInsideFolder: trả về tất cả file & folder nằm trong folder này
* ExportFile: xuất file ra bên ngoài
  * Xác định eof trong FAT
  * Tạo một mảng byte chứa nội dung của File, tên là bytes.
  * Sau đó dùng loop, bắt đầu từ cluster đầu tiên của file, đọc nội dung của cluster đó thông qua hàm **ReadBlockData** của _disk rồi gán vào bytes, sau đó xác định các cluster kế tiếp thông qua bảng fat, nếu khác eof thì tiếp tục đọc từ cluster đó và lặp lại, không thì ngừng loop.
  * Tiếp theo là dùng hàm hỗ trợ để viết bytes vào vị trí file đích muốn xuất ra.