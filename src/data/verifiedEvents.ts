export interface VerifiedEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
}

export const verifiedEvents: VerifiedEvent[] = [
  {
    id: 1,
    title: "Elegant Light Box Paper Cut Dioramas",
    location: "IAC Building",
    date: "16th - Apr - 2026",
    time: "8:00am - 5:00pm",
    image: "/event-img.jpeg"
  },
  {
    id: 2,
    title: "Digital Art Exhibition 2024",
    location: "Modern Art Gallery",
    date: "20th - May - 2024",
    time: "10:00am - 6:00pm",
    image: "/event-img.jpeg"
  },
  {
    id: 3,
    title: "Tech Innovation Summit",
    location: "Convention Center",
    date: "15th - Jun - 2024",
    time: "9:00am - 7:00pm",
    image: "/event-img.jpeg"
  },
  {
    id: 4,
    title: "Music Festival 2024",
    location: "Central Park",
    date: "25th - Jul - 2024",
    time: "12:00pm - 10:00pm",
    image: "/event-img.jpeg"
  },
  {
    id: 5,
    title: "Food & Wine Festival",
    location: "Downtown Square",
    date: "10th - Aug - 2024",
    time: "11:00am - 9:00pm",
    image: "/event-img.jpeg"
  }
]; 