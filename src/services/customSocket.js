import React, { Component } from "react";
import { SERVER_URL, ACCESS_TOKEN } from "../utils/config";

import RfadSwitch from "../components/rfadSwitch";

export default class CustomSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
    };
  }

  componentDidMount() {
    this.connect();
  }

  timeout = 250; // Initial timeout duration as a class variable

  /**
   * @function connect
   * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
   */
  connect = () => {
    var ws = new WebSocket(SERVER_URL);
    let that = this; // cache the this
    var connectInterval;

    // websocket onopen event listener
    ws.onopen = () => {
      console.log("connected websocket main component");
      // Sending Authentication token
      if (ACCESS_TOKEN)
        ws.send(JSON.stringify({ type: "auth", access_token: ACCESS_TOKEN }));

      this.setState({ ws: ws });

      that.timeout = 250; // reset timer to 250 on open of websocket connection
      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    // websocket onclose event listener
    ws.onclose = (e) => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );

      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing sockets"
      );

      ws.close();
    };
  };

  /**
   * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
   */
  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState == WebSocket.CLOSED)
      console.log("Websocket is not connected!");
    this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  render() {
    return <RfadSwitch websocket={this.state.ws}></RfadSwitch>;
  }
}
