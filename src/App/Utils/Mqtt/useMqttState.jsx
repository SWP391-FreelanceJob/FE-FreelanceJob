import { useContext } from "react";

import MqttContext from "./MqttContext";

export default function useMqttState() {
  const { connectionStatus, client, parserMethod } = useContext(MqttContext);

  return {
    connectionStatus,
    client,
    parserMethod,
  };
}
