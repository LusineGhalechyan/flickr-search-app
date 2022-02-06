import axios from "axios";
import * as actions from "./actionTypes";
import { baseURL } from "../constants/baseURL";
import { apiKey, photosMethod } from "../constants/apiDetails";

export const getImages = (data) => ({
  type: actions.FETCH_IMAGES,
  payload: {
    data,
  },
});

export const fetchImages = (search) => async (dispatch) => {
  try {
    const result = await axios.get(
      `${baseURL}method=${photosMethod}&tags=${search.replace(
        " ",
        ","
      )}&api_key=${apiKey}&per_page=5&page=1`
    );

    var parser = new DOMParser();
    var doc = parser.parseFromString(result.data.toString(), "text/xml");
    dispatch(getImages(doc));
  } catch (e) {
    console.log(`error`, e);
  }
};

export const dropImages = (imgId) => async (dispatch) => {
  console.log(`DISPATCH_IMG_ID`, imgId);
  dispatch({ type: actions.DROP_IMAGES, payload: { imgId } });
};
