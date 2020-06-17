import React, { useState } from "react";
import { Text, View } from "react-native";

import WebSocket from "home-assistant-js-websocket/dist/socket";

import { SERVER_URL, ACCESS_TOKEN } from "../utils/config";

const WebsocketConnection = () => {
  const [isAuthOK, setIsAuthOK] = useState(false);
  const [isAlive, setIsAlive] = useState(false);
  const [rick, setIsRick] = useState("Rick Espina");

  var ws = new WebSocket(SERVER_URL);
  WebSocket.onopen();

  // Opening Connection
  ws.onopen = () => {
    // Connection status
    setIsAlive(true);

    // Sending Authentication token
    if (ACCESS_TOKEN)
      ws.send(JSON.stringify({ type: "auth", access_token: ACCESS_TOKEN }));
  };

  // Authentication
  ws.onmessage = (e) => {
    let data_received = JSON.parse(e.data);

    switch (data_received.type) {
      case "auth_required":
        //   console.log("1-" + data_received.type);
        setIsAuthOK(false);
        ws.onopen();
        break;
      case "auth_invalide":
        //   console.log("2-" + data_received.type);
        setIsAuthOK(false);
        ws.onopen();
        break;
      case "auth_ok":
        //   console.log("3-" + data_received.type);
        setIsAuthOK(true);
        break;
      default:
        break;
    }
  };

  // Errors
  ws.onerror = (e) => {
    // Try to look deeper to the error msg, if cannot be fix then close the connection now.
    // console.log(e.message);

    // Closing current connection
    ws.close();
  };

  // If closed, Try to reconnect again
  ws.onclose = (e) => {
    // Try to look deeper to the error and reason msg, if cannot be fix then close current connection
    //  and Open new connection now.
    console.log(e.code, e.reason);

    // Opening new connection now
    ws.onopen();
  };

  //   check = () => {
  //     const { ws } = ws;
  //     if (!ws || ws.readyState == WebSocket.CLOSED)
  //       console.log("Websocket is not connected!");
  //     this.connect(); //check if websocket instance is closed, if so call `connect` function.
  //   };

  return (
    <View>
      <Text>{rick}</Text>
    </View>
  );
};

export default WebsocketConnection;
