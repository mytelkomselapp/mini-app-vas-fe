import * as React from "react";
import { withReactQuery } from "./hoc";
import './index.css'
import './app.scss'

interface AppProps {
  children: React.ReactNode;
}

class App extends React.Component<AppProps> {
  render() {
    return this.props.children;
  }
}

export default withReactQuery(App);
