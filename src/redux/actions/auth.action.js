import {
  CREATE_USER_ACCOUNT,
  GET_USER_ACCOUNT,
} from '../constants';

export function createUserAccount(params) {
  return {
    type: CREATE_USER_ACCOUNT,
    payload: params,
  }
}

export function getUserAccount(params) {
  return {
    type: GET_USER_ACCOUNT,
    payload: params,
  }
}


