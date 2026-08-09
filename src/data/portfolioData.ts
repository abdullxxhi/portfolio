import { PersonalInfo, StatItem, SkillCategory, Project, Certification, EducationItem, ExperienceItem } from '../types';

// Profile picture generated
import profilePic from '../assets/images/profile_portrait_1785602306698.jpg';
import projectTicketImg from '../assets/images/project_ticket_auto_1785604298687.jpg';
import projectSalesImg from '../assets/images/project_sales_dash_1785604311537.jpg';
import projectPowerBiImg from '../assets/images/project_powerbi_dash_1785604325124.jpg';
import projectUfcImg from '../assets/images/project_ufc_analys_1785604336953.jpg';
import projectTransportImg from '../assets/images/project_transport_a_1785604349850.jpg';
import projectSeleemImg from '../assets/images/project_seleem_bakery_1785607080040.jpg';
import projectSeleemVideo from '../assets/images/project_seleem_bakery.mp4';
import projectN8nImg from '../assets/images/project_n8n_event_registration_1785965226341.jpg';
import projectClinicWorkflowImg from '../assets/images/project_clinic_workflow_1786043557943.jpg';
import projectClinicWhatsappImg from '../assets/images/project_clinic_whatsapp_1786043570240.jpg';
import projectSupportWorkflowImg from '../assets/images/project_support_workflow_1786298617869.jpg';
import projectRagImg from '../assets/images/project_rag_knowledgebase_1786298635021.jpg';
import projectHumanEscalationImg from '../assets/images/project_human_escalation_1786298651451.jpg';
import projectConfirmedOrderImg from '../assets/images/project_confirmed_order_1786298671056.jpg';
import projectTelegramAlertsImg from '../assets/images/project_telegram_alerts_1786298686572.jpg';
import certAlxImg from '../assets/images/cert_alx_data_analytics_1785607635646.jpg';

export const personalInfo: PersonalInfo = {
  name: "Abdullahi Damilola Abdulsalam",
  initials: "Build. Automate. Analyze.",
  role: "AI Automation Developer & Data Analyst",
  location: "Lagos, Nigeria",
  email: "abdulsalamabdullahi003@gmail.com",
  phone: "+234902250296",
  github: "https://github.com/abdullxxhi",
  linkedin: "https://www.linkedin.com/in/abdullxxhi",
  portfolioUrl: "https://github.com/abdullxxhi",
  profilePhoto: profilePic,
  focusArea: "AI Automation, Workflow Automation, Data Analysis",
  bio: "I am an AI Automation Developer & Data Analyst with a background in Statistics and a passion for building intelligent solutions that simplify work. I specialize in designing workflow automations, Google Workspace solutions, and data-driven systems that help individuals and businesses save time, reduce manual effort, and improve productivity. My experience spans Microsoft Excel, SQL, Power BI, Google Apps Script, and AI-powered workflow automation. I enjoy solving real-world problems by combining data analysis with automation to create efficient, scalable solutions.",
  aboutHeadline: "Building AI-powered automations and data solutions that save time, eliminate repetitive work, and improve productivity.",
  contactHeadline: "Let's connect and build AI-powered automations and data-driven solutions that make work smarter and more efficient."
};

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    label: "Projects Completed",
    value: "5+",
    numericValue: 5,
    suffix: "+",
    iconName: "FolderGit2",
    subtext: "Automations & Analytics Dashboards"
  },
  {
    id: "stat-2",
    label: "Certificates",
    value: "3",
    numericValue: 3,
    suffix: "",
    iconName: "Award",
    subtext: "ALX, AI Automation, Cypherdevs"
  },
  {
    id: "stat-3",
    label: "Technologies",
    value: "15+",
    numericValue: 15,
    suffix: "+",
    iconName: "Cpu",
    subtext: "AI Tools, SQL, Power BI, Apps Script"
  },
  {
    id: "stat-4",
    label: "Availability",
    value: "Open for Work",
    iconName: "CheckCircle2",
    subtext: "Full-Time, Contract & Remote Roles"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "AI Automation",
    icon: "Bot",
    description: "Designing autonomous workflow automations, intelligent AI agents, and automated Google Workspace pipelines.",
    skills: [
      "Workflow Automation",
      "AI Agents",
      "Google Apps Script",
      "Google Workspace Automation",
      "Prompt Engineering",
      "Process Automation",
      "Document Automation",
      "Email Automation"
    ]
  },
  {
    title: "Data Analysis",
    icon: "BarChart3",
    description: "Transforming raw data into actionable executive insights through exploratory analysis, data cleaning, and BI reporting.",
    skills: [
      "Microsoft Excel",
      "SQL",
      "Power BI",
      "Data Cleaning",
      "Data Visualization",
      "Dashboard Design",
      "Data Analysis",
      "Reporting"
    ]
  },
  {
    title: "Advanced Excel",
    icon: "FileSpreadsheet",
    description: "Mastery over complex formulas, dynamic array functions, pivot modeling, and custom conditional logic.",
    skills: [
      "Pivot Tables",
      "Pivot Charts",
      "XLOOKUP",
      "VLOOKUP",
      "INDEX/MATCH",
      "SUMPRODUCT",
      "Conditional Formatting",
      "Data Validation"
    ]
  },
  {
    title: "Programming & Databases",
    icon: "Code",
    description: "Scripting custom automated triggers and querying relational database architectures.",
    skills: [
      "Google Apps Script",
      "JavaScript (Apps Script)",
      "SQL",
      "PostgreSQL"
    ]
  },
  {
    title: "Google Workspace & Productivity",
    icon: "Layers",
    description: "Seamless integration across Google Cloud productivity applications for serverless automation.",
    skills: [
      "Google Forms",
      "Google Sheets",
      "Google Slides",
      "Google Docs",
      "Gmail Automation"
    ]
  },
  {
    title: "Soft Skills & Mindset",
    icon: "Sparkles",
    description: "Methodical statistical approach combined with high attention to detail and continuous learning.",
    skills: [
      "Problem Solving",
      "Analytical Thinking",
      "Attention to Detail",
      "Communication",
      "Continuous Learning"
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Clinic Appointment Automation",
    category: "AI Automation",
    featured: true,
    description: "Automated clinic booking and appointment management system. The complete n8n workflow automatically detects new Google Form submissions, creates a Google Calendar event, sends a confirmation email via Gmail, and delivers an instant personalized WhatsApp confirmation message to patients without manual intervention.",
    tags: ["n8n", "Google Sheets", "Google Calendar", "Gmail", "WhatsApp Automation", "Healthcare Tech", "Workflow Automation"],
    mediaUrl: projectClinicWorkflowImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "Automated detection of Google Form submissions & Google Sheets row triggers.",
      "Instant calendar scheduling via Google Calendar API.",
      "Dual notification via automated Gmail email & direct personalized WhatsApp message."
    ],
    automationScreenshots: [
      {
        image: projectClinicWorkflowImg,
        title: "n8n Automation Workflow",
        caption: "The complete n8n workflow automatically detects new Google Form submissions, creates a Google Calendar event, sends a confirmation email via Gmail, and delivers a WhatsApp confirmation message without manual intervention."
      },
      {
        image: projectClinicWhatsappImg,
        title: "Automated WhatsApp Confirmation",
        caption: "Patients instantly receive a personalized WhatsApp confirmation containing their appointment date, time, and reason for visit immediately after booking."
      }
    ]
  },
  {
    id: "proj-2",
    title: "Sales Performance Dashboard",
    category: "Excel",
    featured: false,
    description: "Designed an interactive Excel dashboard for sales performance analysis using Pivot Tables, Pivot Charts, KPIs, dynamic slicers, and advanced Excel functions to provide actionable business intelligence.",
    tags: ["Excel", "Dashboard", "Analytics", "Reporting", "Pivot Tables"],
    mediaUrl: projectSalesImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "Dynamic slicers for real-time region, product category, and timeframe filtering.",
      "Automated KPI summaries for revenue, conversion rate, and average order value.",
      "Executive visual representation designed for clear stakeholder decision-making."
    ]
  },
  {
    id: "proj-3",
    title: "Company Performance Dashboard",
    category: "Data Analysis",
    featured: false,
    description: "Built a Power BI dashboard that visualizes business performance metrics, enabling users to monitor cross-departmental KPIs and make informed strategic decisions through interactive reports.",
    tags: ["Power BI", "Business Intelligence", "Data Visualization", "DAX"],
    mediaUrl: projectPowerBiImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "Multi-tab breakdown for Revenue, Operational Efficiency, and Customer Metrics.",
      "Interactive drill-down reports with custom DAX measures.",
      "Real-time visual monitoring with intuitive warm theme."
    ]
  },
  {
    id: "proj-4",
    title: "UFC Fighter Data Analysis (Islam Makhachev)",
    category: "Data Analysis",
    featured: false,
    description: "Performed exploratory data analysis on UFC Lightweight Champion Islam Makhachev's fight statistics, analyzing striking accuracy, takedown efficiency, control time metrics, and fight outcomes using SQL and Excel.",
    tags: ["Islam Makhachev", "UFC Analytics", "SQL", "Excel", "Data Analysis"],
    mediaUrl: projectUfcImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "SQL data cleaning and normalization across Islam Makhachev's career fight performance records.",
      "Statistical modeling analyzing takedown accuracy, striking defense, and control time vs. win percentage.",
      "Comprehensive performance breakdown report highlighting career victory trajectories."
    ]
  },
  {
    id: "proj-5",
    title: "Transportation Cost Analysis in Nigeria",
    category: "Statistics",
    featured: false,
    description: "Conducted a Two-Way ANOVA statistical study using the National Bureau of Statistics (NBS) Transport FareWatch dataset to examine the significant effects of transportation mode and geopolitical zones on transportation costs in Nigeria.",
    tags: ["Statistics", "ANOVA", "Research", "Data Analysis", "NBS Dataset"],
    mediaUrl: projectTransportImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "Two-Way ANOVA statistical testing validating zone vs. transit mode interactions.",
      "In-depth exploratory findings based on authentic NBS macro dataset.",
      "Academic statistical paper & visual zone heatmap presentation."
    ]
  },
  {
    id: "proj-6",
    title: "Seleem Bakery Website",
    category: "WEB DEVELOPMENT",
    featured: false,
    description: "A fully responsive, interactive bakery website built with Google Studio. The website features a modern user interface, responsive layouts for desktop, tablet, and mobile devices, and an AI-powered customer support chatbot. The chatbot is integrated using n8n workflows and responds intelligently through the Gemini API, providing customers with real-time assistance and an engaging user experience.",
    tags: ["Google Studio", "n8n", "Gemini AI", "Responsive Design", "AI Chatbot", "Workflow Automation", "Frontend Development"],
    mediaUrl: projectSeleemImg,
    videoUrl: projectSeleemVideo,
    isVideo: true,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "Fully responsive modern UI layout built with Google Studio for desktop, tablet, and mobile.",
      "AI-powered customer support chatbot powered by n8n workflows and Gemini API.",
      "Interactive menu ordering, special requests customization, and real-time order bag status."
    ]
  },
  {
    id: "proj-7",
    title: "Smart Event Registration & Capacity Management Automation",
    category: "AI Automation",
    featured: false,
    description: "Built an end-to-end event registration workflow in n8n that automates attendee management using Google Forms, Google Sheets, Gmail, and JavaScript. The workflow automatically generates unique registration IDs, validates event capacity, routes attendees based on their location, and sends personalized confirmation or waitlist emails.",
    tags: ["n8n", "Google Forms", "Google Sheets", "Gmail", "JavaScript", "Workflow Automation", "AI Automation"],
    mediaUrl: projectN8nImg,
    githubUrl: "https://github.com/abdullxxhi",
    demoUrl: "",
    keyHighlights: [
      "Automatically generates unique registration IDs for every submission.",
      "Validates maximum event capacity before confirming attendance.",
      "Sends physical event confirmations for attendees in Nigeria.",
      "Sends virtual attendance details for international attendees.",
      "Automatically sends waitlist emails once capacity is reached.",
      "Uses Google Forms, Google Sheets, Gmail, JavaScript, and n8n."
    ]
  },
  {
    id: "proj-8",
    title: "AI Customer Support Bot",
    category: "AI Automation",
    featured: true,
    description: "An AI-powered customer support and order management system built with n8n, Google Gemini, RAG, and Telegram. The bot answers customer questions using a company-specific knowledge base, maintains conversation context, identifies requests requiring human intervention, extracts confirmed order details, and sends important business notifications through Telegram.",
    tags: ["n8n", "Google Gemini", "RAG", "Vector Store", "Telegram", "AI Automation", "Workflow Automation"],
    mediaUrl: projectSupportWorkflowImg,
    demoUrl: "https://github.com/abdullxxhi",
    githubUrl: "https://github.com/abdullxxhi",
    keyHighlights: [
      "AI-powered customer support using Google Gemini",
      "Company-specific knowledge retrieval using RAG and a vector store",
      "Conversation memory for maintaining customer context",
      "Automated human escalation for requests requiring staff intervention",
      "Automatic extraction of confirmed order details",
      "Telegram notifications for human escalations and confirmed orders"
    ],
    automationScreenshots: [
      {
        image: projectSupportWorkflowImg,
        title: "AI Customer Support Workflow",
        caption: "Shows the main n8n AI customer support workflow connecting the chat trigger, AI Agent, Google Gemini, memory, and knowledge base."
      },
      {
        image: projectRagImg,
        title: "Knowledge Base & RAG Ingestion",
        caption: "Shows the knowledge base workflow used to provide the AI agent with company-specific information."
      },
      {
        image: projectHumanEscalationImg,
        title: "Human Escalation via Telegram",
        caption: "Shows the workflow that identifies requests requiring human intervention and sends a Telegram notification."
      },
      {
        image: projectConfirmedOrderImg,
        title: "Confirmed Order Automation",
        caption: "Shows the workflow that detects confirmed orders and extracts important order information."
      },
      {
        image: projectTelegramAlertsImg,
        title: "Telegram Business Notifications",
        caption: "Shows the Telegram notifications received by the business for important customer events."
      }
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-1",
    title: "ALX Data Analysis Programme",
    issuer: "ALX Africa",
    date: "2026",
    status: "Completed",
    image: certAlxImg,
    credentialUrl: "https://savanna.alxafrica.com/certificates/59TRPhyBSL",
    skillsLearned: ["SQL", "Data Analytics", "Power BI", "Exploratory Data Analysis", "Problem Solving"]
  },
  {
    id: "cert-2",
    title: "AI Automation Training",
    issuer: "AI Automation Institute",
    date: "2026",
    status: "Completed",
    skillsLearned: ["AI Workflow Automation", "Google Apps Script", "AI Agents", "Prompt Engineering", "Process Optimization"]
  }
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    school: "University of Ilorin",
    degree: "BSc Statistics",
    duration: "",
    status: "",
    highlights: [
      "Focus on Probability Theory, Statistical Inference, Design of Experiments, and Regression Analysis.",
      "Applying rigorous mathematical and statistical models to real-world business and economic datasets.",
      "Conducting empirical research on multivariate data and econometric indices in Nigeria."
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "AI Automation Developer & Data Analyst / Trainee",
    company: "AI Automation Practice",
    period: "Completed (2026)",
    type: "Specialization",
    achievements: [
      "Learning and building advanced AI workflow automations using modern AI tools and agents.",
      "Architecting end-to-end automation systems with Google Apps Script and Google Workspace ecosystem.",
      "Developing automated document generation, custom PDF rendering, email notification flows, and spreadsheet synching.",
      "Building real-world scalable automation projects to streamline complex business operations."
    ]
  },
  {
    id: "exp-2",
    role: "Data Analysis Trainee",
    company: "Data Analytics Program",
    period: "Completed (2026)",
    type: "Practical Experience",
    achievements: [
      "Analyzed complex datasets using Microsoft Excel, SQL, and Power BI to extract actionable business insights.",
      "Designed interactive dashboards and reports featuring dynamic slicers, KPIs, and DAX calculations.",
      "Executed data cleaning, structural transformation, and statistical normalization pipelines.",
      "Applied statistical methods (such as Two-Way ANOVA) to solve complex business and academic problems."
    ]
  }
];
