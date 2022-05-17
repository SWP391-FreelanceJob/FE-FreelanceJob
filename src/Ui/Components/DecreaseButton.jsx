import { Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { decrement } from "@/App/Models/Counter/CounterSlice";

export const DecreaseButton = () => {
  const dispatch = useDispatch()

  return (
    <Button colorScheme="red" onClick={() => dispatch(decrement())}>
      Redux Decrease
    </Button>
  );
};
