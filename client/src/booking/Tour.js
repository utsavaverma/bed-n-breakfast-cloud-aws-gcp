import { useState, useEffect } from "react";
import { allTours } from "../actions/hotel";
import { useSelector, useDispatch } from "react-redux";
import LexChat from "react-lex-plus";
import TourCard from "../components/cards/TourCard";
import { Link } from "react-router-dom";

const Tour = () => {
  const [tour, setTour] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    loadAllTours();
  }, []);

  const loadAllTours = async () => {
    let res = await allTours();
    setTour(res.data.body);
  };

  const loginBot = () => {
    return (
      <LexChat
        botName="HotelAssist"
        IdentityPoolId="us-east-1:53305051-7ef5-4bd4-9208-118b97c3e4a4"
        placeholder="Placeholder text"
        backgroundColor="##D9D9D9"
        height={430}
        region="us-east-1"
        headerText="Online Support"
        sessionAttributes={{ userid: localStorage.getItem("userid") }}
        headerStyle={{ backgroundColor: "#000000", fontSize: "30px" }}
        greeting={"Hello, how can I help?"}
      />
    );
  };

  // const unauthorizedBot = () => {
  //   return (
  //     <LexChat
  //       botName="AssistHotelNotRegistered"
  //       IdentityPoolId="us-east-1:53305051-7ef5-4bd4-9208-118b97c3e4a4"
  //       placeholder="Placeholder text"
  //       backgroundColor="##D9D9D9"
  //       height={430}
  //       region="us-east-1"
  //       headerText="Online Support (General queries)"
  //       headerStyle={{ backgroundColor: "#000000", fontSize: "30px" }}
  //       sessionAttributes={{ userid: localStorage.getItem("userid") }}
  //       greeting={"Hello, how can I help?"}
  //     />
  //   );
  // };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Tour Packages</h1>
      </div>
      <Link className="nav-link" to="/suggesttour" style={{marginLeft:"600px",fontSize:"20px"}}>
       Suggest me a Tour! 
      </Link>
      <div className="container-fluid">
        <br />
        {tour.map((m) => (
          <TourCard key={m.id} m={m} />
        ))}
      </div>
      {auth && auth ? loginBot() : loginBot()}
    </>
  );
};

export default Tour;
