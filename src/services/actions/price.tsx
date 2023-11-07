import { Ingregient } from "../../types/types";
import { DECREMENT, INCREMENT, RESET } from "../constants";


export type IncrementPrice = {
  readonly type: typeof INCREMENT;
  payload: Ingregient;
}

export type DecrementPrice = {
  readonly type: typeof DECREMENT;
  payload: Ingregient;
}

export type ResetPrice = {
  readonly type: typeof RESET;
}

export type TPriceStateActions =
  | IncrementPrice
  | DecrementPrice
  | ResetPrice;