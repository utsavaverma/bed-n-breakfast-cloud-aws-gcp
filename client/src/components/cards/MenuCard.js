import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { bookMeal } from "../../actions/hotel";
import { toast } from "react-toastify";
const MenuCard = ({
  m,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => ({ ...state }));

  const handleClick = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const userid = localStorage.getItem("userid");

    const orderData = {
      email,
      image: m.image,
      userid,
      description: m.description,
      id: m.id,
      price: m.price,
      title: m.title,
    };
    const response = await bookMeal(orderData);
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      toast.success("Order successful");
      history.push("/");
    } else {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {m.image && m.image ? (
              <img
                src={m.image}
                alt="default hotel image"
                className="card-image img img-fluid rounded mx-auto d-block"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{m.title} </h3>

              <p className="card-text">{`${m.description}`}</p>

              <p
                className="alert alert-warning "
                style={{ maxWidth: "200px", textAlign: "center" }}
              >
                Price: ${m.price}
              </p>

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={handleClick}
                  className="btn btn-block btn-lg btn-primary mt-3"
                  disabled={loading || !auth}
                >
                  {loading
                    ? "Loading..."
                    : // : alreadyBooked
                    // ? "Already Booked"
                    auth && auth
                    ? "Order Now"
                    : "Login to Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
