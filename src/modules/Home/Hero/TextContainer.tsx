import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

const TextContainer = () => {
  const [open, setOpen] = useState(false);
  console.log(open, "open");
  return (
    <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
      <h1 className="text-4xl text-red-500 font-bold tracking-tight sm:text-6xl">
        Dribble, Dunk, Shop
      </h1>
      <p className="mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
        Welcome to Baller Boutique – Your Basketball Paradise. Baller Boutique
        brings you a curated selection of basketball apparel and accessories.
        Elevate your street-style game with our latest arrivals.
      </p>
      <div className="w-1/2 mt-4">
        <Button
          text="Show more"
          type="button"
          handleClick={() => setOpen(!open)}
        />
      </div>
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
};

export default TextContainer;
