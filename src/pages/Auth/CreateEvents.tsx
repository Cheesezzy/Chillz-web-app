import chillzlogo from "/chillz.png";

const CreateEvent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <div className="bg-red p-8 rounded-lg shadow-md w-full max-w-md">
        <img
          src={chillzlogo}
          alt="chillz-logo"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-center mb-4">Welcome!</h1>
        <h1 className="text-lg text-center mb-4">What's your Email?</h1>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          type="email"
          placeholder="Please Enter Your Email"
        />
      </div>
    </div>
  );
};

export default CreateEvent;
