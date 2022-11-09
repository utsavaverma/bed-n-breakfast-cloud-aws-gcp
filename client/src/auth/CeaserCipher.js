import axios from "axios";
import React, { useEffect, useState } from "react";
import { generateEncryptedCipher, decryptCipher } from "./CipherBackend";

const cipherText = generateEncryptedCipher(); 

const CeaserCipher = ({ history }) => {
  const [decryptedAnswer, setDecryptedanswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var userid = localStorage.getItem("userid");
    var email = localStorage.getItem("email");
    var ciphertext = cipherText
    var error = "";

    axios
      .post(
        "https://us-central1-serverlesbandb.cloudfunctions.net/ceaser",
        {
          email,
          ciphertext,
          decryptedAnswer
        }
      )
      .then(
        (response) => {
            console.log(response)
            if (response?.data === "success"){
                setError("");
                history.push("/");
                console.log("Login success!");
            } else {
                setError("you have entered incorrect decrption!");
                console.log("Login failed!");
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
            <h1>Ceaser Cipher</h1>

            <p>Decrypt Ceaser Cipher: {cipherText}</p>

            <form onSubmit={handleSubmit}>
              <label>
                Please enter decrypted answer with your key:
                <input
                  type="text"
                  className="form-control mb-3"
                  value={decryptedAnswer}
                  name="decryptedAnswer"
                  onChange={(event) => setDecryptedanswer(event.target.value)}
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

export default CeaserCipher;
