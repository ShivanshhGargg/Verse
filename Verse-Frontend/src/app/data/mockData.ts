export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string;
  coverImage?: string;
  bio: string;
  interests: string[];
  location: string;
  stats: { likes: number; matches: number; posts: number };
  verified?: boolean;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked?: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  available: boolean;
  participants: number;
  category: string;
}

export const currentUser: User = {
  id: "me",
  name: "Alex Rivera",
  age: 23,
  avatar: "https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?w=200&h=200&fit=crop&auto=format",
  coverImage: "https://images.unsplash.com/photo-1771331199573-67602978b41f?w=800&h=400&fit=crop&auto=format",
  bio: "📍 NYC • Creative soul, coffee addict ☕ • Making art and connections one day at a time 🎨",
  interests: ["Art", "Music", "Travel", "Coffee", "Photography"],
  location: "New York, NY",
  stats: { likes: 1247, matches: 38, posts: 62 },
  verified: true,
};

export const discoverUsers: User[] = [
  {
    id: "u1",
    name: "Maya Chen",
    age: 22,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&auto=format",
    bio: "Art student + part-time dreamer. Love rooftop conversations and midnight ramen 🍜",
    interests: ["Art", "Anime", "Cooking", "Hiking"],
    location: "Brooklyn, NY",
    stats: { likes: 892, matches: 24, posts: 41 },
    verified: false,
  },
  {
    id: "u2",
    name: "Jordan Lee",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=600&h=800&fit=crop&auto=format",
    bio: "Music producer by night, barista by day. Always down for a good vinyl session 🎵",
    interests: ["Music", "Coffee", "Skateboarding", "Film"],
    location: "Manhattan, NY",
    stats: { likes: 1103, matches: 31, posts: 58 },
    verified: true,
  },
  {
    id: "u3",
    name: "Zara Ahmed",
    age: 21,
    avatar: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=600&h=800&fit=crop&auto=format",
    bio: "Philosophy major who thinks too much and travels too little — changing that ✈️",
    interests: ["Philosophy", "Travel", "Books", "Yoga"],
    location: "Hoboken, NJ",
    stats: { likes: 674, matches: 19, posts: 28 },
    verified: false,
  },
  {
    id: "u4",
    name: "Ethan Park",
    age: 24,
    avatar: "https://images.unsplash.com/photo-1617925357736-8a4ea869b800?w=600&h=800&fit=crop&auto=format",
    bio: "Tech + creativity collide here. Building things that matter 💡 Rock climber on weekends",
    interests: ["Tech", "Climbing", "Design", "Gaming"],
    location: "Jersey City, NJ",
    stats: { likes: 1456, matches: 42, posts: 73 },
    verified: true,
  },
  {
    id: "u5",
    name: "Sofia Reyes",
    age: 23,
    avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=600&h=800&fit=crop&auto=format",
    bio: "Dancer, poet, perpetual mood board. If you can make me laugh you've already won 😄",
    interests: ["Dance", "Poetry", "Fashion", "Brunch"],
    location: "Queens, NY",
    stats: { likes: 2103, matches: 55, posts: 91 },
    verified: false,
  },
];

export const feedPosts: Post[] = [
  {
    id: "p1",
    userId: "u1",
    username: "maya.creates",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1695938931042-6faf108eda35?w=600&h=700&fit=crop&auto=format",
    caption: "Midnight energy in the city never hits different 🌃✨ sometimes you just need to get lost to find yourself",
    likes: 847,
    comments: 62,
    timeAgo: "2h",
    liked: false,
  },
  {
    id: "p2",
    userId: "u2",
    username: "jordan.wav",
    avatar: "https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1547256398-b62fc7852828?w=600&h=700&fit=crop&auto=format",
    caption: "new track dropping friday 🎧 been in the studio all week and i think this one's actually different",
    likes: 1204,
    comments: 118,
    timeAgo: "5h",
    liked: true,
  },
  {
    id: "p3",
    userId: "u3",
    username: "zara.thinks",
    avatar: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&h=700&fit=crop&auto=format",
    caption: "bought a one-way ticket and figured the rest out later. not all who wander are lost but some of us definitely are 🗺️",
    likes: 531,
    comments: 44,
    timeAgo: "8h",
    liked: false,
  },
  {
    id: "p4",
    userId: "u4",
    username: "ethan.builds",
    avatar: "https://images.unsplash.com/photo-1617925357736-8a4ea869b800?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1776665758912-6592b5c3ce1b?w=600&h=700&fit=crop&auto=format",
    caption: "neon city vibes while debugging at 2am. this is the grind nobody tells you about 💻🔮",
    likes: 978,
    comments: 87,
    timeAgo: "12h",
    liked: false,
  },
  {
    id: "p5",
    userId: "u5",
    username: "sofia.moves",
    avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop&auto=format",
    image: "https://images.unsplash.com/photo-1612203304476-2ed23c55b5b9?w=600&h=700&fit=crop&auto=format",
    caption: "sundays are for soft things — warm coffee, slow mornings, and people who make you feel like home ☀️",
    likes: 2341,
    comments: 193,
    timeAgo: "1d",
    liked: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    userId: "u1",
    name: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
    lastMessage: "that rooftop spot sounds perfect tbh 🌆",
    time: "now",
    unread: 2,
    online: true,
  },
  {
    id: "c2",
    userId: "u2",
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1542458579-bc6f69b5ce6b?w=80&h=80&fit=crop&auto=format",
    lastMessage: "yo did you hear the new drop??",
    time: "3m",
    unread: 0,
    online: true,
  },
  {
    id: "c3",
    userId: "u5",
    name: "Sofia Reyes",
    avatar: "https://images.unsplash.com/photo-1674932668403-33398b81c92f?w=80&h=80&fit=crop&auto=format",
    lastMessage: "haha ok fair point 😂",
    time: "1h",
    unread: 0,
    online: false,
  },
  {
    id: "c4",
    userId: "u3",
    name: "Zara Ahmed",
    avatar: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=80&h=80&fit=crop&auto=format",
    lastMessage: "just landed in Lisbon ✈️",
    time: "3h",
    unread: 1,
    online: false,
  },
  {
    id: "c5",
    userId: "u4",
    name: "Ethan Park",
    avatar: "https://images.unsplash.com/photo-1617925357736-8a4ea869b800?w=80&h=80&fit=crop&auto=format",
    lastMessage: "we should collab on something fr",
    time: "yesterday",
    unread: 0,
    online: true,
  },
];

export const chatMessages: Record<string, Message[]> = {
  c1: [
    { id: "m1", senderId: "u1", text: "hey!! loved your last post 🔥", time: "2:10 PM" },
    { id: "m2", senderId: "me", text: "omg thank you!! been working on that shot for weeks", time: "2:12 PM" },
    { id: "m3", senderId: "u1", text: "it really shows!! the lighting is insane", time: "2:13 PM" },
    { id: "m4", senderId: "me", text: "you're too kind 😭 btw are you free this weekend?", time: "2:14 PM" },
    { id: "m5", senderId: "u1", text: "yes!! what did you have in mind?", time: "2:15 PM" },
    { id: "m6", senderId: "me", text: "there's this rooftop bar in williamsburg that has the most insane view", time: "2:16 PM" },
    { id: "m7", senderId: "u1", text: "that rooftop spot sounds perfect tbh 🌆", time: "2:17 PM" },
  ],
  c2: [
    { id: "m1", senderId: "u2", text: "bro check out this beat I just made", time: "11:30 AM" },
    { id: "m2", senderId: "me", text: "send it!!", time: "11:32 AM" },
    { id: "m3", senderId: "u2", text: "dropping friday btw. been on this one for 3 months", time: "11:33 AM" },
    { id: "m4", senderId: "me", text: "no way 3 months?? must be heat", time: "11:35 AM" },
    { id: "m5", senderId: "u2", text: "yo did you hear the new drop??", time: "11:40 AM" },
  ],
  c3: [
    { id: "m1", senderId: "me", text: "ok but hear me out — pineapple on pizza is actually good", time: "Yesterday" },
    { id: "m2", senderId: "u5", text: "ABSOLUTELY NOT 😭😭", time: "Yesterday" },
    { id: "m3", senderId: "me", text: "the sweet and savory combo though!!", time: "Yesterday" },
    { id: "m4", senderId: "u5", text: "haha ok fair point 😂", time: "Yesterday" },
  ],
  c4: [
    { id: "m1", senderId: "u3", text: "okay I did it. booked the ticket", time: "6h ago" },
    { id: "m2", senderId: "me", text: "WAIT REALLY?? where to??", time: "6h ago" },
    { id: "m3", senderId: "u3", text: "just landed in Lisbon ✈️", time: "3h ago" },
  ],
  c5: [
    { id: "m1", senderId: "u4", text: "dude your photography is insane", time: "Yesterday" },
    { id: "m2", senderId: "me", text: "bro same with your design work!!", time: "Yesterday" },
    { id: "m3", senderId: "u4", text: "we should collab on something fr", time: "Yesterday" },
  ],
};

export const activities: Activity[] = [
  {
    id: "a1",
    title: "Icebreaker Quiz",
    description: "Answer 5 fun questions and find your most compatible match",
    emoji: "🧊",
    gradient: "from-purple-600 to-blue-500",
    available: true,
    participants: 4821,
    category: "Discovery",
  },
  {
    id: "a2",
    title: "Compatibility Test",
    description: "Deep dive into your personality and see who's your 99% match",
    emoji: "💫",
    gradient: "from-pink-500 to-purple-600",
    available: true,
    participants: 3102,
    category: "Matching",
  },
  {
    id: "a3",
    title: "Would You Rather",
    description: "Play with someone you matched with and discover the real them",
    emoji: "⚡",
    gradient: "from-blue-500 to-cyan-400",
    available: true,
    participants: 6490,
    category: "Games",
  },
  {
    id: "a4",
    title: "Couple Challenge",
    description: "Complete fun challenges together and unlock exclusive content",
    emoji: "🔒",
    gradient: "from-orange-400 to-pink-500",
    available: false,
    participants: 0,
    category: "Coming Soon",
  },
  {
    id: "a5",
    title: "Vibe Check",
    description: "Share your current mood and find people on the same wavelength",
    emoji: "🌊",
    gradient: "from-teal-400 to-blue-500",
    available: true,
    participants: 2341,
    category: "Social",
  },
  {
    id: "a6",
    title: "Truth Tokens",
    description: "Anonymous confessions meet real connections — be brave, be honest",
    emoji: "🔮",
    gradient: "from-purple-500 to-pink-400",
    available: true,
    participants: 1887,
    category: "Discovery",
  },
];
