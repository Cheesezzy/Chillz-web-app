import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { RoutesEnum } from "../../routes";
import { EventCategory, categoryGroups } from "./types";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";


interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  imageUrl: File | null;
  ticketPrice: string;
  maxAttendees: string;
  interestedUsers: number[];
  posts: { user: string; message: string; timestamp: string }[];
  eventType: 'one-time' | 'recurring';
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    selectedWeekDays?: string[];
    selectedMonthDays?: string[];
    endDate?: string;
  };
}

const MainContent = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMainCategory, setSelectedMainCategory] = useState<EventCategory>("entertainment");
  const { createEvent, isSubmitting, submitSuccess, submitError, resetForm } = useCreateEvent();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const initialFormData: EventFormData = {
    title: "",
    description: "",
    category: "musicalConcert",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    imageUrl: null,
    ticketPrice: "",
    maxAttendees: "",
    interestedUsers: [],
    posts: [],
    eventType: 'one-time',
    recurringPattern: {
      frequency: 'weekly',
      selectedWeekDays: [],
      selectedMonthDays: [],
      endDate: ''
    }
  };

  const [formData, setFormData] = useState<EventFormData>(initialFormData);

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
        imageUrl: e.target.files?.[0] || null,
      }));
    }
  };

  const fetchOrganizationProfileForUser = async (userId: string) => {
    try {
      const profilesQuery = query(
        collection(db, "organizationProfile"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(profilesQuery);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }

      return null;
    } catch (error) {
      console.error("Error fetching organization profile:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const organizationProfileId = await fetchOrganizationProfileForUser(
        user?.uid || ""
      );

      if (!organizationProfileId) {
        throw new Error("No organization profile found for the user.");
      }

      await createEvent(formData, user?.uid || "", organizationProfileId);
      setFormData(initialFormData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate(RoutesEnum.UserDashboard);
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
                {/* Event Type Selection */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("eventType")} <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="eventType"
                        value="one-time"
                        checked={formData.eventType === 'one-time'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          eventType: e.target.value as 'one-time' | 'recurring'
                        }))}
                        className="form-radio h-4 w-4 text-[#FF6B6B]"
                      />
                      <span className="ml-2">{t("oneTime")}</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="eventType"
                        value="recurring"
                        checked={formData.eventType === 'recurring'}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          eventType: e.target.value as 'one-time' | 'recurring'
                        }))}
                        className="form-radio h-4 w-4 text-[#FF6B6B]"
                      />
                      <span className="ml-2">{t("recurring")}</span>
                    </label>
                  </div>
                </div>

                {/* Recurring Event Options */}
                {formData.eventType === 'recurring' && (
                  <div className="col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("frequency")} <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.recurringPattern?.frequency}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          recurringPattern: {
                            ...prev.recurringPattern!,
                            frequency: e.target.value as 'daily' | 'weekly' | 'monthly',
                            selectedWeekDays: [],
                            selectedMonthDays: []
                          }
                        }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="daily">{t("daily")}</option>
                        <option value="weekly">{t("weekly")}</option>
                        <option value="monthly">{t("monthly")}</option>
                      </select>
                    </div>

                    {/* Weekly Options */}
                    {formData.recurringPattern?.frequency === 'weekly' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("selectWeekDays")} <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <label key={day} className="inline-flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.recurringPattern?.selectedWeekDays?.includes(day)}
                                onChange={(e) => {
                                  const newSelectedWeekDays = e.target.checked
                                    ? [...(formData.recurringPattern?.selectedWeekDays || []), day]
                                    : (formData.recurringPattern?.selectedWeekDays || []).filter(d => d !== day);
                                  setFormData(prev => ({
                                    ...prev,
                                    recurringPattern: {
                                      ...prev.recurringPattern!,
                                      selectedWeekDays: newSelectedWeekDays
                                    }
                                  }));
                                }}
                                className="form-checkbox h-4 w-4 text-[#FF6B6B]"
                              />
                              <span className="ml-2 text-sm">{t(day.toLowerCase())}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Monthly Options */}
                    {formData.recurringPattern?.frequency === 'monthly' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t("selectMonthDays")} <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <label key={day} className="inline-flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.recurringPattern?.selectedMonthDays?.includes(day.toString())}
                                onChange={(e) => {
                                  const newSelectedMonthDays = e.target.checked
                                    ? [...(formData.recurringPattern?.selectedMonthDays || []), day.toString()]
                                    : (formData.recurringPattern?.selectedMonthDays || []).filter(d => d !== day.toString());
                                  setFormData(prev => ({
                                    ...prev,
                                    recurringPattern: {
                                      ...prev.recurringPattern!,
                                      selectedMonthDays: newSelectedMonthDays
                                    }
                                  }));
                                }}
                                className="form-checkbox h-4 w-4 text-[#FF6B6B]"
                              />
                              <span className="ml-2 text-sm">{day}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t("endDate")}
                      </label>
                      <input
                        type="date"
                        value={formData.recurringPattern?.endDate}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          recurringPattern: {
                            ...prev.recurringPattern!,
                            endDate: e.target.value
                          }
                        }))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                {/* Event Title */}
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("eventTitle")} <span className="text-red-400">*</span>
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
                    {t("eventDescription")} <span className="text-red-400">*</span>
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

                <div className="flex flex-row gap-2 items-center">
                  <div className="col-span-2">
                    <label
                      htmlFor="mainCategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("mainCategory")} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="mainCategory"
                      name="mainCategory"
                      required
                      value={selectedMainCategory}
                      onChange={(e) => setSelectedMainCategory(e.target.value as EventCategory)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {Object.keys(categoryGroups).map((category) => (
                        <option key={category} value={category}>
                          {t(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("subCategory")} <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categoryGroups[selectedMainCategory].map((category) => (
                        <option key={category} value={category}>
                          {t(category)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.eventType === 'one-time' && (
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {t("eventDate")} <span className="text-red-400">*</span>
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
                )}

                {formData.eventType === 'recurring' && formData.recurringPattern?.frequency === 'weekly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t("eventDate")} <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                      {formData.recurringPattern?.selectedWeekDays && formData.recurringPattern.selectedWeekDays.length > 0 ? (
                        <span>
                          {t("every")} {formData.recurringPattern.selectedWeekDays.map(day => t(day.toLowerCase())).join(", ")}
                        </span>
                      ) : (
                        <span className="text-gray-500">{t("selectWeekDays")}</span>
                      )}
                    </div>
                  </div>
                )}

                {formData.eventType === 'recurring' && formData.recurringPattern?.frequency === 'monthly' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t("eventDate")} <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                      {formData.recurringPattern?.selectedMonthDays && formData.recurringPattern.selectedMonthDays.length > 0 ? (
                        <span>
                          {t("every")} {formData.recurringPattern.selectedMonthDays.join(", ")} {t("ofTheMonth")}
                        </span>
                      ) : (
                        <span className="text-gray-500">{t("selectMonthDays")}</span>
                      )}
                    </div>
                  </div>
                )}

                {formData.eventType === 'recurring' && formData.recurringPattern?.frequency === 'daily' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t("eventDate")} <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-50">
                      {t("everyDay")}
                    </div>
                  </div>
                )}

                {/* Start Time */}
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("startTime")} <span className="text-red-400">*</span>
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
                    {t("endTime")} <span className="text-red-400">*</span>
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
                    {t("location")} <span className="text-red-400">*</span>
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
                    {t("coverImage")}
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
                  {t("maximumAttendees")}
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
                  onClick={() => {
                    setFormData(initialFormData);
                    resetForm();
                  }}
                >
                  {t("reset")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FF6B6B] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {isSubmitting ? t("creating") : t("createEvent")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleSuccessModalClose} 
      />
    </div>
  );
};

export default MainContent;
