var script = document.createElement('script');
script.src = chrome.runtime.getURL('myscript.js');
(document.body || document.head || document.documentElement).appendChild(script);