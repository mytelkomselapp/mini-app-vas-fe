import Taro from "@tarojs/taro";

const useNavigate = () => {
  const fallbackHandleNavigate = (pathname: string, search: string = "") => {
    Taro.reLaunch({
      url: "/pages/LandingPageRamadan/index",
    }).then((_) => {
      Taro.navigateTo({
        url: pathname + search,
      }).catch((_err) => {
        Taro.showModal({
          title: `Oops! Terjadi masalah pada aplikasi.`,
          content:
            "Buka ulang aplikasi untuk me-mastikan semuanya berjalan lancar",
          showCancel: false,
          confirmText: "Oke",
        });
      });
    });
  };

  const handleNavigate = (
    pathname: string,
    search: string = "",
    state?: any
  ) => {
    if (state) {
      Taro.setStorageSync(pathname, state);
    }
    Taro.navigateTo({
      url: pathname + search,
    }).catch((err) => {
      console.error("Navigation to subpackage failed:", err);
      fallbackHandleNavigate(pathname, search);
    });
  };

  const getNavigateState = (pathname: string) => {
    const _pathname = pathname.startsWith("/") ? pathname : "/" + pathname;
    const state = Taro.getStorageSync(_pathname);
    Taro.removeStorageSync(_pathname);
    return state;
  };

  return {
    navigate: handleNavigate,
    getState: getNavigateState,
  };
};

export default useNavigate;
