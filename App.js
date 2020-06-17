import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import WS from "./src/services/ws";
// import WebsocketConnection from "./src/services/socket";
// import CustomSocket from "./src/services/customSocket";
import Development from "./src/services/developement";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Development />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
