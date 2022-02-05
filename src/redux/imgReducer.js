import * as actions from "./actionTypes";

const initialState = {
  list: [],
};

const imgReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_IMAGES: {
      Array.from(action.payload.data.getElementsByTagName("photo")).forEach(
        (e) => {
          if (state.list.length === 5) {
            state.list.shift();
          }

          state.list.push({
            id: e.attributes["id"].value,
            serverId: e.attributes["server"].value,
            secretId: e.attributes["secret"].value,
          });
        }
      );
      return {
        ...state,
        list: [...state.list],
      };
    }
    default:
      return state;
  }
};

export default imgReducer;
