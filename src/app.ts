import { Component } from "react";
import "./app.scss";

import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}

class App extends Component<AppProps> {
  render() {
    return this.props.children;
  }
}

export default App;
