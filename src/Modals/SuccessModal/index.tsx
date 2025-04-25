import React from "react";

const SuccessModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-[#F4F4F9] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="w-12 h-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m0 0a9 9 0 11-6.364 2.636A9 9 0 0112 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-green-600">Success</h2>
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
