import { IIngregient } from "../../types/types";
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