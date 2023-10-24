import { IIngregient } from "../../types/types";

// export const INCREMENT = "INCREMENT";
// export const DECREMENT = "DECREMENT";
// export const RESET = "RESET";

import { DECREMENT, INCREMENT, RESET } from "../constants";


export interface IIncrementPrice {
  readonly type: typeof INCREMENT;
  payload: IIngregient;
}

export interface IDecrementPrice {
  readonly type: typeof DECREMENT;
  payload: IIngregient;
}

export interface IResetPrice {
  readonly type: typeof RESET;
}

export type TPriceStateActions =
| IIncrementPrice
| IDecrementPrice
| IResetPrice;