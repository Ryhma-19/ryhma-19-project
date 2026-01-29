export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  notifications: boolean;
  weatherAlerts: boolean;
  theme: 'light' | 'dark';
}

export interface Route {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coordinates: Coordinate[];
  distance: number; // in meters
  estimatedDuration?: number; // in seconds
  createdAt: Date;
  isFavorite: boolean;
  cachedMapData?: string; // For offline
}

export interface Coordinate {
  latitude: number;
  longitude: number;
  altitude?: number;
  timestamp?: Date;
}

export interface Workout {
  id: string;
  userId: string;
  routeId?: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  distance: number; // in meters
  averageSpeed: number; // m/s
  maxSpeed: number; // m/s
  steps?: number;
  calories?: number;
  coordinates: Coordinate[];
  weather?: WeatherCondition;
}

export interface WeatherCondition {
  temperature: number; // Celsius
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  timestamp: Date;
  isExtreme?: boolean; // For warnings
}

export const ICONS = {
  calendar: "📅",
  bicycle: "🚴",
  stopwatch: "⏱️",
  biceps: "💪",
  trophy: "🏆",
  run: "🏃"
} as const;

export type IconKey = keyof typeof ICONS;

export interface Achievement {
  id: string;
  type: 'distance' | 'streak' | 'speed' | 'custom';
  title: string;
  icon: IconKey;
  target: number;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}
/*
export interface Achievement {
  workoutId: string,
  achievementType: 'personal_record' | 'milestone' | 'streak',
  metric: 'distance' | 'pace' | 'steps' | 'duration',
  value: number,
  previousBest?: number,
  timestamp: Date
}
*/
export interface WorkoutStats {
  totalWorkouts: number;
  totalDistance: number; // meters
  totalDuration: number; // seconds
  averagePace: number; // min/km
  longestRun: number; // meters
  currentStreak: number; // days
  longestStreak: number; // days
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Routes: undefined;
  Track: undefined;
  Steps: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  UserSettings: undefined;
  PasswordUpdate: undefined;
  UserBadges: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// steps
export interface DailySteps {
  date: string;      
  steps: number;
  updatedAt: Date;
}

export interface StepsGoal {
  dailyGoal: number; 
  lastUpdated: Date;
}

export interface WeeklyStepsData {
  week: string; 
  days: DailySteps[];
  total: number;
}

export interface MonthlyStepsData {
  month: string; 
  weeks: WeeklyStepsData[];
  total: number;
}
