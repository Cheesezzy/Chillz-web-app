import chillzLogo from "../assets/chillz.png";
import search from "../assets/vectors/search.svg";
import "../App.css";

function Nav() {
  return (
    <>
      <div className="nav">
        <a href="" target="_blank">
          <img src={chillzLogo} className="logo" alt="Chillz logo" />
        </a>
        <div className="search">
          <div className="icon-sec">
            <img src={search} alt="search" className="search-img" />
            <input type="text" placeholder="Search for Events" />
          </div>
          <input type="text" placeholder="Location" className="loc" />
          <img src={search} alt="search" className="ser" />
        </div>
        <a href="#" className="list">
          <h5>Contact Sales</h5>
        </a>
        <a href="#" className="list">
          <h5>Create Events</h5>
        </a>
        <a href="#" className="list">
          <h5>Help Center</h5>
        </a>
        <a href="#">
          <h5>Tickets</h5>
        </a>
        <a href="#">
          {" "}
          <h5>Log In</h5>
        </a>
        <a href="#">
          <h5>Sign Up</h5>
        </a>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Nav;
