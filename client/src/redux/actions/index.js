import * as R from "ramda";

export const login = () => {
  return { type: "SIGN_IN" };
};

export const newData = data => {
  return { type: "NEW_DATA", payload: data };
};

export const sort = (data, key) => {
  return { type: "SORT", payload: R.sortBy(R.prop(key), data) };
};

export const filter = (data, key, value) => {
  return {
    type: "FILTER",
    payload: R.filter(device => {
      return device[key] === value;
    }, data)
  };
};

export const reset = data => {
  return {
    type: "RESET",
    payload: data
  };
};
