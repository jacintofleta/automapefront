import React, { useState, useEffect } from "react";
import AuthContext from "./authContext";

import tokenAuth from "../config/token";
import getCookieValue from "../helpers/getCookieValue";
import clientAxios from "../config/axios";

const AuthState = (props) => {
  let token = "";

  useEffect(() => {
    let token = getCookieValue("token");

    if (token) {
      signinUser(token);
    }
  }, []);

  const [authData, setAuthData] = useState({
    token: token,
    authenticated: false,
    user: "",
  });

  const signinUser = async (token) => {
    document.cookie = `token=${token}; path=/`;
    tokenAuth(token);

    console.log("vamoisss");

    let response = await clientAxios.get("/users/me");
    let user = response.data;

    if (user) {
      setAuthData({
        token: token,
        authenticated: true,
        user: user,
      });
    } else {
      signinoutUser();
    }
  };

  const signoutUser = () => {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    setAuthData({
      token: "",
      authenticated: false,
      user: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: authData.token,
        authenticated: authData.authenticated,
        user: authData.user,
        signinUser,
        signoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
