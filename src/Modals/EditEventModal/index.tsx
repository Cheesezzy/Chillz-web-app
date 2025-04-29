import React, { useState } from "react";
import SuccessModal from "../SuccessModal";
import FailureModal from "../FailureModal";

interface EventData {
  id?: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  imageUrl: string | File | null;
  organizer: string;
}

const EditEventModal: React.FC<{
  event: EventData;
  onClose: () => void;
  onSave: (updatedEvent: EventData) => void;
}> = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState<EventData>({
    title: event.title || "",
    date: event.date || "",
    startTime: event.startTime || "",
    endTime: event.endTime || "",
    description: event.description || "",
    location: event.location || "",
    imageUrl: event.imageUrl || null,
    organizer: event.organizer || "",
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        imageUrl: e.target.files?.[0] || null, // Save the selected file if available
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      setFailureMessage("Please fill in all required fields.");
      setIsFailureModalOpen(true);
      return;
    }

    try {
      let imageUrl = "";

      if (formData.imageUrl && formData.imageUrl instanceof File) {
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", formData.imageUrl);
        formDataToUpload.append(
          "upload_preset",
          import.meta.env.VITE_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/upload`,
          {
            method: "POST",
            body: formDataToUpload,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const sanitizedData = {
        ...formData,
        id: event.id || "",
        imageUrl: imageUrl || formData.imageUrl,
      };

      onSave(sanitizedData);
      setIsSuccessModalOpen(true);
    } catch (error) {
      setFailureMessage("Failed to update the event. Please try again.");
      setIsFailureModalOpen(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    window.location.reload(); // Refresh the page
  };

  const handleFailureModalClose = () => {
    setIsFailureModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#F4F4F9] bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-md hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 hover:text-white hover:cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal
          message="Event updated successfully!"
          onClose={handleSuccessModalClose}
        />
      )}

      {isFailureModalOpen && failureMessage && (
        <FailureModal
          message={failureMessage}
          onClose={handleFailureModalClose}
        />
      )}
    </>
  );
};

export default EditEventModal;
