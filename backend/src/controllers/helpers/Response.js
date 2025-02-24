// buildUser.mjs or any other .mjs file
const buildUser = (userObj) => {
    const { __v, password, refreshToken, ...data } = userObj;
    return data;
  };
  
  export default buildUser;
  