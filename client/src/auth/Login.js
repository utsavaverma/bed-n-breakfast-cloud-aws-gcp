import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";

import { useDispatch } from "react-redux";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  

  var poolData = {
    UserPoolId: "us-east-1_rIytU64lO",
    ClientId: "6qbs04aqbt3htai8l8pikfbivl",
  };

  const userPool = new CognitoUserPool(poolData);

  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState();
  const [password, setPassword] = useState("");

  const validatEmail = (value) => {
    const regexforemail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexforemail.test(value)) {
      setEmail(value);
      setEmailerror(null);
    } else {
      setEmail(value);
      setEmailerror("Enter valid Email Address");
    }
  };

  const handleSubmit = (event) => {
    if (emailerror) {
      return;
    } else {
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      event.preventDefault();

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log(result.idToken.payload);
          console.log(result);
          var response = result.idToken.payload;
          var userid = response["custom:userid"];
          var cognitousername = response["cognito:username"];

          console.log("userid: " + userid);
          console.log("token: " + result.getIdToken().getJwtToken());
          console.log("cognitousername: " + cognitousername);

          localStorage.setItem("jwttoken", result.getIdToken().getJwtToken());
          localStorage.setItem("email", result.idToken.payload.email);
          localStorage.setItem("userid", userid);
          localStorage.setItem("cognitousername", cognitousername);

          console.log("LoggedIn");
          dispatch({
            type: "LOGGED_IN_USER",
            payload: result,
          });
          //toast.success("Logged In");
          history.push("/securityquestion");
        },
        onFailure: function (err) {
          toast.error("Login failed");
          console.log(err.message);
        },
      });
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => validatEmail(event.target.value)}
                />
              </div>
              {emailerror && <p>{emailerror}</p>}
              <br />

              <div className="form-group mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <br />

              <button
                disabled={!email || !password}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
