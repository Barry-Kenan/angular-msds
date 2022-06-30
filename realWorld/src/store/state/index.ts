import {  ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { authNode, authReducer, AuthState } from "../reducers/auth.reducer";
import { countNode, countReducer, CountState } from "../reducers/count.reducer";

export interface State {
    [countNode]: CountState;
    [authNode]: AuthState;
};

export const reducers: ActionReducerMap<State> = {
    // @ts-ignore
    [countNode] : countReducer,
    // @ts-ignore
    [authNode]: authReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production? [] : [];