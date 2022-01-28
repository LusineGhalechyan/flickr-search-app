const _baseURL = Symbol();

class BaseURL {
  [_baseURL] = () => {
    return `https://www.flickr.com/services/rest/?`;
  };
}

const api = new BaseURL();
export const baseURL = api[_baseURL]();
