export type EventCategory =
  | "entertainment"
  | "sports"
  | "business"
  | "food"
  | "education"
  | "social"
  | "cultural"
  | "techInnovation"
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
    "techMeetup",
    "careerFair"
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
  techInnovation: [
    "hackathon",
    "developerSummit",
    "StartupDemo"
  ],
  other: [
    "charityEvent",
    "religiousEvent",
    "virtualEvent"
  ]
};
