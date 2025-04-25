import React from "react";

const AlertModal: React.FC<{
  message: string;
  onClose: () => void;
}> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#F4F4F9] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-medium text-red-600 mb-4">Alert</h2>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
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

export default AlertModal;
