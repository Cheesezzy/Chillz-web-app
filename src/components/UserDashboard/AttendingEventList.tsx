import OrganizationName from "../OrganizationName";

const AttendingEventList: React.FC<{ events: any[] }> = ({ events }) => {
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                  <span className="text-lg font-medium">
                    {event.date.split("-")[2]}
                  </span>
                  <span className="text-xs">
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ][parseInt(event.date.split("-")[1]) - 1]
                    }
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {event.location}
                </p>
                <div className="text-xs flex items-center gap-2 text-gray-500">
                  <p> Organized by:</p>
                  <OrganizationName
                    eventId={event.id}
                    userEmail={event.email}
                  />
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {event.role}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {events.length === 0 && (
        <div className="py-4 text-center text-sm text-gray-500">
          You're not attending any events yet. Find events to attend!
        </div>
      )}
    </div>
  );
};

export default AttendingEventList;
