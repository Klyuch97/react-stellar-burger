import { Action, ActionCreator } from "redux";
import { store } from "../index"
import { TAuthUserActions } from "../services/actions/autnUser";
import { TBurgerStateActions } from "../services/actions/burgerState";
import { TPriceStateActions } from "../services/actions/price";
import { ThunkAction } from "redux-thunk";
import { rootReducer } from "../services/reducers";
import { TWsActions } from "../services/actions/web-socket";



export type TApplicationActions =
  | TBurgerStateActions
  | TAuthUserActions
  | TPriceStateActions
  | TWsActions;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

