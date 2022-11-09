import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  console.log(auth);
  return auth && auth.idToken.jwtToken ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
