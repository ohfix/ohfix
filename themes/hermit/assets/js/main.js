/**
 * Utils
 */

// Load and run script via AJAX
//
const loadScript = (source, beforeEl, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    const prior = beforeEl || document.getElementsByTagName('script')[0];

    script.async = async;
    script.defer = defer;

    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null;
        script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          reject();
        } else {
          resolve();
        }
      }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  });
}

// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = window.pageYOffset;
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight'
    mobileMenuVisible = false;
  }
}

// Featured Image Toggle
//
const showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
}

const hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
}

// ToC Toggle
//
const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}

//Load Comments
//
// let commentsLoaded = false;
// let comments = document.getElementById('comments');
// let commentsLoader = document.getElementById('comments-loader');

// const avJsUrl = '//cdn.jsdelivr.net/npm/leancloud-storage@3.11.1/dist/av-min.js';
// const valineJsUrl = 'https://github.com/HBTghost/hamburger/blob/master/vanile.js';
// var nameE = 'en',
//     modeE = {
//         head:{
//             nick:'NickName',
//             mail:'E-Mail (To get Gravatar)',
//             link:'Website (http://):',
//         },
//         tips:{
//             comments:'Comments',
//             sofa:'No comments yet.',
//             busy:'Submit is busy, please wait...',
//             again:'Sorry, this is a wrong calculation.',
//             limit:'The largest number of words %d'
//         },
//         ctrl:{
//             reply:'Reply',
//             ok:'Ok',
//             sure:'Sure',
//             cancel:'Cancel',
//             confirm:'Confirm',
//             continue:'Continue',
//             more:'Load More...',
//             try:'Once More?',
//             preview:"Preview",
//             emoji:"Emoji"
//         },
//         error:{
//             99:'Initialization failed, Please check the `el` element in the init method.',
//             100:'Initialization failed, Please check your appId and appKey.',
//             401:'Unauthorized operation, Please check your appId and appKey.',
//             403:'Access denied by api domain white list, Please check your security domain.',
//         },
//         timeago:{
//             seconds:'seconds ago',
//             minutes:'minutes ago',
//             hours:'hours ago',
//             days:'days ago',
//             now:'just now'
//         }
//     };

// var nameJ = 'jp',
//     modeJ = {
//         head:{
//             nick:'ニックネーム',
//             mail:'Eメール（グラバターを取得するには）',
//             link:'ウェブサイト(http://):',
//         },
//         tips:{
//             comments:'コメント',
//             sofa:'コメントはまだありません。',
//             busy:'送信中です。しばらくお待ちください...',
//             again:'申し訳ありませんが、これは間違った計算です。',
//             limit:'単語の最大数%d'
//         },
//         ctrl:{
//             reply:'応答',
//             ok:'Ok',
//             sure:'確かに',
//             cancel:'キャンセル',
//             confirm:'確認する',
//             continue:'持続する',
//             more:'さらに読み込む...',
//             try:'もう一度？',
//             preview:'プレビュー',
//             emoji:'絵文字'
//         },
//         error:{
//             99:'初期化に失敗しました。initメソッドの `el` 要素を確認してください。',
//             100:'初期化に失敗しました。appId と appKey を確認してください。',
//             401:'不正な操作です。appId と appKey を確認してください。',
//             403:'APIドメインホワイトリストによりアクセスが拒否されました。セキュリティドメインを確認してください。',
//         },
//         timeago:{
//             seconds:'秒前',
//             minutes:'数分前',
//             hours:'時間前',
//             days:'数日前',
//             now:'ちょうど今'
//         }
//     };

// var nameV = 'vi',
//     modeV = {
//         head:{
//             nick:'Tên nick',
//             mail:'E-Mail (Để lấy Gravatar)',
//             link:'Địa chỉ trang web (http://)',
//         },
//         tips:{
//             comments:'Bình luận',
//             sofa:'Chưa có bình luận nào.',
//             busy:'Gửi đang bận, vui lòng đợi...',
//             again:'Xin lỗi, đây là một tính toán sai.',
//             limit:'Số lượng từ lớn nhất %d'
//         },
//         ctrl:{
//             reply:'Đáp lại',
//             ok:'Ok',
//             sure:'Chắc chắn',
//             cancel:'Hủy bỏ',
//             confirm:'Xác nhận',
//             continue:'Tiếp tục',
//             more:'Tải thêm...',
//             try:'Một lần nữa?',
//             preview:"Xem trước",
//             emoji:"Cảm xúc"
//         },
//         error:{
//             99:'Việc khởi tạo thất bại, vui lòng kiểm tra phần tử `el` trong phương thức khởi tạo.',
//             100:'Không khởi tạo được, vui lòng kiểm tra appId và appKey của bạn.',
//             401:'Hoạt động trái phép, Vui lòng kiểm tra appId và appKey của bạn.',
//             403:'Truy cập bị từ chối bởi danh sách trắng tên miền api, Vui lòng kiểm tra miền bảo mật của bạn.',
//         },
//         timeago:{
//             seconds:'giây trước',
//             minutes:'phút  trước ',
//             hours:'giờ trước ',
//             days:'ngày trước ',
//             now:'hiện tại'
//         }
//     };

// var valine = new Valine();
// // 2. Installation language:

// const loadComments = () => {
//     var modeW = document.getElementById("whichMode").innerHTML;
//     var modeL = modeE;
//     var nameL = nameE;
//     var tus = 'Say something...'
//     if (modeW === 'vi') {
//       modeL = modeV;
//       nameL = nameV;
//       tus = "Nói gì đó đi..."
//     } else if (modeW === 'jp') {
//       modeL = modeJ;
//       nameL = nameJ;
//       tus = "何か言って..."
//     }
//     var valine = new Valine();
//     valine.installLocale(nameL,modeL)
//     valine.init({
//       el: '#comments',
//       notify: true,
//       verify: true,
//       appId: '9z9yorkFMUAYOJ0fCQYCuA9D-MdYXbMMI',
//       appKey: 'BTNNSKDYsPQ3PA1xQ409pzNi',
//       placeholder: tus,
//       lang: nameL,
//       avatar:'' // (''/mm/identicon/monsterid/wavatar/robohash/retro/hide)
//     })
//     commentsLoader.style.display = 'none';
//   () => {
//     console.log('Failed to Load Valine.min.js');
//   };
// }


if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);
  listen('#toc-btn', "click", toggleToc);
  listen('#img-btn', "click", showImg);
  listen('.bg-img', "click", hideImg);

  // Load comments if the window is not scrollable
  // if ((comments !== null) && (comments.offsetTop < window.innerHeight)) {
  //   commentsLoader.style.display = 'block';
  //   loadComments();
  //   commentsLoaded = true;
  // }

  document.querySelectorAll('.post-year').forEach((ele) => {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();
    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }

    // if ((comments !== null) && (commentsLoaded == false)) {
    //   if (window.pageYOffset + window.innerHeight > comments.offsetTop) {
    //     commentsLoader.style.display = 'block';
    //     // loadComments();
    //     commentsLoaded = true;
    //   }
    // }
  }, 250));
}
