import { MEMBER_UPDATED } from "./actions";

function memberReducer(state = null, action) {
  console.log(action, state);
  switch (action.type) {
    case MEMBER_UPDATED:
      return action.member;
    default:
      return state;
  }
}

export const REDUCERS = {
  member: memberReducer
};
