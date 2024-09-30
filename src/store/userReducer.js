const initState = {
  isLogin: false,
  user: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "user/loginUser":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "user/logoutUser":
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      return state;
  }
};
export default userReducer;
