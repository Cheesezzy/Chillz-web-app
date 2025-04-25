import React, { useState } from "react";
import editIcon from "/edit.png";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EditEventModal from "../../Modals/EditEventModal";

const PersonalEventList: React.FC<{ events: any[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = async (updatedEvent: any) => {
    try {
      const eventDocRef = doc(db, "events", updatedEvent.id); // Adjust collection name
      await updateDoc(eventDocRef, updatedEvent);
      setIsEditModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-md bg-red-100 flex items-center justify-center text-red-600">
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
                <p className="text-sm  text-gray-900 truncate">
                  {event.description}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {event.startTime} - {event.endTime}• {event.location}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {event.attendees} attendees
                </span>
                <span className="mt-1 text-xs text-gray-500">You:</span>
                <span
                  className="hover:cursor-pointer"
                  onClick={() => handleEditClick(event)}
                >
                  <img src={editIcon} alt="edit-icon" className="w-4 h-4" />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {events.length === 0 && (
        <div className="py-4 text-center text-sm text-gray-500">
          You don't have any events scheduled. Create one now!
        </div>
      )}
      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default PersonalEventList;
