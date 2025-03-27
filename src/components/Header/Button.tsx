// filepath: /Users/chidubempatrick/Chillz-web-app/src/components/Header/Button.tsx
import { Link } from "react-router-dom";

const Button = () => {
  return (
    <Link to="/auth-page" className="p-4">
      <div className="bg-customRed text-white px-4 py-2 rounded-lg">
        <h5 className="text-lg font-semibold">Create Event</h5>
      </div>
    </Link>
  );
};

export default Button;
