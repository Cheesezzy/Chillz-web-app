import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

interface OrganizationProfile {
  id: string; // Firestore document ID
  organizationName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  logo: string | null;
  userId: string; // The user who created the organization profile
}

const useFetchOrganizationProfiles = (userId: string | null) => {
  const [profiles, setProfiles] = useState<OrganizationProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure the dependency array remains stable
    if (!userId) {
      setProfiles([]); // If no userId, return an empty array
      setLoading(false);
      return;
    }

    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const profilesQuery = query(
          collection(db, "organizationProfile"),
          where("userId", "==", userId) // Filter by userId
        );

        const querySnapshot = await getDocs(profilesQuery);
        const fetchedProfiles: OrganizationProfile[] = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data(),
          })
        ) as OrganizationProfile[];

        setProfiles(fetchedProfiles);
      } catch (err) {
        console.error("Error fetching organization profiles:", err);
        setError("Failed to fetch organization profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [userId]); // Ensure userId is always included in the dependency array

  return { profiles, loading, error };
};

export default useFetchOrganizationProfiles;
