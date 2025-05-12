export type EventCategory =
  | "entertainment"
  | "sports"
  | "business"
  | "food"
  | "education"
  | "social"
  | "cultural"
  | "tours"
  | "other";

export const categoryGroups: Record<EventCategory, string[]> = {
  entertainment: [
    "musicalConcert",
    "karaoke",
    "comedyShow",
    "filmScreening",
    "theaterPerformance",
    "liveMusic",
    "artExhibition",
    "filmFestival"
  ],
  sports: [
    "sports",
    "gym",
    "danceClass",
    "yogaSession",
    "fitnessClass"  
  ],
  business: [
    "conference",
    "networkingEvent",
    "startupDemo",
    "careerFair",
    "businessSummit"
  ],
  food: [
    "cookingClass",
    "foodFestival",
    "restaurant"
  ],
  education: [
    "workshop",
    "educationalSeminar",
    "bookClub"
  ],
  social: [
    "nightLifeAndParty",
    "gaming",
    "hangout",
    "birthdayCelebration",
    "culturalFestival",
    "fundraiser",
  ],
  cultural: [
    "culturalFestival",
    "fashionShow",
    "art",
    "photography"
  ],
  tours: [
    "groupTour",
    "travel",
    "adventure"
  ],
  other: [
    "charityEvent",
    "religiousEvent",
    "virtualEvent",
    "hackathon",
    "developerSummit",
    "fundraiser",
    "religiousEvent"
  ]
};
