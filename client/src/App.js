import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

import ViewHotel from "./hotels/ViewHotel";

import Menu from "./booking/Menu";
import Tour from "./booking/Tour";
import Securityquestion from "./auth/Securityquestion";
import Graph from "./Analytics/Graph";
import Notifications from "./user/Notifications";
import CeaserCipher from "./auth/CeaserCipher";
import Feedback from "./user/feedback";
import { useDispatch } from "react-redux";
import Visualizations from "./auth/Visualization";
import UserReport from "./admin/userreport";
import SuggestmeTour from "./user/suggestmeTour";

function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("userid") !== null) {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: localStorage.getItem("userid"),
    });
  }

  return (
    <>
      <BrowserRouter>
        <TopNav />
        <ToastContainer position="top-right" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/tours" component={Tour} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/graph" component={Graph} />
          <Route exact path="/cipher" component={CeaserCipher} />
          <Route exact path="/suggesttour" component={SuggestmeTour} />
          <Route exact path="/admin/userreport" component={UserReport} />
          <Route exact path="/securityquestion" component={Securityquestion} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/visualization" component={Visualizations} />
          <PrivateRoute exact path="/feedback" component={Feedback} />
          <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
