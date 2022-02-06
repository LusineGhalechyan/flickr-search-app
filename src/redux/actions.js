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

export const fetchImages = (searchValue) => async (dispatch) => {
  try {
    const result = await axios.get(
      `${baseURL}method=${photosMethod}&tags=${searchValue.replace(
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
  dispatch({ type: actions.DROP_IMAGES, payload: { imgId } });
};

export const fetchDropImages = (droppedImgList) => async (dispatch) => {
  dispatch({ type: actions.FETCH_DROP_IMAGES, payload: { droppedImgList } });
};

export const formSubmitted = (isFormSubmitted) => async (dispatch) => {
  dispatch({ type: actions.SUBMIT_FORM, payload: { isFormSubmitted } });
};

export const clickedTarget = (target) => async (dispatch) => {
  dispatch({ type: actions.CLICKED_TARGET, payload: { target } });
};
