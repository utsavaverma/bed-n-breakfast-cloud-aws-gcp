import React from "react";
import axios from "axios";
import { useState } from "react";

function SuggestmeTour() {
  const [stayDuration, setstayDuration] = useState("");
  //const [submitinit, setSubmitStatus] = useState(false);
  const [tourpackage, setpackage] = useState("");
  const onSubmit = (event) => {
    const predictObj = { stay_duration: stayDuration };
    event.preventDefault();
    axios
      .post(
        "https://us-central1-csci-5410-serverless-355802.cloudfunctions.net/toursuggest",
        predictObj
      )
      .then((result) => {
        setpackage(result.data);
        console.log(result.data);
      })

      .catch((err) => {
        console.error(err);
      });
    // setSubmitStatus(true);
  };
  return (
    <>
    
          <div className="container-fluid bg-secondary p-5 text-center">
            <h1>Choose your best tour package!</h1>
          </div>
          <div style={{ marginTop: "100px", marginLeft: "500px" }}>
            <form onSubmit={onSubmit}>
              <span className="formtext"></span>
              <input
                type="text"
                onChange={(e) => {
                  setstayDuration(e.target.value);
                }}
                value={stayDuration}
                placeholder="Enter number of days for your stay"
                style={{ width: "370px", height: "100px" }}
                required
                name="stay"
              />{" "}
              <br />
              <button
                style={{
                  marginTop: "20px",
                  marginLeft: "140px",
                  color: "green",
                }}
              >
                submit!
              </button>
            </form>
          </div>
     
        <div><h4 style={{marginLeft:"500px",marginTop:"50px"}}>Suitable package: {tourpackage}</h4></div>
      
    </>
  );
}
export default SuggestmeTour;
