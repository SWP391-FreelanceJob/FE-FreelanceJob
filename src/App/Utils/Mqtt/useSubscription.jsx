import { useContext, useEffect, useCallback, useState } from "react";

import { matches } from "mqtt-pattern";

import MqttContext from "./MqttContext";

export default function useSubscription(topic, options) {
  const { client, connectionStatus, parserMethod } = useContext(MqttContext);

  const [message, setMessage] = useState(undefined);

  const subscribe = useCallback(async () => {
    client?.subscribe(topic, options);
  }, [client, options, topic]);

  const callback = useCallback(
    (receivedTopic, receivedMessage) => {
      if ([topic].flat().some((rTopic) => matches(rTopic, receivedTopic))) {
        setMessage({
          topic: receivedTopic,
          message:
            parserMethod?.(receivedMessage) || receivedMessage.toString(),
        });
      }
    },
    [parserMethod, topic]
  );

  useEffect(() => {
    if (client?.isConnected) {
      subscribe();

      //   client.on("message", callback);
      client.onMessageArrived = (message) => {
        // console.log("Hey message arrived ", message);
        callback(message.destinationName, message.payloadString);
      };
    }
    return () => {
      //   client?.off("message", callback);
    };
  }, [callback, client, subscribe]);

  return {
    client,
    topic,
    message,
    connectionStatus,
  };
}
