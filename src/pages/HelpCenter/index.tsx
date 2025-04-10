import React, { useState } from "react";
import Header from "../../components/Header";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof helpContent>("getting-started");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  // Help content organized by categories
  const helpContent = {
    "getting-started": {
      title: "Getting Started",
      articles: [
        {
          id: "gs-1",
          title: "Creating your first event",
          content: `
# Creating your first event

To create your first event, follow these simple steps:

1. Log in to your account and navigate to your dashboard
2. Click the "Create Event" button in the top-right corner
3. Fill in the required event details (name, date, location, description)
4. Upload a cover image for your event (optional but recommended)
5. Set ticket types and pricing
6. Configure event visibility settings
7. Click "Publish" to make your event live

Your event will now be visible to attendees according to your visibility settings.
          `,
        },
        {
          id: "gs-2",
          title: "Setting up your organizer profile",
          content: `
# Setting up your organizer profile

A complete organizer profile helps build trust with attendees. Here's how to set it up:

1. Go to your account settings
2. Click on "Organizer Profile"
3. Add your organization name, logo, and contact information
4. Write a brief description about your organization
5. Add links to your website and social media accounts
6. Click "Save Changes"

Your profile will now be visible on all your event pages.
          `,
        },
        {
          id: "gs-3",
          title: "Navigating the dashboard",
          content: `
# Navigating the dashboard

Your dashboard is your control center. Here's what you'll find:

- **Event Feeds**: See all your past, active, and draft events
- **Tickets**: Track ticket sales, page views, and attendee demographics
- **Attendees**: Manage your attendee lists and communication
- **Finance**: Monitor revenue, payouts, and transaction history
- **Settings**: Configure your account and organizer profile

Use the sidebar menu to navigate between these sections.
          `,
        },
      ],
    },
    tickets: {
      title: "Tickets & Registration",
      articles: [
        {
          id: "tix-1",
          title: "Creating ticket types",
          content: `
# Creating ticket types

Different ticket types help you cater to various attendee needs:

1. From your event page, go to "Tickets & Registration"
2. Click "Add Ticket Type"
3. Choose from preset options (General Admission, VIP, Early Bird) or create a custom type
4. Set the price, quantity available, and sales period
5. Add a description explaining what's included with this ticket type
6. Configure any special access permissions
7. Save your changes

You can create unlimited ticket types for each event.
          `,
        },
        {
          id: "tix-2",
          title: "Setting up discount codes",
          content: `
# Setting up discount codes

Discount codes can help boost sales and reward loyal attendees:

1. Go to your event's "Tickets & Registration" section
2. Click on "Discount Codes"
3. Select "Create New Code"
4. Enter a code name (e.g., EARLYBIRD20)
5. Choose discount type (percentage or fixed amount)
6. Set discount value
7. Configure usage limits and validity period
8. Select which ticket types the code applies to
9. Click "Create"

Share your discount codes through your marketing channels.
          `,
        },
        {
          id: "tix-3",
          title: "Managing attendee check-in",
          content: `
# Managing attendee check-in

Efficiently manage check-in on event day:

1. Download our mobile check-in app
2. Log in with your organizer credentials
3. Select the event you're managing
4. Use the scan feature to quickly check in attendees by QR code
5. Or search by name/email for manual check-in
6. View real-time check-in statistics
7. Handle special cases like ticket transfers or on-site purchases

The check-in app works offline and will sync when connection is restored.
          `,
        },
      ],
    },
    promotion: {
      title: "Promotion & Marketing",
      articles: [
        {
          id: "promo-1",
          title: "Sharing your event on social media",
          content: `
# Sharing your event on social media

Maximize your event's reach with social sharing:

1. From your event dashboard, go to "Promotion"
2. Find pre-formatted social media posts for various platforms
3. Customize the message if desired
4. Click "Share Now" to post directly to connected accounts
5. Or copy the message and link to post manually
6. Use the "Generate Image" feature to create platform-optimized graphics
7. Schedule posts for optimal times using the calendar tool

Remember to post updates as your event approaches.
          `,
        },
        {
          id: "promo-2",
          title: "Creating and sending email campaigns",
          content: `
# Creating and sending email campaigns

Keep potential attendees informed with email campaigns:

1. Navigate to "Marketing" > "Email Campaigns"
2. Click "Create New Campaign"
3. Select a template or design your own
4. Add your event details, images, and compelling copy
5. Preview how it looks on desktop and mobile
6. Select your recipient list
7. Schedule the delivery time or send immediately
8. Track open rates and click-through statistics

Follow up with reminder emails as your event date approaches.
          `,
        },
      ],
    },
    troubleshooting: {
      title: "Troubleshooting",
      articles: [
        {
          id: "trbl-1",
          title: "Payment processing issues",
          content: `
# Payment processing issues

If you encounter payment problems:

1. Check your payment account connection in "Settings" > "Payments"
2. Verify your bank account information is current
3. Ensure you've completed all required verification steps
4. Check for any warning messages in your dashboard
5. Review the specific error messages reported by attendees
6. Test the purchase flow yourself with a small test payment
7. Contact support if issues persist

Most payment issues can be resolved by reconnecting your payment processor.
          `,
        },
        {
          id: "trbl-2",
          title: "Attendees cant access tickets",
          content: `
# Attendees can't access tickets

If attendees report ticket access problems:

1. Verify their purchase in your "Attendees" list
2. Check if their confirmation email was delivered
3. Ask them to check spam/junk folders
4. Resend their tickets from the attendee management page
5. Verify they're using the same email address they purchased with
6. Check if they've accidentally created multiple accounts
7. Manually add them to the check-in list if necessary

You can always issue replacement tickets if needed.
          `,
        },
      ],
    },
  };

  // Filter articles based on search query
  const filteredArticles = () => {
    if (!searchQuery) return null;

    const results: {
      categoryId: string;
      categoryTitle: string;
      articleId: string;
      articleTitle: string;
    }[] = [];

    Object.entries(helpContent).forEach(([categoryId, category]) => {
      category.articles.forEach((article) => {
        if (
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          results.push({
            categoryId,
            categoryTitle: category.title,
            articleId: article.id,
            articleTitle: article.title,
          });
        }
      });
    });

    return results;
  };

  // Toggle article expansion
  const toggleArticle = (articleId: string) => {
    if (expandedArticle === articleId) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(articleId);
    }
  };

  // Render article content with simple markdown parsing
  const renderContent = (content: string) => {
    // Very simple markdown rendering
    const formattedContent = content
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^\d\. (.*$)/gm, "<li>$1</li>")
      .replace(/^- (.*$)/gm, "<li>$1</li>");

    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  const searchResults = filteredArticles();
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />
      <header className="bg-customCyan text-white shadow-md mt-20">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Help Center</h1>
          <p className="mt-1 text-lg">
            Find answers to all your questions about Chillz
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help articles..."
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-customRed focus:border-customeRed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute right-3 top-3 p-1 bg-red-500 text-white rounded-md px-4 py-1"
            onClick={() => setSearchQuery("")}
          >
            {searchQuery ? "Clear" : "Search"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 pb-16">
        {searchQuery && searchResults ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            {searchResults.length === 0 ? (
              <p>No results found for "{searchQuery}"</p>
            ) : (
              <ul className="space-y-4">
                {searchResults.map((result) => (
                  <li key={result.articleId} className="border-b pb-4">
                    <a
                      href="#"
                      className="text-black-600 hover:text-black-800 font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchQuery("");
                        setActiveCategory(
                          result.categoryId as keyof typeof helpContent
                        );
                        setExpandedArticle(result.articleId);
                      }}
                    >
                      {result.articleTitle}
                    </a>
                    <p className="text-sm text-gray-500">
                      Category: {result.categoryTitle}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul>
                  {Object.entries(helpContent).map(([categoryId, category]) => (
                    <li key={categoryId}>
                      <button
                        className={`w-full text-left px-4 py-3 border-b ${
                          activeCategory === categoryId
                            ? "bg-red-50 text-red-700 font-medium"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          setActiveCategory(
                            categoryId as keyof typeof helpContent
                          )
                        }
                      >
                        {category.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-100">
                <h3 className="font-medium text-black-800">Need more help?</h3>
                <p className="text-sm text-black-700 mt-2">
                  Contact our support team for personalized assistance.
                </p>
                <button className="mt-3 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Articles */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    {helpContent[activeCategory].title}
                  </h2>
                  <ul className="space-y-4">
                    {helpContent[activeCategory].articles.map((article) => (
                      <li key={article.id} className="border-b pb-4">
                        <button
                          className="w-full text-left"
                          onClick={() => toggleArticle(article.id)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-black-600">
                              {article.title}
                            </h3>
                            <span className="text-gray-400">
                              {expandedArticle === article.id ? "−" : "+"}
                            </span>
                          </div>
                        </button>
                        {expandedArticle === article.id && (
                          <div className="mt-4 prose max-w-none">
                            {renderContent(article.content)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-customDark text-white fixed bottom-0 left-0 w-full">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-bold">Chillz Help Center</h2>
              <p className="mt-1 text-sm text-gray-300">
                © 2025 Chillz. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
