/**
 * Petal configuration for the Flower Exercise
 * from "What Color Is Your Parachute?" by Richard N. Bolles
 *
 * Each petal represents one dimension of your ideal job/career.
 */

const PETALS = [
  {
    id: "people",
    name: "People",
    subtitle: "My Preferred Types of People to Work With",
    color: "#FF6B6B",
    lightColor: "#FFE0E0",
    icon: "👥",
    itemCount: 10,
    minItems: 5,
    maxItems: 12,
    type: "ranking",
    description:
      "Identify the types of people you most enjoy working with. Think about personality traits, work styles, values, and characteristics of your ideal colleagues.",
    instructions: [
      "Think about times you've really enjoyed working with others. What were those people like?",
      "Consider Holland Code types: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.",
      "List traits like: creative thinkers, detail-oriented, collaborative, independent, supportive, ambitious, etc.",
      "You'll compare each pair to find your top priorities.",
    ],
    exampleItems: [
      "Creative & innovative thinkers",
      "Detail-oriented & precise people",
      "Supportive & encouraging team members",
      "Independent self-starters",
      "Collaborative team players",
      "Ambitious go-getters",
      "Calm & patient individuals",
      "Intellectually curious learners",
      "Organized & structured planners",
      "Empathetic & compassionate people",
    ],
  },
  {
    id: "conditions",
    name: "Working Conditions",
    subtitle: "My Preferred Working Conditions",
    color: "#4ECDC4",
    lightColor: "#D4F5F2",
    icon: "🏢",
    itemCount: 10,
    minItems: 5,
    maxItems: 12,
    type: "ranking",
    description:
      "Define the physical and organizational conditions you thrive in. Consider environment, culture, flexibility, pace, and structure.",
    instructions: [
      "Think about your best and worst work experiences. What made the environment great or terrible?",
      "Consider: indoor vs. outdoor, quiet vs. bustling, remote vs. on-site, flexible vs. structured hours.",
      "Think about organizational culture: startup vs. established, flat vs. hierarchical, casual vs. formal.",
      "Include things like commute length, dress code, work-life balance, and physical workspace.",
    ],
    exampleItems: [
      "Flexible work hours",
      "Remote or hybrid work option",
      "Quiet, private workspace",
      "Collaborative open environment",
      "Small team (under 15 people)",
      "Clear structure & processes",
      "Casual dress code",
      "Short commute (under 20 min)",
      "Good work-life balance",
      "Access to nature / outdoors",
    ],
  },
  {
    id: "skills",
    name: "Transferable Skills",
    subtitle: "My Favorite Transferable Skills",
    color: "#45B7D1",
    lightColor: "#D0EFFA",
    icon: "⚡",
    itemCount: 8,
    minItems: 5,
    maxItems: 10,
    type: "ranking",
    description:
      "Identify your favorite transferable (functional) skills — things you do well AND enjoy doing. These are skills that can be used across many different jobs.",
    instructions: [
      "Think about skills in three categories: People skills, Data/Information skills, and Things/Physical skills.",
      "Focus on skills you ENJOY using, not just ones you're good at.",
      "People skills: mentoring, negotiating, persuading, teaching, counseling, supervising.",
      "Data skills: analyzing, researching, organizing, computing, synthesizing, writing.",
      "Things skills: building, repairing, operating, designing, precision work.",
    ],
    exampleItems: [
      "Analyzing & solving problems",
      "Teaching & mentoring others",
      "Writing & communicating clearly",
      "Organizing information & systems",
      "Leading & managing projects",
      "Creating & designing things",
      "Researching & investigating",
      "Building relationships & networking",
    ],
  },
  {
    id: "purpose",
    name: "Purpose & Mission",
    subtitle: "My Sense of Purpose or Mission in Life",
    color: "#96CEB4",
    lightColor: "#DFF2E8",
    icon: "🌟",
    itemCount: 6,
    minItems: 3,
    maxItems: 8,
    type: "ranking",
    description:
      "Reflect on what gives your life and work meaning. What causes, values, or goals drive you? What impact do you want to make?",
    instructions: [
      "Think about: What would you do if money were no object?",
      "What problems in the world do you most want to help solve?",
      "What values are non-negotiable for you in your work?",
      "Write short statements about what matters most to you.",
    ],
    exampleItems: [
      "Helping others overcome challenges",
      "Creating beauty or art in the world",
      "Advancing knowledge & understanding",
      "Protecting the environment",
      "Building a better future for families",
      "Empowering people through education",
    ],
  },
  {
    id: "knowledges",
    name: "Knowledges",
    subtitle: "My Favorite Fields of Knowledge",
    color: "#FFEAA7",
    lightColor: "#FFF8DC",
    icon: "📚",
    itemCount: 10,
    minItems: 5,
    maxItems: 12,
    type: "ranking",
    description:
      "List your favorite subjects, fields of expertise, and areas of knowledge. What topics fascinate you? What do you love learning about?",
    instructions: [
      "Think about: What books, podcasts, or articles do you gravitate toward?",
      "What subjects did you love in school? What would you study just for fun?",
      "Include professional knowledge (e.g., accounting, engineering) and personal interests (e.g., cooking, astronomy).",
      "Consider both breadth (fields you enjoy) and depth (areas of expertise).",
    ],
    exampleItems: [
      "Technology & software development",
      "Psychology & human behavior",
      "Business & entrepreneurship",
      "Design & visual arts",
      "Health & wellness",
      "History & culture",
      "Science & nature",
      "Music & performing arts",
      "Finance & investing",
      "Education & learning theory",
    ],
  },
  {
    id: "money",
    name: "Money & Salary",
    subtitle: "My Preferred Salary & Level of Responsibility",
    color: "#DDA0DD",
    lightColor: "#F3E0F3",
    icon: "💰",
    itemCount: 0,
    minItems: 0,
    maxItems: 0,
    type: "input",
    description:
      "Determine your financial needs and desires. Think about what you need to survive, what you'd like to earn, and what level of responsibility you prefer.",
    instructions: [
      "Be honest about your financial needs versus wants.",
      "Consider your monthly expenses and what you need to cover them.",
      "Think about the lifestyle you want and what salary supports it.",
      "Consider the trade-off between salary and other factors (flexibility, meaning, etc.).",
    ],
    fields: [
      {
        id: "minimumSalary",
        label: "Minimum Salary Needed",
        type: "text",
        placeholder: "e.g., $40,000/year",
        helpText: "The minimum amount you need to cover basic living expenses",
      },
      {
        id: "desiredSalary",
        label: "Desired Salary",
        type: "text",
        placeholder: "e.g., $75,000/year",
        helpText: "The salary that would let you live the lifestyle you want",
      },
      {
        id: "responsibility",
        label: "Preferred Level of Responsibility",
        type: "select",
        options: [
          "Individual contributor — focus on my own work",
          "Team lead — guide a small group",
          "Manager — oversee people and projects",
          "Director — set strategy for a department",
          "Executive — shape the entire organization",
          "Entrepreneur — run my own business",
        ],
        helpText: "What level of organizational responsibility appeals to you?",
      },
      {
        id: "benefits",
        label: "Most Important Benefits",
        type: "text",
        placeholder: "e.g., health insurance, retirement plan, education budget",
        helpText: "Beyond salary, what benefits matter most?",
      },
      {
        id: "tradeoffs",
        label: "Would You Accept Less Pay For...",
        type: "text",
        placeholder: "e.g., more flexibility, meaningful work, shorter commute",
        helpText: "What non-monetary factors would you trade salary for?",
      },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    subtitle: "My Preferred Place(s) to Live",
    color: "#74B9FF",
    lightColor: "#D6ECFF",
    icon: "🌍",
    itemCount: 10,
    minItems: 5,
    maxItems: 12,
    type: "ranking",
    description:
      "Define the factors that matter most about where you live and work. Think about climate, city size, culture, and proximity to people you care about.",
    instructions: [
      "Think about places you've lived or visited that felt 'right'. What made them special?",
      "Consider practical factors: cost of living, job market, commute, safety.",
      "Consider personal factors: proximity to family/friends, climate, culture, outdoor activities.",
      "You can list specific places OR general characteristics of your ideal location.",
    ],
    exampleItems: [
      "Warm climate / mild winters",
      "Affordable cost of living",
      "Close to family & friends",
      "Access to cultural activities",
      "Good public transportation",
      "Near mountains or nature",
      "Vibrant food & restaurant scene",
      "Strong job market in my field",
      "Safe & walkable neighborhoods",
      "Diverse & inclusive community",
    ],
  },
];

export default PETALS;

/**
 * Get a petal by ID
 */
export function getPetalById(id) {
  return PETALS.find((p) => p.id === id);
}

/**
 * Get all ranking-type petals (those that use pairwise comparison)
 */
export function getRankingPetals() {
  return PETALS.filter((p) => p.type === "ranking");
}

/**
 * Get the total number of comparisons for n items
 */
export function getComparisonCount(n) {
  return (n * (n - 1)) / 2;
}
