import { useState } from "react";
import Header from "../../components/Header";
import ContactForm from "../../components/ContactForm/ContactForm";

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof helpContent>("getting-started");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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

To create your first event on Chillz, follow these steps:

1. Log in to your account
2. Click the "Create Event" button
3. Fill in your organization details:
   - Organization name
   - Description
   - Logo
   - Contact information
4. Fill in the event details:
   - Event title
   - Description
   - Category (Entertainment, Sports, Business, etc.)
   - Date and time
   - Location
   - Maximum attendees
5. Upload a cover image
6. Click "Create Event"

Your event will be visible to potential attendees based on the category you selected.
          `,
        },
        {
          id: "gs-2",
          title: "Setting up your organization profile",
          content: `
# Setting up your organization profile

A complete organization profile helps build trust with attendees:

1. Click "Create Event" to start the onboarding process
2. Complete the onboarding questions
3. Add your organization details:
   - Name
   - Logo
   - Contact information
   - Description
4. Add social media links
5. Save your profile

Your organization profile will be visible on all your event pages.
          `,
        },
        {
          id: "gs-3",
          title: "Navigating the dashboard",
          content: `
# Navigating the dashboard

Your dashboard is your control center:

- **Events**: View and manage all your events
- **Interested Events**: See events you're interested in
- **Account Settings**: Manage your profile and preferences
- **Organization Profile**: Update your organization details

Use the sidebar menu to navigate between sections.
          `,
        },
      ],
    },
    "event-categories": {
      title: "Event Categories",
      articles: [
        {
          id: "cat-1",
          title: "Understanding event categories",
          content: `
# Understanding event categories

Chillz offers various event categories to help organize your events:

1. **Entertainment**
   - Musical concerts
   - Karaoke
   - Comedy shows
   - Film screenings
   - Theater performances

2. **Sports & Fitness**
   - Sports events
   - Gym sessions
   - Dance classes
   - Yoga sessions
   - Fitness classes

3. **Business**
   - Conferences
   - Networking events
   - Tech meetups
   - Career fairs

4. **Food & Dining**
   - Cooking classes
   - Food festivals
   - Restaurant events

5. **Education**
   - Workshops
   - Educational seminars
   - Book clubs

6. **Social**
   - Nightlife events
   - Gaming sessions
   - Hangouts
   - Birthday celebrations

7. **Cultural**
   - Cultural festivals
   - Fashion shows
   - Art exhibitions
   - Photography events

8. **Tech & Innovation**
   - Hackathons
   - Developer summits
   - Startup demos

9. **Other**
   - Charity events
   - Religious events
   - Virtual events

Choose the category that best matches your event's purpose.
          `,
        },
      ],
    },
    "account-management": {
      title: "Account Management",
      articles: [
        {
          id: "acc-1",
          title: "Updating your email",
          content: `
# Updating your email

To update your email address:

1. Go to Account Settings
2. Click "Update Email"
3. Enter your current email and password
4. Enter your new email address
5. Click "Update Email"
6. Verify your new email address

You'll receive a verification email at your new address.
          `,
        },
        {
          id: "acc-2",
          title: "Managing your events",
          content: `
# Managing your events

To manage your events:

1. Go to your dashboard
2. Find the event you want to manage
3. Click on the event to view details
4. You can:
   - Edit event details
   - Update maximum attendees
   - Change event status
   - View interested attendees

Remember to keep your event information up to date.
          `,
        },
      ],
    },
    "troubleshooting": {
      title: "Troubleshooting",
      articles: [
        {
          id: "trbl-1",
          title: "Common issues and solutions",
          content: `
# Common issues and solutions

If you encounter any issues:

1. **Can't create an event?**
   - Ensure you're logged in
   - Complete your organization profile
   - Check all required fields are filled

2. **Email verification issues?**
   - Check your spam folder
   - Request a new verification email
   - Ensure you're using the correct email

3. **Event not showing up?**
   - Verify the event is published
   - Check category selection
   - Ensure all required fields are completed

4. **Profile update problems?**
   - Clear your browser cache
   - Try logging out and back in
   - Check your internet connection

Contact support if issues persist.
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
      <header className="bg-[#1A535C] text-white shadow-md mt-20">
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
                <button 
                  onClick={() => setIsContactFormOpen(true)}
                  className="mt-3 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700 transition-colors"
                >
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
      <footer className="bg-black text-white fixed bottom-0 left-0 w-full">
        <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-bold">Chillz Help Center</h2>
              <p className="mt-1 text-sm text-gray-300">
                © 2025 Chillz. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {isContactFormOpen && (
        <ContactForm onClose={() => setIsContactFormOpen(false)} />
      )}
    </div>
  );
};

export default HelpCenter;
