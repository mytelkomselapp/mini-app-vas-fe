import Taro from "@tarojs/taro";

export const getMobileOperatingSystem = () => {
  var userAgent = navigator.userAgent;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "unknown";
};

export const getLatestUpdateVersion = () => {
  console.log("checking update availability...");
  const updateManager = Taro.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // Callback after requesting the new version information
    console.log("has Update?", res.hasUpdate);
  });
  updateManager.onUpdateReady(function () {
    Taro.showModal({
      showCancel: false,
      title: "New version available",
      content: "You can apply the update now. Restart the app?",
      success(res) {
        if (res.confirm) {
          // The new version has been downloaded. Call 'applyUpdate to apply it and restart the app.
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(function () {
    // New version download failed
    Taro.showToast({
      title: "Update failed. Please try again later.",
      icon: "none",
    });
  });
};
