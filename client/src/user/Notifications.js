import axios from "axios";
import React, { useEffect, useState } from "react";

const Notifications = (props) => {
  const [notifications, setNotifications] = useState([]);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    console.log("userid", userid);
    axios
      .post(
        `https://us-central1-serverlesbandb.cloudfunctions.net/getNotificationsById`,
        { userid: userid }
      )
      .then((response) => {
        console.log(response.data);
        setNotifications(response.data.notification);
      });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => {
        return (
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-md-15">{notification}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
