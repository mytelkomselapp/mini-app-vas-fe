// webviewWorker.js
Worker.onMessage(function (event) {
  const { targetUrl } = event;
  Worker.postMessage({
    event: "openWebView",
    data: {
      url: targetUrl,
    },
  });
});
