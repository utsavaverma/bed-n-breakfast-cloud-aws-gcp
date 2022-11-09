import { useState, useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import { useSelector, useDispatch } from "react-redux";
import LexChat from "react-lex-plus";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    let res = await allHotels();
    setHotels(res.data.body);
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
        <h1>All Rooms</h1>
      </div>

      <div className="container-fluid">
        <br />
        {hotels.map((h) => (
          <SmallCard key={h.id} h={h} />
        ))}
      </div>
      {auth && auth ? loginBot() : loginBot()}
    </>
  );
};

export default Home;
