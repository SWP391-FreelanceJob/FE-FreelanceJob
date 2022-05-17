import { useState } from "react";
import { Badge, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import "./App.css";
import { DecreaseButton } from "@/Ui/Components/DecreaseButton";
import { IncreaseButton } from "@/Ui/Components/IncreaseButton";
import { getTodos } from "@/Api/Service/TodoService";

function App() {
  const [count, setCount] = useState(0);
  const reduxCount = useSelector((state) => state.counter.value);

  return (
    <div className="App">
      <div className="local-state">
        <Button colorScheme="red" onClick={() => setCount(count - 1)}>
          Local Decrease
        </Button>
        <Badge>Hi this is the local state counting: {count}</Badge>
        <Button colorScheme="blue" onClick={() => setCount(count + 1)}>
          Local Increase
        </Button>
      </div>
      <div className="redux-state">
        <DecreaseButton />
        <Badge>Hi this is the redux state counting: {reduxCount}</Badge>
        <IncreaseButton />
      </div>
      <div className="todo">
        <Button
          colorScheme="yellow"
          onClick={() => getTodos().then((res) => console.log(res))}
        >
          Get Todo
        </Button>
      </div>
    </div>
  );
}

export default App;
