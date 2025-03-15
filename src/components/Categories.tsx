import music from "/music.png";
import night from "/party.png";
import karaoke from "/karaoke.png";
import sport from "/sport.png";
import gym from "/weight.png";
import business from "/cooperation.png";
import fooddrinks from "/fast-food.png";
import gaming from "/gaming.png";
import hangout from "/interview.png";
import "./Categories.css";

function Categories() {
  return (
    <div className="categories">
      <div className="con">
        <img src={music} alt="Musical Concert" width="50%" height="50%" />
        <h6>Musical Concert</h6>
      </div>
      <div className="con">
        <img src={night} alt="Night Life and Party" width="50%" height="50%" />
        <h6>Night Life and Party</h6>
      </div>
      <div className="con">
        <img src={karaoke} alt="Karaoke" width="50%" height="50%" />
        <h6>Karaoke</h6>
      </div>
      <div className="con">
        <img src={sport} alt="Sports" width="50%" height="50%" />
        <h6>Sports</h6>
      </div>
      <div className="con">
        <img src={gym} alt="Gym" width="50%" height="50%" />
        <h6>Gym</h6>
      </div>
      <div className="con">
        <img src={business} alt="Business" width="50%" height="50%" />
        <h6>Business</h6>
      </div>
      <div className="con">
        <img src={fooddrinks} alt="Food and Drinks" width="50%" height="50%" />
        <h6>Food and Drinks</h6>
      </div>
      <div className="con">
        <img src={gaming} alt="Gaming" width="50%" height="50%" />
        <h6>Gaming</h6>
      </div>
      <div className="con">
        <img src={hangout} alt="Hangout" width="50%" height="50%" />
        <h6>Hangout</h6>
      </div>
    </div>
  );
}

export default Categories;
