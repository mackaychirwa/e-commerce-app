export const userToken = (user) => {
    return {
      fullName: user.username,
      userId: user.id,
      role_id: user.role_id,
      email: user.email,
    };
  };
