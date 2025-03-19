import chillzLogo from "../assets/chillz.png";
import { Link } from "react-router-dom";
import search from "../assets/vectors/search.svg";
import "../App.css";

function Nav() {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <img src={chillzLogo} className="logo" alt="Chillz logo" />
        </Link>
        <div className="search">
          <div className="icon-sec">
            <img src={search} alt="search" className="search-img" />
            <input type="text" placeholder="Search for Events" />
          </div>
          <input type="text" placeholder="Location" className="loc" />
          <img src={search} alt="search" className="ser" />
        </div>
        <Link to="/contact" className=" link ">
          <p>Contact</p>
        </Link>
        <Link to="#" className="link list">
          <p> All Events</p>
        </Link>
        <Link to="#" className="link list">
          <p>Help Center</p>
        </Link>
        <Link to="#" className="link list">
          <p>Tickets</p>
        </Link>
        <div className="auth">
          <Link to="#" className="log">
            <h5>Create Event</h5>
          </Link>
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Nav;
