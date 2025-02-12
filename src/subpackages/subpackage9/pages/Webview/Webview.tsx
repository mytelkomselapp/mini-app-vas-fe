import Taro from "@tarojs/taro";
import { WebView } from "@tarojs/components";

const Webview = () => {
  const url = Taro.getCurrentInstance()?.router?.params?.url;
  // Decode the URL only if it exists; otherwise, provide a default or handle the error case
  const decodedUrl = url ? decodeURIComponent(url) : "";

  return <WebView src={decodedUrl} />;
};

export default Webview;
