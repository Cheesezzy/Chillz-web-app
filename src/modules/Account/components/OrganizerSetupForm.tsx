import React, { useState } from "react";
import {
  Building,
  Mail,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Save,
  Upload,
  Info,
} from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import SuccessModal from '../../../components/Onboarding/SuccessModal';

interface OrganizerProfile {
  organizationName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  logo: string | null;
}


const OrganizerSetupForm = () => {
  const [user] = useAuthState(auth);

  const [organizerProfile, setOrganizerProfile] = useState<OrganizerProfile>({
    organizationName: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    logo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrganizerProfile({ ...organizerProfile, [name]: value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setOrganizerProfile({
          ...organizerProfile,
          logo: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let logo = "";

      if (organizerProfile.logo) {
        const organizationDataToUpload = new FormData();
        organizationDataToUpload.append("file", organizerProfile.logo);
        organizationDataToUpload.append(
          "upload_preset",
          import.meta.env.VITE_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/upload`,
          {
            method: "POST",
            body: organizationDataToUpload,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        logo = data.secure_url;
      }
      await addDoc(collection(db, "organizationProfile"), {
        organizationName: organizerProfile.organizationName,
        description: organizerProfile.description,
        email: organizerProfile.email,
        phone: organizerProfile.phone,
        website: organizerProfile.website,
        facebook: organizerProfile.facebook,
        twitter: organizerProfile.twitter,
        instagram: organizerProfile.instagram,
        logo,
        userId: user?.uid,
      });

      setIsSuccess(true);
      setOrganizerProfile(organizerProfile);
      setShowSuccessModal(true);
    } catch (error) {
      setIsSuccess(false);
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
  
    <div className="min-h-screen bg-gray-50 mt-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6 text-gray-600 bg-blue-50 p-4 rounded-lg">
            <Info size={20} className="mr-2 text-blue-500" />
            <p>
              Complete your organizer Profile by filling out the form below.
              This information will be visible to event attendees.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                {/* Organization Name */}
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization Name*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Building size={18} />
                    </span>
                    <input
                      type="text"
                      id="organizationName"
                      name="organizationName"
                      value={organizerProfile.organizationName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your organization name"
                    />
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization Logo
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Upload size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <label
                        htmlFor="logoInput"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                      >
                        <Upload size={16} className="mr-2" />
                        Choose File
                        <input
                          id="logoInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoChange}
                        />
                      </label>
                      <p className="mt-2 text-xs text-gray-500">
                        Recommended: 400x400px, PNG or JPG, max 2MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={organizerProfile.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write a brief description about your organization"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Describe your organization, its mission, and what kind of
                    events you host.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Mail size={18} />
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={organizerProfile.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Phone size={18} />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={organizerProfile.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Web Presence
              </h2>
              <div className="space-y-4">
                {/* Website */}
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Globe size={18} />
                    </span>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={organizerProfile.website}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Facebook */}
                  <div>
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Facebook
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Facebook size={18} />
                      </span>
                      <input
                        type="url"
                        id="facebook"
                        name="facebook"
                        value={organizerProfile.facebook}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Facebook URL"
                      />
                    </div>
                  </div>

                  {/* Twitter */}
                  <div>
                    <label
                      htmlFor="twitter"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Twitter
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Twitter size={18} />
                      </span>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={organizerProfile.twitter}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Twitter URL"
                      />
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Instagram
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Instagram size={18} />
                      </span>
                      <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={organizerProfile.instagram}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      
      
    </div>
    {isSuccess && (
              <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal 
            onClose={handleCloseModal} 
            hasOrganization={true}
          />
        )}
      </AnimatePresence>
            )}
            </>
  );
};

export default OrganizerSetupForm;
