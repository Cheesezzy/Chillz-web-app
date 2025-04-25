import React from "react";

const FailureModal: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-[#F4F4F9] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="w-12 h-12 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-red-600">Error</h2>
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;
