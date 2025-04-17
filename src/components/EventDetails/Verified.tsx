// import { SetStateAction, useEffect, useState } from "react";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   DollarSign,
//   Users,
//   Share2,
//   Heart,
//   MessageCircle,
// } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import Header from "../Header";
// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   location: string;
//   category: string;
//   image?: string;
// }

// export default function Verified() {
//   const [interested, setInterested] = useState(false);
//   const [showTicketOptions, setShowTicketOptions] = useState(false);
//   const [ticketQuantity, setTicketQuantity] = useState(1);
//   const [selectedTicketType, setSelectedTicketType] = useState("general");
//   const { id } = useParams<{ id: string }>();
//   const [event, setEvent] = useState<Event | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const eventData = {
//     organizer: "Tech Innovators Alliance",
//     attendees: 0,
//     ticketTypes: [
//       {
//         id: "free",
//         name: "Free Admission",
//         price: 0,
//         description: "Limited access to main hall presentations",
//       },
//       {
//         id: "general",
//         name: "General Admission",
//         price: 99,
//         description: "Full access to all presentations and workshops",
//       },
//       {
//         id: "vip",
//         name: "VIP Pass",
//         price: 249,
//         description:
//           "Premium seating, exclusive networking event, and conference swag",
//       },
//     ],
//   };

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         const docRef = doc(db, "events", id!); // Fetch the event by ID
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setEvent({
//             id: docSnap.id,
//             title: data.title || "",
//             description: data.description || "",
//             date: data.date || "",
//             startTime: data.startTime || "",
//             endTime: data.endTime || "",
//             location: data.location || "",
//             category: data.category || "",
//             image: data.imageUrl || "/event-img.jpeg",
//           });
//         } else {
//           console.log("No such event!");
//         }
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   if (loading) {
//     return <p>Loading event details...</p>;
//   }

//   if (!event) {
//     return <p>Event not found.</p>;
//   }

//   const handleInterestToggle = () => {
//     setInterested(!interested);
//   };

//   const handleTicketSelect = (ticketType: SetStateAction<string>) => {
//     setSelectedTicketType(ticketType);
//   };

//   const handleShowTicketOptions = () => {
//     setShowTicketOptions(!showTicketOptions);
//   };

//   return (
//     <>
//       <Header />

//       <div className="max-w-4xl mx-auto p-6 bg-gray-50 mt-16">
//         {/* Hero Image */}
//         <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
//           <img
//             src={event.image}
//             alt={event.title}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Event Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {event.title}
//           </h1>
//           <div className="flex flex-wrap items-center text-gray-600 gap-y-2">
//             <div className="flex items-center mr-6">
//               <Calendar className="w-5 h-5 mr-2" />
//               <span>{event.date}</span>
//             </div>
//             <div className="flex items-center mr-6">
//               <Clock className="w-5 h-5 mr-2" />
//               <span>
//                 {event.startTime} - {event.endTime}
//               </span>
//             </div>
//             <div className="flex items-center">
//               <MapPin className="w-5 h-5 mr-2" />
//               <span>{event.location}</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <button
//             onClick={handleShowTicketOptions}
//             className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium flex items-center justify-center hover:bg-red-700 transition-colors"
//           >
//             <DollarSign className="w-5 h-5 mr-2" />
//             Get Tickets
//           </button>

//           <button
//             onClick={handleInterestToggle}
//             className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
//               interested
//                 ? "bg-pink-100 text-pink-600 border border-pink-200"
//                 : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
//             }`}
//           >
//             <Heart
//               className={`w-5 h-5 mr-2 ${interested ? "fill-pink-500" : ""}`}
//             />
//             {interested ? "Interested" : "I'm Interested"}
//           </button>

//           <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200">
//             <Share2 className="w-5 h-5 mr-2" />
//             Share
//           </button>
//         </div>

//         {/* Ticket Selection (conditionally rendered) */}
//         {showTicketOptions && (
//           <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
//             <h2 className="text-xl font-semibold mb-4">Select Tickets</h2>
//             <div className="space-y-4">
//               {eventData.ticketTypes.map((ticket) => (
//                 <div
//                   key={ticket.id}
//                   onClick={() => handleTicketSelect(ticket.id)}
//                   className={`p-4 border rounded-lg cursor-pointer ${
//                     selectedTicketType === ticket.id
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <h3 className="font-medium">{ticket.name}</h3>
//                       <p className="text-sm text-gray-600">
//                         {ticket.description}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold text-lg">
//                         {ticket.price === 0 ? "Free" : `$${ticket.price}`}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-6 flex flex-col sm:flex-row gap-4">
//               <div className="flex items-center border rounded-md overflow-hidden">
//                 <button
//                   onClick={() =>
//                     setTicketQuantity(Math.max(1, ticketQuantity - 1))
//                   }
//                   className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
//                 >
//                   -
//                 </button>
//                 <div className="px-4 py-2">{ticketQuantity}</div>
//                 <button
//                   onClick={() => setTicketQuantity(ticketQuantity + 1)}
//                   className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
//                 >
//                   +
//                 </button>
//               </div>
//               <button className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
//                 {eventData.ticketTypes.find((t) => t.id === selectedTicketType)
//                   ?.price === 0
//                   ? "Register Now"
//                   : `Complete Purchase ($${
//                       (eventData.ticketTypes.find(
//                         (t) => t.id === selectedTicketType
//                       )?.price || 0) * ticketQuantity
//                     })`}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Event Details Tabs */}
//         <div className="mb-8">
//           {/* <div className="border-b border-gray-200">
//           <nav className="flex -mb-px">
//             <a
//               href="#about"
//               className="py-4 px-6 border-b-2 border-red-500 font-medium text-red-600"
//             >
//               About
//             </a>
//             <a
//               href="#location"
//               className="py-4 px-6 text-gray-500 hover:text-gray-700"
//             >
//               Location
//             </a>
//           </nav>
//         </div> */}

//           <div className="py-6">
//             <div id="about">
//               <h2 className="text-xl font-semibold mb-4">About This Event</h2>
//               <p className="text-gray-700 mb-6">{event.description}</p>

//               <div className="flex items-center text-gray-600 mb-6">
//                 <Users className="w-5 h-5 mr-2" />
//                 <span>{eventData.attendees} people going</span>
//               </div>

//               <div className="mb-6">
//                 <h3 className="font-semibold mb-2">Organized By</h3>
//                 <div className="flex items-center">
//                   <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
//                   <div>
//                     <p className="font-medium">{eventData.organizer}</p>
//                     <p className="text-sm text-gray-500">Event Organizer</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Discussion Section */}
//         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
//           <h2 className="text-xl font-semibold mb-4 flex items-center">
//             <MessageCircle className="w-5 h-5 mr-2" />
//             Discussion
//           </h2>

//           <div className="mb-4">
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//               placeholder="Ask a question about this event..."
//               rows={3}
//             ></textarea>
//           </div>

//           <div className="flex justify-end">
//             <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//               Post
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
