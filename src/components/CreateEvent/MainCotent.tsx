import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";

type EventCategory =
  | "Music Concert"
  | "Night Life and Party"
  | "Karaoke"
  | "Sports"
  | "Gym"
  | "Business"
  | "Food and Drinks"
  | "Gaming"
  | "Hangout"
  | "Conference"
  | "Art"
  | "Charity"
  | "Music";

interface EventFormData {
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: File | null;
  ticketPrice: string;
  maxAttendees: string;
}

const MainContent = () => {
  const [user, loading, error] = useAuthState(auth); // Get the user from Firebase Auth
  const navigate = useNavigate();

  const categories: EventCategory[] = [
    "Music Concert",
    "Night Life and Party",
    "Karaoke",
    "Sports",
    "Gym",
    "Business",
    "Food and Drinks",
    "Gaming",
    "Hangout",
    "Conference",
    "Art",
    "Charity",
    "Music",
  ];

  const initialFormData: EventFormData = {
    title: "",
    description: "",
    category: "Hangout",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    imageUrl: null,
    ticketPrice: "",
    maxAttendees: "",
  };

  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  // const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setIsSubmitting(true);
    setSubmitError("");

    try {
      let imageUrl = "";

      if (formData.imageUrl) {
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

      await addDoc(collection(db, "events"), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        ticketPrice: formData.ticketPrice,
        imageUrl,
        maxAttendees: formData.maxAttendees,
        createdBy: user?.uid || "anonymous",
        createdAt: new Date().toISOString(),
      });

      setSubmitSuccess(true);
      setFormData(initialFormData);

      // Navigate to UserDashboard after success
      navigate(RoutesEnum.UserDashboard);
    } catch (error) {
      setSubmitError("Failed to create event. Please try again.");
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-customCyan to-customCyan p-6">
              <h1 className="text-white text-2xl sm:text-3xl font-bold">
                Create New Event
              </h1>
            </div>

            {submitSuccess && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative m-4"
                role="alert"
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">
                  {" "}
                  Your event has been created.
                </span>
              </div>
            )}

            {submitError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Title */}
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    required
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    required
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* File Input */}
                <div className="col-span-2">
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cover Image
                  </label>
                  <input
                    type="file"
                    id="imageUrl"
                    name="imageUrl"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ticketPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ticket Price (USD)
                </label>
                <input
                  type="number"
                  id="ticketPrice"
                  name="ticketPrice"
                  min="0"
                  step="0.01"
                  value={formData.ticketPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="maxAttendees"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Attendees
                </label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  min="1"
                  value={formData.maxAttendees}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-3"
                  onClick={() => setFormData(initialFormData)}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-customRed py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
function v4() {
  throw new Error("Function not implemented.");
}
