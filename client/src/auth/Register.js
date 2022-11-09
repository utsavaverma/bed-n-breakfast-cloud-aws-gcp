import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../actions/auth";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const shortUUID = require("short-uuid");
var poolData = {
  UserPoolId: "us-east-1_rIytU64lO",
  ClientId: "6qbs04aqbt3htai8l8pikfbivl",
};

const userPool = new CognitoUserPool(poolData);

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [emailerror, setEmailerror] = useState();
  const [name, setName] = useState("");
  const [ferror, setFerror] = useState();
  const [password, setPassword] = useState("");
  const [passworderror, setPassworderror] = useState();
  const [birthplaceanswer, setBirthPlaceAnswer] = useState("");
  const [birthplaceanswererror, setBirthPlaceAnswererror] = useState();
  const [foodanswer, setFoodAnswer] = useState("");
  const [foodanswererror, setFoodAnswererror] = useState();
  const [coloranswer, setColorAnswer] = useState("");
  const [coloranswererror, setColorAnswererror] = useState();
  const [key, setKey] = useState("");
  const [keyerror, setKeyerror] = useState();

  const validateName = (value) => {
    const regexforname = /^[A-Za-z ]+$/;
    if (regexforname.test(value)) {
      setName(value);
      setFerror(null);
    } else {
      setName(value);
      setFerror("Enter only letters");
    }
  };

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

  const validatPassword = (value) => {
    const regexforpassword = /^[a-zA-Z0-9!@#$%^&*]{8,25}$/;
    if (regexforpassword.test(value)) {
      setPassword(value);
      setPassworderror(null);
    } else {
      setPassword(value);
      setPassworderror(
        "Password must have minimum 8 letter and one special character"
      );
    }
  };

  const validateBirthPlaceAnswer = (value) => {
    const regexforname = /^[A-Za-z ]+$/;
    if (regexforname.test(value)) {
      setBirthPlaceAnswer(value);
      setBirthPlaceAnswererror(null);
    } else {
      setBirthPlaceAnswer(value);
      setBirthPlaceAnswererror("Enter only letters");
    }
  };

  const validateFoodAnswer = (value) => {
    const regexforname = /^[A-Za-z ]+$/;
    if (regexforname.test(value)) {
      setFoodAnswer(value);
      setFoodAnswererror(null);
    } else {
      setFoodAnswer(value);
      setFoodAnswererror("Enter only letters");
    }
  };

  const validateColorAnswer = (value) => {
    const regexforname = /^[A-Za-z ]+$/;
    if (regexforname.test(value)) {
      setColorAnswer(value);
      setColorAnswererror(null);
    } else {
      setColorAnswer(value);
      setColorAnswererror("Enter only letters");
    }
  };

  const validateKey = (value) => {
    const regexforkey = /^([1-9])$/;
    if (regexforkey.test(value)) {
      setKey(value);
      setKeyerror(null);
    } else {
      setKey(value);
      setKeyerror("Enter number between 1 to 9");
    }
  };

  const handleSubmit = (event) => {
    if (
      emailerror ||
      ferror ||
      passworderror ||
      birthplaceanswererror ||
      foodanswererror ||
      coloranswererror
    ) {
      return;
    } else {
      event.preventDefault();

      var userid = shortUUID.generate();
      console.log(userid);

      const attributeList = [
        new CognitoUserAttribute({
          Name: "email",
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: "name",
          Value: name,
        }),
        new CognitoUserAttribute({
          Name: "custom:userid",
          Value: userid.toString(),
        }),
      ];

      userPool.signUp(
        email,
        password,
        attributeList,
        null,
        function (err, result) {
          if (err) {
            alert(err.message || JSON.stringify(err));
            return;
          }
          var cognitoUser = result.user;

          axios
            .post(
              "https://k6isuvi4x0.execute-api.us-east-1.amazonaws.com/test/register",
              {
                userid,
                email,
                birthplaceanswer,
                foodanswer,
                coloranswer,
              }
            )
            .then(() => {
              console.log("user name is " + cognitoUser.getUsername());
            });

          axios
            .post(
              "https://us-central1-serverlesbandb.cloudfunctions.net/ceaserkeyregister",
              {
                email,
                key,
              }
            )
            .then(() => {
              console.log("key is " + key);
            });
          toast.success("Registration successful");
          history.push("/login");

          console.log("user name is " + cognitoUser.getUsername());
        }
      );
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Register</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group mb-3">
                <label className="form-label">Your name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={name}
                  onChange={(event) => validateName(event.target.value)}
                />
              </div>
              {ferror && <p>{ferror}</p>}
              <br />
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
                  onChange={(event) => validatPassword(event.target.value)}
                />
              </div>
              {passworderror && <p>{passworderror}</p>}
              <br />
              <div className="form-group mb-3">
                <label className="form-label">What is your birth place:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={birthplaceanswer}
                  onChange={(event) =>
                    validateBirthPlaceAnswer(event.target.value)
                  }
                />
              </div>
              {birthplaceanswererror && <p>{birthplaceanswererror}</p>}
              <div className="form-group mb-3">
                <label className="form-label">
                  What is your favorite food:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={foodanswer}
                  onChange={(event) => validateFoodAnswer(event.target.value)}
                />
              </div>
              {foodanswererror && <p>{foodanswererror}</p>}
              <div className="form-group mb-3">
                <label className="form-label">
                  {" "}
                  What is your favorite color:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={coloranswer}
                  onChange={(event) => validateColorAnswer(event.target.value)}
                />
              </div>
              {coloranswererror && <p>{coloranswererror}</p>}
              <div className="form-group mb-3">
                <label className="form-label"> Enter your cipher key:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter key"
                  value={key}
                  onChange={(event) => validateKey(event.target.value)}
                />
              </div>
              {keyerror && <p>{keyerror}</p>}

              <br />
              <button
                disabled={!name || !email || !password}
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

export default Register;
