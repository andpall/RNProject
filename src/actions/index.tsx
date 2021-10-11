import * as types from '../constants/actionTypes'

export function signIn() {
    return {
        type: types.LOGIN,
    };
}

export function signOut() {
    return {
        type: types.LOGOUT,
    };
}

