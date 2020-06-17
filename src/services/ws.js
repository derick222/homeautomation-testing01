import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Switch, Button, Text } from "react-native";

import { SERVER_URL, ACCESS_TOKEN } from "../utils/config";

export default function WS() {
  const [isAuthOK, setIsAuthOK] = useState(false);
  const [isConnected, setConnected] = useState(false);
  //   const [isEnabled, setIsEnabled] = useState(false);
  //   const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [isTurnedON, setIsTurnedON] = useState(false);

  const Connect = (service) => {
    var ws = new WebSocket(SERVER_URL);

    ws.onopen = () => {
      // Connection status
      setConnected(true);

      // Sending Authentication token
      if (ACCESS_TOKEN)
        ws.send(JSON.stringify({ type: "auth", access_token: ACCESS_TOKEN }));
    };

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
          SendMsg(service);
          break;
        default:
          break;
      }
    };

    const SendMsg = (service) => {
      ws.send(
        JSON.stringify({
          id: 24,
          type: "call_service",
          domain: "switch",
          service: service,
          // Optional
          service_data: {
            entity_id: "switch.sonoff_1000bc07a8",
          },
        })
      );
      if (service === "turn_on") {
        setIsTurnedON(true);
      }
      if (service === "turn_off") {
        setIsTurnedON(false);
      }
    };

    ws.onerror = (e) => {
      // an error occurred, close connection
      // befor closing connection, try to determine if error need to close connection
      ws.close();
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed, try to open connection again
      ws.onopen();
      console.log(e.code, e.reason);
    };
  };

  // isEnabled == turn_on, turn_off
  //   const TurnOnOffHandler = (service) => {
  //     var ws = new WebSocket(SERVER_URL);
  //     ws.send(
  //       JSON.stringify({
  //         id: 24,
  //         type: "call_service",
  //         domain: "switch",
  //         service: service,
  //         // Optional
  //         service_data: {
  //           entity_id: "switch.sonoff_1000bc07a8",
  //         },
  //       })
  //     );
  //     if (service === "turn_on") {
  //       setIsTurnedON(true);
  //     }
  //     if (service === "turn_off") {
  //       setIsTurnedON(false);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isTurnedON ? "#f4f3f4" : "#f5dd4b"}
        ios_backgroundColor="#3e3e3e"
        // onValueChange={Connect("turn_off")}
        value={isTurnedON}
      />
      {/* <Button
        onPress={TurnOn}
        title="ON"
        color="#841584"
        accessibilityLabel="Switch turn ON"
      />
      <Button
        onPress={TurnOff}
        title="OFF"
        color="#841584"
        accessibilityLabel="Switch turn OFF"
      /> */}
      <Text>{isConnected ? "Connected" : "Connecting..."}</Text>
      <Text>{isAuthOK ? "Auth OK" : "Auth required"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
