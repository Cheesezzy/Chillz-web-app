import { useNavigate } from "react-router-dom";
import { signInUserWithGoogle } from "../../lib/firebase/Authentication/GoogleAuth";
import google from "/google.png";

const ContinueWithGoogle = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Continue with */}
      <div className="mt-10">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="px-2 bg-white text-gray-900">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      {/* Button */}
      <div
        className="mt-6 grid grid-cols-1"
        onClick={() => signInUserWithGoogle(navigate)}
      >
        <a className="flex w-full items-center justify-center gap-3 rounded-md bg-[#020202] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 bg-black focus-visible:outline-offset-2 focus-visible:outline-customRed hover:bg-gray-600">
          <img src={google} alt="google" width={30} height={30} />
          <span className="text-sm font-semibold leading-6">Google</span>
        </a>
      </div>
    </>
  );
};

export default ContinueWithGoogle;
