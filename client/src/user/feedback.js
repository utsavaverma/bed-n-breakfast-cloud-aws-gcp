import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feedback() {
  const [feedback, setfeedback] = useState("");
  const notify = () => toast("Feedback added successuly!");

  const onSubmit = (event) => {
    const feedbackobj = { feedback_desc: feedback ,userid:localStorage.getItem("userid")};
    event.preventDefault();
    axios
      .post(
        "https://us-central1-serverlesbandb.cloudfunctions.net/feedbacksentimentanalyzer",
        feedbackobj
      )
      .then((result) => {
        console.log(result.data);
      })
      
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Your Feedback</h1>
      </div>
      <div style={{marginTop:"100px",marginLeft:"500px"}}>
      <form onSubmit={onSubmit}>
        <span className="formtext"></span>
        <input
          type="text"
          onChange={(e) => {
            setfeedback(e.target.value);
          }}
          value={feedback}
          placeholder="Enter your feedback here"
          style={{width: "370px",height:"100px"}}
          required
          name="feedback"
        /> <br/>
        <button  onClick={notify} style={{marginTop:"20px",marginLeft:"140px",color:"green"}}>submit!</button>
      </form></div>
      
      
      
    </>
  );
}

export default Feedback;
