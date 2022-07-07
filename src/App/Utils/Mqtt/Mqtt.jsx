import { Client } from "paho-mqtt";
import { useEffect, useMemo, useRef, useState } from "react";
import MqttContext from "./MqttContext";

export default function MqttConnector({ children, parserMethod }) {
  // Using a ref rather than relying on state because it is synchronous
  const clientValid = useRef(false);
  const [client, setClient] = useState(null);
  const [connectionStatus, setStatus] = useState("Offline");

  const pahoClient = new Client(
    "57fed5bb047e4ddca916fcfd631dfa06.s2.eu.hivemq.cloud",
    8884,
    ""
  );

  useEffect(() => {
    if (!client && !clientValid.current) {
      // This synchronously ensures we won't enter this block again
      // before the client is asynchronously set
      clientValid.current = true;
      setStatus("Connecting");
      
      // connect the client
      console.log(`attempting to connect to hivemq`);
      pahoClient.connect({
        onSuccess: onConnect,
        userName: "fvn-mqtt",
        password: "wT5Ur0rfFNeLgaYqaN",
        useSSL: true,
      });

      pahoClient.onConnectionLost = onConnectionLost;

      // called when the client connects
      function onConnect(){
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        setStatus("Connected");

        setClient(pahoClient);
      };

      // client.onMessageArrived = onMessageArrived;

      // called when the client loses its connection
      function onConnectionLost(responseObject){
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:" + responseObject.errorMessage);
          setStatus("Offline");
        }
      };
    }
  }, [client, clientValid]);

  // Only do this when the component unmounts
  useEffect(
    () => () => {
      if (client) {
        console.log("Closing mqtt client");
        pahoClient.disconnect();
        setClient(null);
        clientValid.current = false;
      }
    },
    [client, clientValid]
  );

  const value = useMemo(
    () => ({
      connectionStatus,
      client,
      parserMethod,
    }),
    [connectionStatus, client, parserMethod]
  );

  return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>;
}

// export { client as mqttClient };
