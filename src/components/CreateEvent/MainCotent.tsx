import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import { EventCategory } from "./types";
import { MapPin } from "lucide-react";

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
  interestedUsers: number[];
  posts: { user: string; message: string; timestamp: string }[];
}

const MainContent = () => {
  const [user] = useAuthState(auth); // Get the user from Firebase Auth
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
    interestedUsers: [],
    posts: [],
  };

  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");

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
  const fetchOrganizationProfileForUser = async (userId: string) => {
    try {
      const profilesQuery = query(
        collection(db, "organizationProfile"),
        where("userId", "==", userId) // Filter by userId
      );

      const querySnapshot = await getDocs(profilesQuery);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id; // Return the organizationProfileId
      }

      return null; // No organization profile found
    } catch (error) {
      console.error("Error fetching organization profile:", error);
      return null;
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
      // Fetch the user's organization profile
      const organizationProfileId = await fetchOrganizationProfileForUser(
        user?.uid || ""
      );

      if (!organizationProfileId) {
        throw new Error("No organization profile found for the user.");
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
        organizationProfileId,
        createdAt: new Date().toISOString(),
        interest: 0,
        posts: [],
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
            <div className="bg-gradient-to-r from-teal-900 to-teal-600 p-6">
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
                    className="flex text-sm font-medium text-gray-700"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
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

              {/* <div>
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
              </div> */}
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
                  className="bg-[#FF6B6B] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
