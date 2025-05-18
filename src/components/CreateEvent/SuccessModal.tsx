import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t("eventCreated")}</h3>
          <p className="text-gray-600 mb-6">{t("eventCreatedSuccess")}</p>
          <button
            onClick={onClose}
            className="bg-[#FF6B6B] text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            {t("continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 