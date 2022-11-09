import axios from "axios";
import React, { useEffect, useState } from "react";

const Securityquestion = ({ history }) => {
  const [birthplaceanswer, setBirthPlaceAnswer] = useState("");
  const [foodanswer, setFoodAnswer] = useState("");
  const [coloranswer, setColorAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var userid = localStorage.getItem("userid");
    var email = localStorage.getItem("email");
    var error = "";

    axios
      .post(
        "https://k6isuvi4x0.execute-api.us-east-1.amazonaws.com/test/checksecurityanswer",
        {
          userid,
          email,
          birthplaceanswer,
          foodanswer,
          coloranswer,
        }
      )
      .then(
        (response) => {
          error = response?.data?.message;
          console.log(error);
          setError(error);
          if (!response?.data?.message) {
            error = "";
            setError("");
            history.push("/cipher");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <center>
            <h1>Security Questions</h1>
            <form onSubmit={handleSubmit}>
              <label>
                What is your birth place:
                <input
                  type="text"
                  className="form-control mb-3"
                  value={birthplaceanswer}
                  name="birthplaceanswer"
                  onChange={(event) => setBirthPlaceAnswer(event.target.value)}
                />
              </label>
              <br />

              <label>
                What is your favorite food:
                <input
                  type="text"
                  className="form-control mb-3"
                  value={foodanswer}
                  name="foodanswer"
                  onChange={(event) => setFoodAnswer(event.target.value)}
                />
              </label>
              <br />

              <label>
                What is your favorite color:
                <input
                  type="text"
                  className="form-control mb-3"
                  value={coloranswer}
                  name="coloranswer"
                  onChange={(event) => setColorAnswer(event.target.value)}
                />
              </label>
              {error && <p>{error}</p>}
              <br />

              <input type="submit" value="Submit" />
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Securityquestion;
