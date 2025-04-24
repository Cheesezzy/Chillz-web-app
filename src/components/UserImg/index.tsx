import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserImg = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!user?.email) return; // Ensure the user is authenticated

      try {
        const docRef = doc(db, "userProfiles", user.email); // Use email as the document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageUrl(data.imageUrl); // Set the fetched image URL
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [user?.email]);
  return (
    <div>
      <img
        className="h-10 w-10 rounded-full mr-2"
        src={imageUrl || "/user.png"}
        alt="User avatar"
      />
    </div>
  );
};
