import { AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_PROFILE_USER } from './types';
import { redirectToSignIn, signUserOut as signUserOutService } from 'blockstack'

import axios from 'axios';

export function signUserInAction() {
  return { type: AUTH_SIGN_IN }
}

export function signUserIn(store) {
  return async (dispatch, getState) => {
    try {
      redirectToSignIn(
        `${window.location}`,
        `${window.location.origin}/manifest.json`,
        ['store_write', 'publish_data']
      )
      signUserInAction()
    } catch (e) {
      console.error(e)
    }
  }
}

export function signUserOut() {
  try {
    signUserOutService()
    return { type: AUTH_SIGN_OUT }
  } catch (e) {
    console.error(e)
  }
}

export const profileUser = (id) => async dispatch => {
  //const respuesta = await axios.get(`https://core.blockstack.org/v1/users/${id}`);
  const respuesta = await axios.get(`https://core.blockstack.org/v1/users/jfontirroig.id.blockstack`);
     dispatch({
          type: AUTH_PROFILE_USER,
          payload: respuesta.profile
     })
}
