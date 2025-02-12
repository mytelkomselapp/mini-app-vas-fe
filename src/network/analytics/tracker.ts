import Taro from "@tarojs/taro";

interface ParamsButtonClick {
  event_category: string;
  button_name: string;
  button_purpose: string;
  screen_name: string;
  page_title: string;
  page_url: string;
}

interface ParamsTabClick {
  event_category: string;
  tab_name: string;
  screen_name: string;
  page_title: string;
  page_url: string;
}

interface ParamsSectionClick {
  event_category: string;
  list_name: string;
  screen_name: string;
  page_title: string;
  page_url: string;
}

interface ParamsCardClick {
  event_category: string;
  list_name: string;
  card_name: string;
  screen_name: string;
  page_title: string;
  page_url: string;
}

interface ParamsView {
  page_title: string;
  page_url: string;
}

interface Item {
  item_id: string | undefined;
  item_name: string | undefined;
  index: number | undefined;
  item_list_id: string;
  item_list_name: string;
  price: number | undefined;
}

interface ParamsButtonPackageClick {
  ITEM_LIST_ID: string;
  ITEM_LIST_NAME: string;
  items: Item[];
  screen_name: string;
  page_title: string;
  page_url: string;
}

interface ParamsCheckout {
  currency: string;
  value: number;
  ITEM_LIST_ID: string;
  ITEM_LIST_NAME: string;
  items: Item[];
  screen_name: string;
  page_title: string;
  page_url: string;
}

declare global {
  interface Window {
    AnalyticsWebInterface?: {
      logEvent: (eventName: string, params: string) => void;
      setScreenView: (screenName: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        firebase?: {
          postMessage: (message: any) => void;
        };
      };
    };
  }
}

const getHighPrecisionTimestampMicros = () => {
  const millis = Date.now();
  const highPrecisionMillis = millis + (performance.now() % 1); // Add sub-millisecond precision
  return Math.floor(highPrecisionMillis * 1000); // Convert to microseconds
};

const detectPlatform = () => {
  const env = Taro.getEnv();

  if (env === Taro.ENV_TYPE.WEB) {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
    } else {
      return "Unknown";
    }
  } else {
    // For non-web environments, you can directly check the platform
    return env;
  }
};

export const platform = detectPlatform();

export const sendAnalyticsEvent = async (event_name, event_params) => {
  const user_pseudo_id = "12345678901234567890123456789011"; //get from app or custParam
  const user_id = "userTes"; //get from app or custParam

  const measurement_id =
    platform === "iOS"
      ? "1:714033899288:ios:252201506f2d7405a9a06d"
      : "1:714033899288:android:ad536a1690d005d8a9a06d";
  const api_secret =
    platform === "iOS" ? "j1gmH3tdTRG-kwj2ASspww" : "jCoubsWKTzq2KIUzZzdtZQ";

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;

  try {
    const response = await Taro.request({
      url,
      method: "POST",
      data: {
        app_instance_id: user_pseudo_id,
        user_id: user_id,
        timestamp_micros: getHighPrecisionTimestampMicros(),
        non_personalized_ads: false,
        events: [
          {
            name: event_name,
            params: event_params,
          },
        ],
      },
      header: {
        "Content-Type": "application/json",
      },
      success: (res) => {
        // Handle successful response
        if (res.statusCode === 200) {
          console.log("Data received:", res.data);
        } else {
          console.error("API Error:", res);
        }
      },
      fail: (error) => {
        // Handle error
        console.error("Request failed:", error);
      },
    });

    if (response.statusCode !== 200) {
      console.error("Failed status:", response.statusCode);
      console.error("Failed to send event:", response.data);
    } else {
      console.log("Event sent successfully:", response.data);
    }
  } catch (error) {
    console.error("Error sending event:", error);
  }
};

// function call once event click
export function buttonClick(
  button_name: string = "null",
  button_purpose: string = "null",
  page_title: string = "null",
  page_url: string = "null"
): void {
  const paramsButtonClick: ParamsButtonClick = {
    event_category: "Flight Commerce Activity",
    button_name: button_name, // or Destination City; pass value in English
    button_purpose: button_purpose, // hardcode, pass value in English
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`,
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("button_click", paramsButtonClick);

  console.log("button_click");
  console.log(JSON.stringify(paramsButtonClick));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "button_click",
      JSON.stringify(paramsButtonClick)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "button_click",
      parameters: paramsButtonClick,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found}
    console.log("No Android os iOS interface found ");
  }
}

// function call once event click
export function tabClick(
  tab_name: string = "null",
  page_title: string = "null",
  page_url: string = "null"
): void {
  const paramsTabClick: ParamsTabClick = {
    event_category: "Flight Commerce Activity",
    tab_name: tab_name, // or "Plane ID"//pass value in English
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the screen based on page title
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("tab_click", paramsTabClick);

  console.log("tab_click");
  console.log(JSON.stringify(paramsTabClick));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "tab_click",
      JSON.stringify(paramsTabClick)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "tab_click",
      parameters: paramsTabClick,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found}
    console.log("No Android os iOS interface found ");
  }
}

export function sectionClick(
  list_name: string = "null",
  page_title: string = "null",
  page_url: string = "null"
): void {
  const paramsSectionClick: ParamsSectionClick = {
    event_category: "Flight Commerce Activity",
    list_name: list_name, // or "Plane ID"//pass value in English
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the screen based on page title
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("section_click", paramsSectionClick);

  console.log("section_click");
  console.log(JSON.stringify(paramsSectionClick));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "section_click",
      JSON.stringify(paramsSectionClick)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "section_click",
      parameters: paramsSectionClick,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found}
    console.log("No Android os iOS interface found ");
  }
}

// function call once event click
export function cardClick(
  card_name: string = "null",
  list_name: string = "null",
  page_title: string = "null",
  page_url: string = "null"
): void {
  const paramsCardClick: ParamsCardClick = {
    event_category: "Flight Commerce Activity",
    list_name: list_name,
    card_name: card_name, //get the page title/
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`,
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("card_click", paramsCardClick);

  console.log("card_click");
  console.log(JSON.stringify(paramsCardClick));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "card_click",
      JSON.stringify(paramsCardClick)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "card_click",
      parameters: paramsCardClick,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found}
    console.log("No Android os iOS interface found ");
  }
}

// function call once event click
export function screenView(
  screen_name: string = "null",
  page_url: string = "/flight"
): void {
  const screenName =
    screen_name === "null"
      ? "Flight Commerce"
      : `Flight Commerce - ${screen_name}`;

  const paramsView: ParamsView = {
    page_title:
      screen_name === "null" || screen_name === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${screen_name}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("page_view", paramsView);

  console.log("screen_view");
  console.log(screenName);
  console.log(paramsView);

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.setScreenView(screenName);
    window.AnalyticsWebInterface.logEvent(
      "page_view",
      JSON.stringify(paramsView)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "setScreenView",
      screenName: screenName,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);

    var messageView = {
      command: "logEvent",
      name: "page_view",
      parameters: paramsView,
    };
    window.webkit.messageHandlers.firebase.postMessage(messageView);
  } else {
    // No Android or iOS interface found
  }
}

export function select_item(
  ITEM_LIST_ID: string = "null",
  ITEM_LIST_NAME: string = "null",
  itemPackage: Item[] = [],
  page_title: string = "null",
  page_url: string = "null"
): void {
  // function call once event click
  const paramsButtonPackageClick: ParamsButtonPackageClick = {
    ITEM_LIST_ID: ITEM_LIST_ID,
    ITEM_LIST_NAME: ITEM_LIST_NAME, //dynamic based on item grouping //in English
    items: itemPackage, // array of item
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`,
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("select_item", paramsButtonPackageClick);

  console.log("select_item");
  console.log(JSON.stringify(paramsButtonPackageClick));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "select_item",
      JSON.stringify(paramsButtonPackageClick)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "select_item",
      parameters: paramsButtonPackageClick,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found
  }
}

export function begin_checkout(
  value: number = 0,
  ITEM_LIST_ID: string = "null",
  ITEM_LIST_NAME: string = "null",
  itemPackage: Item[] = [],
  page_title: string = "null",
  page_url: string = "null"
): void {
  // function call once event click
  const paramsCheckout: ParamsCheckout = {
    currency: "IDR",
    value: value,
    ITEM_LIST_ID: ITEM_LIST_ID,
    ITEM_LIST_NAME: ITEM_LIST_NAME, //dynamic based on item grouping //in English
    items: itemPackage, // array of item
    screen_name:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`,
    page_title:
      page_title === "null" || page_title === ""
        ? "Flight Commerce"
        : `Flight Commerce - ${page_title}`, //get the page title/
    page_url:
      page_url === "null" || page_url === ""
        ? window.location.origin
        : window.location.origin + page_url, //get the page url/
  };

  sendAnalyticsEvent("begin_checkout", paramsCheckout);

  console.log("begin_checkout");
  console.log(JSON.stringify(paramsCheckout));
  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(
      "begin_checkout",
      JSON.stringify(paramsCheckout)
    );
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.firebase
  ) {
    // Call iOS interface
    var message = {
      command: "logEvent",
      name: "begin_checkout",
      parameters: paramsCheckout,
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android os iOS interface found
  }
}

// export const sendAnalyticsEvent = async (onSuccess, onError) => {
//   const measurement_id = "1:714033899288:android:ad536a1690d005d8a9a06d";
//   const api_secret = "jCoubsWKTzq2KIUzZzdtZQ";

//   const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         app_instance_id: "12345678901234567890123456789011",
//         user_id: "azizTesAndroid",
//         timestamp_micros: 1732592933775477,
//         non_personalized_ads: false,
//         events: [
//           {
//             name: "button_clicc",
//             params: {
//               event_category: "Flight Commerce Activity",
//               button_name: "Check Flights",
//               button_purpose: "Check Flights",
//               page_location: "https://www.telkomsel.com/...",
//               page_title: "Redmi Note 12 Vs Redmi Note 12 Pro...",
//               page_referrer: "my_telkomsel_apps",
//               session_id: 1730166412,
//               engagement_time_msec: 1000,
//               debug_mode: 1,
//             },
//           },
//         ],
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Event sent successfully:", data);
//       if (typeof onSuccess === "function") {
//         onSuccess(data); // Call success callback
//       }
//     } else {
//       const errorText = await response.text();
//       console.error("Failed to send event:", errorText);
//       if (typeof onError === "function") {
//         onError(
//           new Error(
//             `Request failed with status: ${response.status} - ${errorText}`
//           )
//         );
//       }
//     }
//   } catch (error) {
//     console.error("Error sending event:", error);
//     if (typeof onError === "function") {
//       onError(error); // Call error callback
//     }
//   }
// };
