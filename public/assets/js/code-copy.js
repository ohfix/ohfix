/**
 * Utils
 */

// Add code-copy buttons using progressive enhancement
// © 2019. Tom Spencer
// https://www.fiznool.com/blog/2018/09/14/adding-click-to-copy-buttons-to-a-hugo-powered-blog/
(function() {
  'use strict';
      var modeW = document.getElementById("IDCommentsPostTitle").innerHTML;
      var _copy = 'Copy';
      var _copied = 'Copied';
      var _fail = 'Failed:\'('
      if (modeW === 'vi') {
        _copy = 'Sao chép';
        _copied = 'Đã sao chép';
        _fail = 'Thất bại:\'(';
      } else if (modeW === 'jp') {
        _copy = 'コピー';
        _copied = 'コピーしました';
        _fail = '失敗した:\'(';
      }


  if(!document.queryCommandSupported('copy')) {
    return;
  }

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = _copy;
    }, 1500);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  function addCopyButton(containerEl) {
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn";
    copyBtn.textContent = _copy;

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        flashCopyMessage(copyBtn, _copied)
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, _fail);
      }
    });

    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  var highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
})();
