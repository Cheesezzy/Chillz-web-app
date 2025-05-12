import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const submitContactForm = async (formData: Omit<ContactFormData, 'createdAt'>) => {
  try {
    const contactData: ContactFormData = {
      ...formData,
      createdAt: new Date().toISOString()
    };

    // Add the contact form submission to Firestore
    await addDoc(collection(db, 'contactSubmissions'), contactData);
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}; 