import logo from "./logo.svg";
import Movies from "./components/Movies";
import React from "react";
import "./App.css";
import { Form } from "react-bootstrap";
class App extends React.Component {
  state = {
    searchFor: "Harry Potter",
  };
  render() {
    return <Movies title={this.state.searchFor} />;
  }
}

export default App;
