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
