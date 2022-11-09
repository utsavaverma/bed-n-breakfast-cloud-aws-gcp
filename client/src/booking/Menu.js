import { useState, useEffect } from "react";
import { allMenu } from "../actions/hotel";
import MenuCard from "../components/cards/MenuCard";
import { useSelector, useDispatch } from "react-redux";
import LexChat from "react-lex-plus";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllmenu();
  }, []);

  const loadAllmenu = async () => {
    let res = await allMenu();
    setMenu(res.data.body);
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
        <h1>Menu</h1>
      </div>

      <div className="container-fluid">
        <br />

        {menu.map((m) => (
          <MenuCard key={m.id} m={m} />
        ))}
      </div>
      {auth && auth ? loginBot() : loginBot()}
    </>
  );
};

export default Menu;
