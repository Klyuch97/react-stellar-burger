import { Action, ActionCreator } from "redux";
import { store } from "../index"
import { TAuthUserActions } from "../services/actions/autnUser";
import { TBurgerStateActions } from "../services/actions/burgerState";
import { TPriceStateActions } from "../services/actions/price";
import { ThunkAction } from "redux-thunk";
import { rootReducer } from "../services/reducers";



type TApplicationActions =
    | TBurgerStateActions
    | TAuthUserActions
    | TPriceStateActions;





export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;


