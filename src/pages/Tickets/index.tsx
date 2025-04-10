import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Type definitions
interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  maxPerOrder: number;
  saleEnds: string;
  features: string[];
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  organizer: string;
  ticketTypes: TicketType[];
}

const TicketPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketCounts, setTicketCounts] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Fetch event data
  useEffect(() => {
    // In a real app, you would fetch from your API
    const fetchEventData = async () => {
      try {
        setLoading(true);

        // Mock data - replace with actual API call
        setTimeout(() => {
          const mockEvent: Event = {
            id: "evt-001",
            name: "Annual Tech Conference 2025",
            date: "May 15, 2025",
            time: "9:00 AM - 6:00 PM",
            location: "Tech Center, San Francisco",
            imageUrl: "/api/placeholder/800/300",
            organizer: "TechEvents Inc.",
            ticketTypes: [
              {
                id: "tkt-001",
                name: "Early Bird",
                price: 99.0,
                description: "Limited early bird tickets at a special rate",
                available: 50,
                maxPerOrder: 2,
                saleEnds: "April 15, 2025",
                features: [
                  "Full conference access",
                  "Lunch included",
                  "Digital swag bag",
                ],
              },
              {
                id: "tkt-002",
                name: "Standard",
                price: 149.0,
                description: "Regular conference admission",
                available: 200,
                maxPerOrder: 5,
                saleEnds: "May 10, 2025",
                features: [
                  "Full conference access",
                  "Lunch included",
                  "Digital swag bag",
                ],
              },
              {
                id: "tkt-003",
                name: "VIP",
                price: 299.0,
                description: "Premium experience with exclusive perks",
                available: 25,
                maxPerOrder: 2,
                saleEnds: "May 10, 2025",
                features: [
                  "Full conference access",
                  "Premium seating",
                  "Exclusive networking event",
                  "Speaker meet & greet",
                  "Physical swag bag",
                  "Lunch and dinner included",
                ],
              },
            ],
          };

          setEvent(mockEvent);

          // Initialize ticket counts
          const initialCounts: Record<string, number> = {};
          mockEvent.ticketTypes.forEach((ticket) => {
            initialCounts[ticket.id] = 0;
          });
          setTicketCounts(initialCounts);

          setLoading(false);
        }, 800); // Simulate loading delay
      } catch (err) {
        setError("Failed to load event information. Please try again later.");
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  // Handle ticket quantity changes
  const handleTicketChange = (ticketId: string, newCount: number) => {
    const ticket = event?.ticketTypes.find((t) => t.id === ticketId);

    if (!ticket) return;

    // Validate against available tickets and max per order
    if (newCount < 0) newCount = 0;
    if (newCount > ticket.available) newCount = ticket.available;
    if (newCount > ticket.maxPerOrder) newCount = ticket.maxPerOrder;

    setTicketCounts((prev) => ({
      ...prev,
      [ticketId]: newCount,
    }));
  };

  // Apply promo code
  const applyPromoCode = () => {
    // In a real app, validate against API
    if (promoCode.toUpperCase() === "TECH25") {
      setPromoApplied(true);
      setPromoDiscount(0.25); // 25% off
    } else if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
      setPromoDiscount(0.1); // 10% off
    } else {
      alert("Invalid promo code");
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    if (!event) return 0;

    return event.ticketTypes.reduce((total, ticket) => {
      return total + ticket.price * (ticketCounts[ticket.id] || 0);
    }, 0);
  };

  // Calculate total with discount
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return promoApplied ? subtotal * (1 - promoDiscount) : subtotal;
  };

  // Check if any tickets are selected
  const hasTickets = () => {
    return Object.values(ticketCounts).some((count) => count > 0);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-gray-600">{error || "Event not found"}</p>
          <button
            className="mt-4 px-4 py-2 bg-customCyan text-white rounded hover:bg-customCyan transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Event Header */}
      <div className="w-full bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {event.name}
              </h1>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-4">{event.date}</span>
                <span className="mr-4">•</span>
                <span>{event.time}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                <span>{event.location}</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-gray-500">Organized by </span>
                <span className="font-medium text-blue-600">
                  {event.organizer}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="h-24 w-full object-cover rounded md:h-32 md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Ticket Selection Column */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Select Tickets
            </h2>

            {/* Ticket Types */}
            <div className="space-y-4">
              {event.ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className="sm:flex sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {ticket.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {ticket.description}
                        </p>
                        <p className="mt-2 text-lg font-medium text-gray-900">
                          {formatCurrency(ticket.price)}
                        </p>

                        <div className="mt-2 text-sm text-gray-500">
                          <p>
                            {ticket.available} remaining • Max{" "}
                            {ticket.maxPerOrder} per order
                          </p>
                          <p>Sale ends on {ticket.saleEnds}</p>
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            onClick={() => {
                              const ticketFeaturesElement =
                                document.getElementById(
                                  `ticket-features-${ticket.id}`
                                );
                              if (ticketFeaturesElement) {
                                ticketFeaturesElement.classList.toggle(
                                  "hidden"
                                );
                              }
                            }}
                          >
                            Show details
                          </button>
                          <div
                            id={`ticket-features-${ticket.id}`}
                            className="mt-2 hidden"
                          >
                            <h4 className="text-sm font-medium text-gray-700">
                              What's included:
                            </h4>
                            <ul className="mt-1 list-disc pl-5 text-sm text-gray-500">
                              {ticket.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              handleTicketChange(
                                ticket.id,
                                ticketCounts[ticket.id] - 1
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <span className="px-4 py-2 text-gray-700">
                            {ticketCounts[ticket.id] || 0}
                          </span>
                          <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700"
                            onClick={() =>
                              handleTicketChange(
                                ticket.id,
                                ticketCounts[ticket.id] + 1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Have a promo code?
              </h3>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={applyPromoCode}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="mt-2 text-sm text-green-600">
                  Promo code applied: {(promoDiscount * 100).toFixed(0)}%
                  discount
                </p>
              )}
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {hasTickets() ? (
                  <>
                    <div className="space-y-4">
                      {event.ticketTypes.map((ticket) => {
                        const quantity = ticketCounts[ticket.id] || 0;
                        if (quantity === 0) return null;

                        return (
                          <div key={ticket.id} className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {ticket.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                x{quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatCurrency(ticket.price * quantity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(calculateSubtotal())}
                        </p>
                      </div>

                      {promoApplied && (
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-gray-600">
                            Discount ({(promoDiscount * 100).toFixed(0)}%)
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            -
                            {formatCurrency(
                              calculateSubtotal() * promoDiscount
                            )}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between mt-4">
                        <p className="text-base font-medium text-gray-900">
                          Total
                        </p>
                        <p className="text-base font-medium text-gray-900">
                          {formatCurrency(calculateTotal())}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">Select tickets to continue</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                Important Information
              </h3>
              <ul className="mt-2 text-sm text-gray-500 space-y-2">
                <li>All sales are final and non-refundable</li>
                <li>
                  Tickets can be transferred up to 48 hours before the event
                </li>
                <li>Valid ID may be required at check-in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
