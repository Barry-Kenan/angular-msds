import { AuthActions, authActionsType } from "../actions/auth.actions";

export const authNode = 'auth'


export interface AuthState {
    userName: string;
    password: string;
    remember: boolean
}

const initialState: AuthState = {
    userName: '',
    password: '',
    remember: false
}

export const authReducer = (state = initialState, action : AuthActions ) => {
    switch(action.type){
        case authActionsType.set:
            return {
                ...state, ...action.payload
            }
        default: 
            return state;
    }
    
} 