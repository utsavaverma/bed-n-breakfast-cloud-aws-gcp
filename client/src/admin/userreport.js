import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

function UserReport() {
  const [userLogin, setUserLogin] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getUserActivity = () => {
    axios
      .get("https://us-central1-serverlesbandb.cloudfunctions.net/currentusers")
      .then(
        (response) => {
          console.log(response);
          setUserLogin(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getRegisteredUsers = () => {
    axios
      .get(
        "https://k6isuvi4x0.execute-api.us-east-1.amazonaws.com/test/userreport"
      )
      .then(
        (response) => {
          console.log(response);
          setAllUsers(response.data.body);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getUserActivity();
    getRegisteredUsers();
  }, []);

  return (
    <div>
      <center>
        <h4>User Activity</h4>
      </center>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Activity</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {userLogin.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.email}</td>
                <td>{val.activity}</td>
                <td>{val.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <center>
        <h4>Registered Users</h4>
      </center>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserReport;
