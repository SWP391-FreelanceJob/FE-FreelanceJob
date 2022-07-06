import * as mqtt from "mqtt/dist/mqtt.min";
import { Client } from "paho-mqtt";

// const options = {
//   clientId: "je12ej2jeddw",
//   username: "ubuntu",
//   password: "wT5Ur0rfFNeLgaYqaN",
//   clean: true,
//   reconnectPeriod: 1000,
//   connectTimeout: 30 * 1000,
// };
// const mqttClient = mqtt.connect(
//   "ws://ec2-18-142-183-246.ap-southeast-1.compute.amazonaws.com:9019",
//   options
// );

// mqttClient.on("connect", function () {
//   console.log("client connected:");
//   mqttClient.subscribe("test", { qos: 2, retain: false });
// });

const client = new Client(
  "57fed5bb047e4ddca916fcfd631dfa06.s2.eu.hivemq.cloud",
  8884,
  ""
);

client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({
  onSuccess: onConnect,
  userName: "fvn-mqtt",
  password: "wT5Ur0rfFNeLgaYqaN",
  useSSL: true,
});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("test");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// const subscribeForMessage = (accountId) => {
//   client.subscribe("msg/" + accountId);
// };

// called when a message arrives

export { client as mqttClient };
