import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

var poolData = {
  UserPoolId: "us-east-1_rIytU64lO",
  ClientId: "6qbs04aqbt3htai8l8pikfbivl",
};
const userPool = new CognitoUserPool(poolData);

const TopNav = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    var email = localStorage.getItem("email");

    axios
      .post(
        "https://us-central1-serverlesbandb.cloudfunctions.net/userlogoutactivity",
        {
          email,
        }
      )
      .then(() => {
        console.log("Logged Out ");

        const currentCognitoUser = userPool.getCurrentUser();
        if (currentCognitoUser !== null) {
          currentCognitoUser.signOut();
        }

        window.localStorage.removeItem("jwttoken");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("userid");
        window.localStorage.removeItem("cognitousername");
      });

    history.push("/login");
  };

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/menu">
        Food Menu
      </Link>
      <Link className="nav-link" to="/tours">
        Tour Packages
      </Link>
      {auth !== null && (
        <Link className="nav-link" params={{ auth: auth }} to="/feedback">
          Feedback
        </Link>
      )}
      {auth !== null && (
        <Link className="nav-link" params={{ auth: auth }} to="/notifications">
          Notifications
        </Link>
      )}
      {auth !== null && (
        <Link className="nav-link" params={{ auth: auth }} to="/visualization">
          Visualization
        </Link>
      )}
      {auth !== null && (
        <Link className="nav-link" to="/admin/userreport">
          User Report
        </Link>
      )}
      {auth !== null && (
        <a className="nav-link pointer" href="#" onClick={logout}>
          Logout
        </a>
      )}

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
