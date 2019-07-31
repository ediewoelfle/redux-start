export const devicesReducer = (state = [], action) => {
  switch (action.type) {
    case "SORT":
      return action.payload;
    case "FILTER":
      return action.payload;
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};
