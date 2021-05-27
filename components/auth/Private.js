import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/authContext";
import tokenAuth from "../../config/token";
import getCookieValue from "../../helpers/getCookieValue";

import Loading from "../layout/Loading";

const Private = (Component) => {
  const Auth = (props) => {
    const authContext = useContext(AuthContext);
    const { authenticated, signinUser } = authContext;

    useEffect(() => {
      let token = getCookieValue("token");

      tokenAuth(token);

      signinUser(token);
    }, []);

    // If user is not logged in, return null
    if (!authenticated) {
      return <Loading />;
    } else {
      return (
        <>
          <Component {...props} />
        </>
      );
    }
  };

  return Auth;
};

export default Private;
