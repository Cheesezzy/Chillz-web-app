import { useEventData } from "../../hooks/useEventData";

const OrganizationName = ({
  eventId,
  userEmail,
}: {
  eventId: string;
  userEmail: string;
}) => {
  const { organization, loading } = useEventData(eventId, userEmail);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <div>
      {organization ? (
        <p className="text-sm font-semibold text-gray-500">
          {organization.organizationName}
        </p>
      ) : (
        <p className="text-sm text-gray-500">Unknown Organizer</p>
      )}
    </div>
  );
};

export default OrganizationName;
