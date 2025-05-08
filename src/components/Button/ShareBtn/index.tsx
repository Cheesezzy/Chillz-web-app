import { Share2 } from "lucide-react";
import { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { useTranslation } from "react-i18next";

interface Event {
  id: string;
  title: string;
  description: string;
}

export default function Share({ event }: { event: Event }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { t } = useTranslation();

  const toggleShareModal = () => {
    setIsShareModalOpen(!isShareModalOpen);
  };

  // Event-specific data
  const shareUrl = `${window.location.origin}/en/event/${event.id}`; // Event-specific URL
  const shareTitle = `Check out this event: ${event.title}!`;
  const shareDescription = event.description;

  return (
    <>
      {/* Share Button */}
      <button
        onClick={toggleShareModal}
        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
      >
        <Share2 className="w-5 h-5 mr-2" />
        {t("share")}
      </button>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">{t("shareThisEvent")}</h2>
            <div className="flex justify-around mb-4">
              {/* Facebook Share */}
              <FacebookShareButton
                url={`${shareUrl}?title=${encodeURIComponent(
                  shareTitle
                )}&description=${encodeURIComponent(shareDescription)}`}
                hashtag="#EventShare"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              {/* Twitter Share */}
              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                hashtags={["EventShare", "Chillz"]}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              {/* WhatsApp Share */}
              <WhatsappShareButton
                url={shareUrl}
                title={`${shareTitle}\n\n${shareDescription}`}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              {/* LinkedIn Share */}
              <LinkedinShareButton
                url={shareUrl}
                title={shareTitle}
                summary={shareDescription}
                source="Chillz"
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>
            <button
              onClick={toggleShareModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
