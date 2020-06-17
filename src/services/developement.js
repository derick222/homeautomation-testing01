import React, { useState, Component } from "react";

import { StyleSheet, Switch, View, Button } from "react-native";

import { SERVER_URL, ACCESS_TOKEN } from "../utils/config";

export default class development extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      connected: false,
    };
    this.socket = new WebSocket(SERVER_URL);

    this.socket.onopen = () => {
      this.setState({ connected: true });
      this.socket.send(
        JSON.stringify({ type: "auth", access_token: ACCESS_TOKEN })
      );
    };
    this.emit = this.emit.bind(this);
    console.log(this.emit);
  }

  subscribe = (condition) => {
    this.socket.send(
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
  };

  emit() {
    if (this.state.connected) {
      if (this.state.open === true) {
        console.log("turn_off -" + this.state.open);
        this.subscribe("turn_off");
      }

      if (this.state.open === false) {
        console.log("turn_on -" + this.state.open);
        this.subscribe("turn_on");
      }

      this.toggleSwitch = this.setState((prevState) => ({
        open: !prevState.open,
      }));
    }
  }

  render() {
    const LED = {
      backgroundColor: this.state.open ? "lightgreen" : "red",
      height: 30,
      position: "absolute",
      flexDirection: "row",
      bottom: 0,
      width: 100,
      height: 100,
      top: 120,
      borderRadius: 40,
      justifyContent: "space-between",
    };

    return (
      <View style={styles.container}>
        <Button
          onPress={this.emit}
          title={this.state.open ? "Turn off" : "Turn on"}
          color="#21ba45"
          accessibilityLabel="Learn more about this purple buttonsssssssss"
        />
        <View style={LED}></View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.open ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={this.state.open}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});
