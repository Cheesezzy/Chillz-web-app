import eventImg from "/event-img.jpeg";
import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import "./Cards.css";
const Verified = () => {
  return (
    <div>
      <div className="card_wrapper">
        <div className="head_text">
          <h2>Upcoming Events</h2>
        </div>
        <div className="card_item">
          <div className="card_img">
            <a href="#">
              <img src={eventImg} alt="Images" />
            </a>
          </div>
          <div className="card_text">
            <div className="card_icon">
              <a href="#">
                <p className="map">
                  <img src={map} alt="map" width={10} height={10} />
                  <i className="text-sm">IAC Building</i>
                </p>
              </a>
              <a href="#">
                {" "}
                <p className="calender">
                  <img src={dates} alt="calender" width={10} height={10} />
                  <i className="text-sm">16th - Apr - 2025</i>
                </p>
              </a>

              <a href="#">
                <p className="clock">
                  <img src={clock} alt="clock" width={10} height={10} />
                  <i className="text-sm">8:00am - 5:00pm</i>
                </p>
              </a>
            </div>
            <h2>
              <a href="#">Elegant Light Box Paper Cut Dioramas in UK</a>
            </h2>
            <div className="flex items-center justify-between">
              <a className="ticket_btn" href="#">
                Get Ticket
              </a>
              <span className="flex items-center gap-1">
                <img src={badge} alt="badge" width={20} height={20} />
                <p className="text-xs font-semibold">Verified</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verified;
