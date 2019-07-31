export const dataReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_DATA":
      return action.payload;
    default:
      return state;
  }
};
