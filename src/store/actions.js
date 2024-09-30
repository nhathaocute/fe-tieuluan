export const loginUser = (user) => {
  return {
    type: "user/loginUser",
    payload: user,
  };
};
export const logoutUser = () => {
  return {
    type: "user/logoutUser",
  };
};
