import * as actions from "./actionTypes";

const initialState = {
  list: [],
  droppedImgList: [],
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
            category: null,
          });
        }
      );
      return {
        ...state,
        list: [...state.list],
      };
    }
    case actions.DROP_IMAGES: {
      let list = [...state.list];
      const isDroppingImgExists = (img) => img.id != action.payload.imgId;
      const droppingList = list.filter(isDroppingImgExists);

      return {
        ...state,
        list: [...droppingList],
      };
    }
    case actions.FETCH_DROP_IMAGES: {
      const droppedImgList = action.payload.droppedImgList;
      return {
        ...state,
        droppedImgList: [...droppedImgList],
      };
    }
    case actions.SUBMIT_FORM: {
      return {
        ...state,
        droppedImgList: [],
      };
    }
    case actions.CLICKED_TARGET: {
      return {
        ...state,
        target: action.payload.target,
      };
    }
    default:
      return state;
  }
};

export default imgReducer;
