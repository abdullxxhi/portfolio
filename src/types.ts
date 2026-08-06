export interface PersonalInfo {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  profilePhoto: string;
  focusArea: string;
  bio: string;
  aboutHeadline: string;
  contactHeadline: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  iconName: string;
  subtext: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface AutomationScreenshot {
  image: string;
  title: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  mediaUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
  featured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  keyHighlights?: string[];
  automationScreenshots?: AutomationScreenshot[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: string;
  credentialUrl?: string;
  image?: string;
  skillsLearned?: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  duration: string;
  status: string;
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  achievements: string[];
}
