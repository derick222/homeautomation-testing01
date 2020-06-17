import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class RfadSwitch extends Component {
  // Subscribe to the service
  subscribe = (condition) => {
    const { websocket } = this.props; // websocket instance passed as props to the child component.

    websocket.send(
      JSON.stringify({
        id: 24,
        type: "call_service",
        domain: "switch",
        service: condition,
        // Optional
        service_data: {
          entity_id: "switch.sonoff_1000bc07a8",
        },
      })
    );
    console.log({ websocket });
  };

  turn_on = () => {
    this.subscribe("turn_on");
  };

  turn_off = () => {
    this.subscribe("turn_off");
  };

  //   sendMessage = (status) => {
  //     try {
  //       //   websocket.send(data); //send data to the server
  //       console.log(status);
  //       this.subscribe("turn_off");
  //     } catch (error) {sssss
  //       console.log(error); // catch error
  //     }
  //   };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Turn ON" onPress={this.turn_on} />
        <Button title="Turn OFF" onPress={this.turn_off} />
      </View>
    );
  }
}
