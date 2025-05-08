import { useState } from "react";
import { useEventData } from "../../hooks/useEventData";
import { useTranslation } from "react-i18next";

const OrganizationName = ({
  eventId,
  userEmail,
}: {
  eventId: string;
  userEmail: string;
}) => {
  const { organization, loading } = useEventData(eventId, userEmail);
  const [showDetails, setShowDetails] = useState(false);
  const { t } = useTranslation();
  if (loading) {
    return <p className="text-sm text-red-500 font-bold">Loading...</p>;
  }

  if (!organization) {
    return <p className="text-sm text-gray-500">Unknown Organizer</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Align name and button using flex */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-gray-900">
          {organization.organizationName}
        </p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-600 mr-2 hover:underline focus:outline-none"
        >
          {showDetails ? t("hideDetails") : t("showDetails")}
        </button>
      </div>

      {/* Toggle organization details */}
      {showDetails && (
        <div className=" p-4 border rounded-lg bg-gray-50 shadow-sm">
          <p className="text-sm text-gray-600 mb-4">
            {organization.description || t("noDescriptionAvailable")}
          </p>
          {organization.logo && (
            <img
              src={organization.logo}
              alt={organization.organizationName}
              className="w-16 h-16 rounded-full mb-4"
            />
          )}
          <div className="mb-4">
            <p className="text-sm text-gray-500">{t("contact")}:</p>
            <p className="text-sm">
              {t("email")}:{" "}
              <a
                href={`mailto:${organization.email}`}
                className="text-indigo-600 hover:underline"
              >
                {organization.email || "N/A"}
              </a>
            </p>
            <p className="text-sm">
              {t("phone")}:{" "}
              <a
                href={`tel:${organization.phone}`}
                className="text-indigo-600 hover:underline"
              >
                {organization.phone || "N/A"}
              </a>
            </p>
            <p className="text-sm">
              {t("website")}:{" "}
              <a
                href={organization.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {organization.website?.replace(/^https?:\/\//, "") || "N/A"}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t("socialMedia")}:</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={organization.facebook || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {t("facebook")}
                </a>
              </li>
              <li>
                <a
                  href={organization.twitter || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {t("twitter")}
                </a>
              </li>
              <li>
                <a
                  href={organization.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  {t("instagram")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationName;
