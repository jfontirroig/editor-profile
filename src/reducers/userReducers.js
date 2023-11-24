import { User } from 'radiks';
import { LOGIN, USER_SIGNED_IN, USER_LOGOUT } from '../actions/types';

const currentUser = User ? User.currentUser() : null;
const initialState = {
  currentUser,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
      };
    }
    case USER_SIGNED_IN: {
      return {
        ...state,
        currentUser: action.user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        currentUser: null,
      };
    }
    default:
      return state;
  }
};
