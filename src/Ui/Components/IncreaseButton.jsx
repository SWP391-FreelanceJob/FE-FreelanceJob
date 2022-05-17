import { Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { increment } from "@/App/Models/Counter/CounterSlice";

export const IncreaseButton = () => {
  const dispatch = useDispatch()

  return (
    <Button colorScheme="blue" onClick={() => dispatch(increment())}>
      Redux Increase
    </Button>
  );
};
