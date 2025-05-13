import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../lib/firebase"; // Adjust the path to your Firebase setup
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";

interface UserProfileProps {
  user: any; // Replace `any` with the appropriate Firebase User type if needed
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => { 
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(""); // State to store the fetched image URL
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch the image URL from Firestore
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!user?.email) {
        console.error("Invalid user: Email is required to fetch the document.");
        return;
      }

      try {
        const docRef = doc(db, "userProfiles", user.email); // Use email as the document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageUrl(data.imageUrl); // Set the fetched image URL
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [user?.email]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(undefined);
      return;
    }

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string); // Set the preview to the file's data URL
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    if (!user?.email) {
      console.error("No email found for the authenticated user.");
      return;
    }

    setIsLoading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;
      setImageUrl(imageUrl);
      setUploadStatus("Upload successful!");

      const userDocRef = doc(db, "userProfiles", user.email); // Use email as the document ID
      await setDoc(userDocRef, {
        email: user.email,
        imageUrl,
        uploadedAt: new Date().toISOString(),
      });

      console.log("Image URL saved to Firestore!");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {t("updateProfilePicture")}
        </h2>

        <div className="mb-4">
          <img
            src={preview || imageUrl || "/user.png"}
            alt="Profile preview"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 mx-auto"
          />
        </div>

        <input
          type="file"
          onChange={handleFileSelect}
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col gap-3 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            {t("chooseImage")}
          </button>

          <button
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            {isLoading ? t("uploading") : t("uploadProfilePicture")}
          </button>
        </div>

        {uploadStatus && (
          <p
            className={`mb-4 font-medium ${
              uploadStatus.includes("failed")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {uploadStatus}
          </p>
        )}

        {/* <div className="">
          <h3 className="text-xl font-semibold text-gray-800">{user.email}</h3>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
