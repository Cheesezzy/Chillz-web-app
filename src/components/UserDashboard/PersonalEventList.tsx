import React, { useState } from "react";
import editIcon from "/edit.png";
import trash from "/trash.png";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EditEventModal from "../../Modals/EditEventModal";

const PersonalEventList: React.FC<{ events: any[] }> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<any | null>(null);

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

  const handleDeleteClick = (event: any) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const eventDocRef = doc(db, "events", eventToDelete.id); // Adjust collection name
      await deleteDoc(eventDocRef);
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
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
                  {event.startTime} - {event.endTime} • {event.location}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {event.attendees} attendees
                </span>
                <span className="mt-1 text-xs text-gray-500">You:</span>
                <div className="flex gap-2">
                  <span
                    className="hover:cursor-pointer"
                    onClick={() => handleEditClick(event)}
                  >
                    <img src={editIcon} alt="edit-icon" className="w-4 h-4" />
                  </span>
                  <span
                    className="hover:cursor-pointer"
                    onClick={() => handleDeleteClick(event)}
                  >
                    <img src={trash} alt="delete-icon" className="w-4 h-4" />
                  </span>
                </div>
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
      {isDeleteModalOpen && eventToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to delete the event{" "}
              <span className="font-semibold">{eventToDelete.title}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-md hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalEventList;
