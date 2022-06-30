import { Action } from "@ngrx/store";

export enum authActionsType {
    set = '[AUTH] set'
}

export class AuthSetAction implements Action {
    readonly type = authActionsType.set
    constructor(public payload: {
        userName: string
        password: string
        remember: boolean
    }){}
}

export type AuthActions = AuthSetAction