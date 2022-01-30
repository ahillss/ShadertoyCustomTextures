var script = document.createElement('script');
script.src = chrome.runtime.getURL('myscript.js');
(document.body || document.head).appendChild(script);