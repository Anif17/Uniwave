export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth, email } = JSON.parse(localStorage.getItem('user-token')) || {};

  return { name, profilePhoto, userID, isAuth, email };
};
