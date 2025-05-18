import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../routes';

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

interface UseCreateEventReturn {
  createEvent: (formData: EventFormData, userId: string, organizationProfileId: string) => Promise<void>;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string;
  resetForm: () => void;
}

export const useCreateEvent = (): UseCreateEventReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const navigate = useNavigate();

  const resetForm = () => {
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const createEvent = async (
    formData: EventFormData,
    userId: string,
    organizationProfileId: string
  ) => {
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

      // Common event data
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        imageUrl,
        maxAttendees: formData.maxAttendees,
        createdBy: userId,
        organizationProfileId,
        createdAt: new Date().toISOString(),
        interest: 0,
        posts: [],
        eventType: formData.eventType,
        status: 'upcoming'
      };

      // Add event type specific data
      if (formData.eventType === 'one-time') {
        await addDoc(collection(db, "events"), {
          ...eventData,
          date: formData.date
        });
      } else {
        await addDoc(collection(db, "events"), {
          ...eventData,
          recurringPattern: {
            frequency: formData.recurringPattern?.frequency,
            selectedWeekDays: formData.recurringPattern?.selectedWeekDays || [],
            selectedMonthDays: formData.recurringPattern?.selectedMonthDays || [],
            endDate: formData.recurringPattern?.endDate
          }
        });
      }

      setSubmitSuccess(true);
      navigate(RoutesEnum.UserDashboard);
    } catch (error) {
      setSubmitError("Failed to create event. Please try again.");
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createEvent,
    isSubmitting,
    submitSuccess,
    submitError,
    resetForm
  };
}; 