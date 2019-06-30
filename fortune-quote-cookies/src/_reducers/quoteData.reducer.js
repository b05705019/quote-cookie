// import { userConstants } from '../_constants';

const defaultState = {
  quote_context: ""
}

export function quote(state=defaultState, action) {

  switch (action.type) {
    case 'GET_QUOTE':
      console.log("GETQUOTE: ", action.quote);
      return {
        quote_searching: true,
        quote_context: action.quote
      }
    default:
      return state
  }
}