import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image ? (
              <img
                src={h.image}
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
              <h3 className="card-title">{h.title} </h3>
              <p
                className="alert alert-info"
                style={{ maxWidth: "200px", textAlign: "center" }}
              >
                Room type: {h.category}
              </p>
              <p className="card-text">{`${h.description}`}</p>

              <p
                className="alert alert-warning"
                style={{ maxWidth: "200px", textAlign: "center" }}
              >
                Price: ${h.dailyRate}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/hotel/${h.id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
