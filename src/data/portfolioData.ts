import {
  PersonalInfo,
  StatItem,
  SkillCategory,
  Project,
  Certification,
  EducationItem,
  ExperienceItem
} from '../types';

// Profile picture
import profilePic from '../assets/images/profile\_portrait\_1785602306698.jpg';

import projectTransportImg from '../assets/images/project\_transport\_a\_1785604349850.jpg';
import projectSeleemImg from '../assets/images/project\_seleem\_bakery\_1785607080040.jpg';
import projectSeleemVideo from '../assets/images/seleem-bakery-1.mp4';

import eventRegistrationImg from '../assets/images/event-registration.png';

import n8nDB from '../assets/images/n8nDB.png';
import projectClinicWhatsappImg from '../assets/images/clinic-whatsapp.png';

import projectSupportWorkflowImg from '../assets/images/01-ai-customer-support-workflow\.png';
import projectRagImg from '../assets/images/02-knowledge-base-rag-ingestion.png';
import projectHumanEscalationImg from '../assets/images/03-human-escalation-telegram.png';
import projectConfirmedOrderImg from '../assets/images/04-confirmed-order-automation.png';
import projectTelegramAlertsImg from '../assets/images/05-telegram-business-notifications.png';

import alxCertificateIMG from '../assets/images/alx-certificate.png';
import fadaqaImg from '../assets/images/fadaqa.png';

import projectOrderDeliveryImg from '../assets/images/01-delivery-order-workflow\.png';
import projectOrderPickupImg from '../assets/images/02-pickup-order-workflow\.png';
import projectOrderOtherImg from '../assets/images/03-other-order-workflow\.png';
import projectOrderIncompleteImg from '../assets/images/04-incomplete-order-workflow\.png';
import projectOrderSheetImg from '../assets/images/05-order-management-sheet.png';
import projectOrderTelegramDeliveryImg from '../assets/images/06-telegram-delivery-notification.png';
import projectOrderTelegramPickupImg from '../assets/images/07-telegram-pickup-notification.png';
import projectOrderTelegramHumanImg from '../assets/images/08-telegram-human-intervention.png';
import projectOrderTelegramClarificationImg from '../assets/images/09-telegram-order-clarification.png';

// AI Email Triage & Response System images
import projectEmailTriageOverviewImg from '../assets/images/01-workflow-overview\.png';
import projectEmailSalesRoutingImg from '../assets/images/02-sales-email-routing.png';
import projectEmailSupportRoutingImg from '../assets/images/03-support-email-routing.png';
import projectEmailUrgentRoutingImg from '../assets/images/04-urgent-email-routing.png';
import projectEmailGeneralRoutingImg from '../assets/images/05-general-email-routing.png';
import projectEmailUrgentLabelImg from '../assets/images/06-ai-urgent-label.png';

// Product Quality Control Data Cleaning & Validation images
import projectQualityControlWorkflowImg from '../assets/images/01-workflow-canvas.png';
import projectQualityControlSourceImg from '../assets/images/02-source-data-quality.png';
import projectQualityControlCleanedImg from '../assets/images/03-cleaned-data.png';
import projectQualityControlReportImg from '../assets/images/04-quality-report.png';

// Customer Churn Analysis images
import projectChurnDataImg from '../assets/images/01-data.png';
import projectChurnValidationImg from '../assets/images/02-validation-summary.png';
import projectChurnPivotTableImg from '../assets/images/03-pivotTable.png';
import projectChurnStatisticalTestImg from '../assets/images/04-statistical-test.png';
import projectChurnBusinessInsightsImg from '../assets/images/05-business-insights.png';

// Sales Forecasting & Predictive Analysis images
import projectForecastTrainDataImg from '../assets/images/01-train-data.png';
import projectForecastMonthlyTrendImg from '../assets/images/02-monthly-trend.png';
import projectForecastNaiveImg from '../assets/images/03-naive-forecast.png';
import projectForecastEtsImg from '../assets/images/04-ets-forecast.png';

// Weekly Sales Forecasting Analysis images
import projectWeeklyForecastDashboardImg from '../assets/images/dashbordAI.png';
import projectWeeklyForecastDataImg from '../assets/images/sales-transac-data.png';
import projectWeeklyForecastMovingAverageImg from '../assets/images/moving-average.png';

// Apple Financial Performance Dashboard images
import projectApplePerformanceDashboardImg from '../assets/images/01-perfomance-dashboard.png';
import projectAppleProfitabilityAnalysisImg from '../assets/images/02-profitability-analysis.png';


export const personalInfo: PersonalInfo = {
  name: "Abdullahi Damilola Abdulsalam",
  initials: "Build. Automate. Analyze.",
  role: "AI Automation Developer & Data Analyst",
  location: "Lagos, Nigeria",
  email: "abdulsalamabdullahi003\@gmail.com",
  phone: "+234902250296",
  github: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
  linkedin: "[https://www.linkedin.com/in/abdullxxhi](https://www.linkedin.com/in/abdullxxhi)",
  portfolioUrl: "[https://abdullxxhi.vercel.app/](https://abdullxxhi.vercel.app/)",
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
    value: "10+",
    numericValue: 10,
    suffix: "+",
    iconName: "FolderGit2",
    subtext: "Analytics & Automations"
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
    title: "Customer Churn Analysis",
    category: "Data Analysis",
    featured: true,
    description: "Conducted an end-to-end customer churn analysis in Microsoft Excel 2025 for a telecommunications dataset. The project covered data validation, exploratory analysis, customer segmentation, churn-rate analysis, and a Chi-Square test examining the relationship between contract type and customer churn. The analysis identified key high-risk customer groups and translated the findings into practical retention recommendations.",
    tags: [
      "Excel",
      "Data Analysis",
      "Customer Churn",
      "PivotTables",
      "Data Validation",
      "Statistical Analysis",
      "Chi-Square",
      "Customer Segmentation",
      "Business Intelligence"
    ],
    mediaUrl: projectChurnDataImg,
    demoUrl: "",
    githubUrl: "[https://github.com/abdullxxhi/Customer-Churn-Analysis](https://github.com/abdullxxhi/Customer-Churn-Analysis)",
    keyHighlights: [
      "Calculated an overall 36.4% customer churn rate and identified high-risk customer segments.",
      "Analyzed churn across contract type, tenure, satisfaction, monthly charges, support tickets, internet service, and Auto Pay.",
      "Applied a Chi-Square Test of Independence, finding a statistically significant association between contract type and customer churn (χ² = 24.461, p = 0.0000049).",
      "Identified month-to-month customers and newer customers as particularly high-risk groups.",
      "Translated analytical findings into practical recommendations around onboarding, retention, satisfaction, support, pricing, and Auto Pay adoption."
    ],
    automationScreenshots: [
      {
        image: projectChurnDataImg,
        title: "Customer Churn Dataset",
        caption: "Shows the customer churn dataset used for the Excel analysis."
      },
      {
        image: projectChurnValidationImg,
        title: "Data Validation Summary",
        caption: "Shows the validation checks performed to identify duplicate records, missing values, invalid ranges, categorical issues, and business-logic problems before analysis."
      },
      {
        image: projectChurnPivotTableImg,
        title: "Churn Analysis PivotTables",
        caption: "Shows PivotTables used to explore customer churn patterns across contract type, tenure, satisfaction, charges, support tickets, internet service, and Auto Pay."
      },
      {
        image: projectChurnStatisticalTestImg,
        title: "Chi-Square Statistical Test",
        caption: "Shows the Chi-Square Test of Independence examining the relationship between contract type and customer churn."
      },
      {
        image: projectChurnBusinessInsightsImg,
        title: "Business Insights & Recommendations",
        caption: "Shows the key customer churn findings and practical recommendations derived from the analysis."
      }
    ]
  },

  {
    id: "proj-2",
    title: "Sales Forecasting & Predictive Analysis",
    category: "Data Analysis",
    featured: true,
    description: "Analyzed more than 1 million sales records in Microsoft Excel to identify monthly sales trends, measure volatility, and evaluate forecasting performance. Compared a naive baseline with an ETS forecasting model using MAE and RMSE to determine which approach produced more accurate predictions.",
    tags: [
      "Excel",
      "Data Analysis",
      "Forecasting",
      "ETS",
      "Time Series",
      "PivotTables",
      "MAE",
      "RMSE",
      "Data Visualization",
      "Predictive Analysis"
    ],
    mediaUrl: projectForecastTrainDataImg,
    demoUrl: "",
    githubUrl: "[https://github.com/abdullxxhi/Sales-Forecasting-and-Predictive-Analysis](https://github.com/abdullxxhi/Sales-Forecasting-and-Predictive-Analysis)",
    keyHighlights: [
      "Aggregated more than 1 million sales records into monthly sales totals using Excel PivotTables.",
      "Analyzed monthly trends, month-over-month changes, and volatility across 2013 and 2014.",
      "Compared a naive forecasting baseline with an ETS model using MAE and RMSE.",
      "ETS produced lower forecasting errors than the naive method, reducing MAE by approximately 28.3% and RMSE by approximately 30.4%.",
      "Evaluated forecast limitations and identified that ETS struggled with sudden sales spikes and sharp declines."
    ],
    automationScreenshots: [
      {
        image: projectForecastTrainDataImg,
        title: "Sales Dataset",
        caption: "Shows the large historical sales dataset used for the forecasting and predictive analysis."
      },
      {
        image: projectForecastMonthlyTrendImg,
        title: "Monthly Sales Trend",
        caption: "Shows the PivotTable aggregation used to group the sales data by month and year for trend analysis."
      },
      {
        image: projectForecastNaiveImg,
        title: "Naive Forecast",
        caption: "Shows the naive forecasting approach used as the baseline for evaluating forecast performance."
      },
      {
        image: projectForecastEtsImg,
        title: "ETS Forecast",
        caption: "Shows the ETS forecast created using Excel's Forecast Sheet, including the forecast results and confidence bounds."
      }
    ]
  },

  {
    id: "proj-3",
    title: "Apple Financial Performance Dashboard",
    category: "Data Analysis",
    featured: true,
    description: "Built an interactive Power BI dashboard to analyze Apple's financial performance across sales, profit, products, countries, business segments, and time. The project demonstrates practical data cleaning and transformation, data modeling, DAX, KPI development, interactive dashboard design, geographic analysis, and business insight generation.",
    tags: [
      "Power BI",
      "Power Query",
      "DAX",
      "Data Modeling",
      "Data Visualization",
      "Financial Analysis",
      "Dashboard Design",
      "Business Intelligence",
      "Data Storytelling"
    ],
    mediaUrl: projectApplePerformanceDashboardImg,
    demoUrl: "",
    githubUrl: "",
    keyHighlights: [
      "Analyzed overall sales, profitability, products, countries, business segments, and sales trends over time.",
      "Built an Executive Overview page featuring Total Sales, Total Profit, Total Units Sold, Profit Margin, sales trends, country performance, product performance, and segment analysis.",
      "Built a dedicated Profitability Analysis page covering profit by country, profit by product, profit margin by segment, and Sales vs. Profit analysis.",
      "Used Power Query for data cleaning and transformation, Power BI data modeling, and DAX measures for analytical calculations.",
      "Identified approximately $118.73M in total sales, $16.89M in total profit, and an overall profit margin of approximately 14.23%.",
      "Identified Paseo as the strongest product by both sales and total profit.",
      "Found Government to be the highest-sales business segment and Channel Partners to have the highest profit margin.",
      "Identified negative profitability in the Enterprise segment despite substantial sales, highlighting the need for further profitability investigation.",
      "Identified October as the strongest month for sales and France as the country with the highest total profit.",
      "Demonstrated that strong sales performance does not necessarily translate into strong profitability."
    ],
    automationScreenshots: [
      {
        image: projectApplePerformanceDashboardImg,
        title: "Apple Financial Performance Dashboard",
        caption: "Executive Overview page showing total sales, total profit, total units sold, profit margin, sales trends, sales by country, sales by product, sales by segment, and interactive Country, Segment, and Year filters."
      },
      {
        image: projectAppleProfitabilityAnalysisImg,
        title: "Profitability Analysis",
        caption: "Second Power BI page focusing on profitability, including profit by country, profit by product, profit margin by segment, Sales vs. Profit analysis, and interactive filters."
      }
    ]
  },

  {
    id: "proj-4",
    title: "Weekly Sales Forecasting Analysis",
    category: "Data Analysis",
    featured: true,
    description: "Analyzed 52 weeks of sales data for Product P1 using Microsoft Excel to compare Naive Forecasting, a 3-Week Moving Average, and ETS forecasting. The analysis used a W0–W39 training period and W40–W51 testing period, evaluating each method with MAE and RMSE. An interactive forecasting dashboard was also built to present actual sales, forecasts, model accuracy, and forecasting errors in a clear business-focused format.",
    tags: [
      "Excel",
      "Google Sheets",
      "Google Gemini",
      "Forecasting",
      "Time Series",
      "Moving Average",
      "ETS",
      "MAE",
      "RMSE",
      "Data Visualization"
    ],
    mediaUrl: projectWeeklyForecastDashboardImg,
    demoUrl: "",
    githubUrl: "[https://github.com/abdullxxhi/Weekly-Sales-Forecasting-Analysis](https://github.com/abdullxxhi/Weekly-Sales-Forecasting-Analysis)",
    keyHighlights: [
      "Compared Naive Forecasting, 3-Week Moving Average, and ETS using the same testing period.",
      "Evaluated forecasting accuracy using MAE and RMSE.",
      "The 3-Week Moving Average achieved the lowest MAE and RMSE among the three methods tested.",
      "Built an interactive dashboard showing actual sales, forecasts, model accuracy, and forecasting errors.",
      "Used Google Gemini in Google Sheets to experiment with the initial dashboard design before developing the final presentation in Excel.",
      "Demonstrated that a simpler forecasting method can outperform a more complex model depending on the characteristics of the dataset."
    ],
    automationScreenshots: [
      {
        image: projectWeeklyForecastDashboardImg,
        title: "Weekly Sales Forecasting Dashboard",
        caption: "Interactive dashboard presenting actual weekly sales, Naive forecasts, 3-Week Moving Average forecasts, ETS forecasts, MAE and RMSE comparisons, and forecasting errors."
      },
      {
        image: projectWeeklyForecastDataImg,
        title: "Weekly Sales Dataset",
        caption: "Shows the 52 weekly observations for Product P1 used for the forecasting analysis, organized chronologically from W0 to W51."
      },
      {
        image: projectWeeklyForecastMovingAverageImg,
        title: "3-Week Moving Average Analysis",
        caption: "Shows the 3-Week Moving Average forecasting analysis using recent weekly sales values to estimate future demand."
      }
    ]
  },

  {
    id: "proj-5",
    title: "Clinic Appointment Automation",
    category: "AI Automation",
    featured: true,
    description: "Automated clinic booking and appointment management system. The complete n8n workflow automatically detects new Google Form submissions, creates a Google Calendar event, sends a confirmation email via Gmail, and delivers an instant personalized WhatsApp confirmation message to patients without manual intervention.",
    tags: [
      "n8n",
      "Google Sheets",
      "Google Calendar",
      "Gmail",
      "WhatsApp Automation",
      "Healthcare Tech",
      "Workflow Automation"
    ],
    mediaUrl: n8nDB,
    demoUrl: "[https://github.com/abdullxxhi/clinic-booking-automation](https://github.com/abdullxxhi/clinic-booking-automation)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Automated detection of Google Form submissions & Google Sheets row triggers.",
      "Instant calendar scheduling via Google Calendar API.",
      "Dual notification via automated Gmail email & direct personalized WhatsApp message."
    ],
    automationScreenshots: [
      {
        image: n8nDB,
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
    id: "proj-6",
    title: "Transportation Cost Analysis in Nigeria",
    category: "Statistics",
    featured: false,
    description: "Conducted a Two-Way ANOVA statistical study using the National Bureau of Statistics (NBS) Transport FareWatch dataset to examine the significant effects of transportation mode and geopolitical zones on transportation costs in Nigeria.",
    tags: [
      "Statistics",
      "ANOVA",
      "Research",
      "Data Analysis",
      "NBS Dataset"
    ],
    mediaUrl: projectTransportImg,
    demoUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Two-Way ANOVA statistical testing validating zone vs. transit mode interactions.",
      "In-depth exploratory findings based on authentic NBS macro dataset.",
      "Academic statistical paper & visual zone heatmap presentation."
    ]
  },

  {
    id: "proj-7",
    title: "Seleem Bakery Website",
    category: "WEB DEVELOPMENT",
    featured: false,
    description: "A fully responsive, interactive bakery website built with Google Studio. The website features a modern user interface, responsive layouts for desktop, tablet, and mobile devices, and an AI-powered customer support chatbot. The chatbot is integrated using n8n workflows and responds intelligently through the Gemini API, providing customers with real-time assistance and an engaging user experience.",
    tags: [
      "Google Studio",
      "n8n",
      "Gemini AI",
      "Responsive Design",
      "AI Chatbot",
      "Workflow Automation",
      "Frontend Development"
    ],
    mediaUrl: projectSeleemImg,
    videoUrl: projectSeleemVideo,
    isVideo: true,
    demoUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Fully responsive modern UI layout built with Google Studio for desktop, tablet, and mobile.",
      "AI-powered customer support chatbot powered by n8n workflows and Gemini API.",
      "Interactive menu ordering, special requests customization, and real-time order bag status."
    ]
  },

  {
    id: "proj-8",
    title: "Smart Event Registration & Capacity Management Automation",
    category: "AI Automation",
    featured: false,
    description: "Built an end-to-end event registration workflow in n8n that automates attendee management using Google Forms, Google Sheets, Gmail, and JavaScript. The workflow automatically generates unique registration IDs, validates event capacity, routes attendees based on their location, and sends personalized confirmation or waitlist emails.",
    tags: [
      "n8n",
      "Google Forms",
      "Google Sheets",
      "Gmail",
      "JavaScript",
      "Workflow Automation",
      "AI Automation"
    ],
    mediaUrl: eventRegistrationImg,
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    demoUrl: "[https://github.com/abdullxxhi/ai-event-registration-automation](https://github.com/abdullxxhi/ai-event-registration-automation)",
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
    id: "proj-9",
    title: "AI Customer Support Bot",
    category: "AI Automation",
    featured: true,
    description: "An AI-powered customer support and order management system built with n8n, Google Gemini, RAG, and Telegram. The bot answers customer questions using a company-specific knowledge base, maintains conversation context, identifies requests requiring human intervention, extracts confirmed order details, and sends important business notifications through Telegram.",
    tags: [
      "n8n",
      "Google Gemini",
      "RAG",
      "Vector Store",
      "Telegram",
      "AI Automation",
      "Workflow Automation"
    ],
    mediaUrl: projectSupportWorkflowImg,
    demoUrl: "[https://github.com/abdullxxhi/AI-Customer-Support-Bot](https://github.com/abdullxxhi/AI-Customer-Support-Bot)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
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
  },

  {
    id: "proj-10",
    title: "AI Natural Language Order Management Automation",
    category: "AI Automation",
    featured: false,
    description: "Built a real-world AI-powered order management automation that allows customers to describe their orders naturally instead of filling out multiple fields. The workflow uses AI to understand and extract order details, validates the required information, routes Delivery, Pickup, and Other orders using a Switch node, stores orders in Google Sheets, sends the appropriate team Telegram notifications, escalates incomplete or unusual orders for human intervention, and sends customers an acknowledgement.",
    tags: [
      "n8n",
      "AI Automation",
      "AI Agent",
      "Google Sheets",
      "Telegram",
      "Natural Language Processing",
      "Workflow Automation",
      "Order Management"
    ],
    mediaUrl: projectOrderDeliveryImg,
    demoUrl: "[https://github.com/abdullxxhi/AI-Order-Management-Fulfillment-Automation](https://github.com/abdullxxhi/AI-Order-Management-Fulfillment-Automation)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Uses AI to understand natural-language customer orders and extract structured order details.",
      "Validates required information before processing the order.",
      "Uses a Switch node to route Delivery, Pickup, and Other order types.",
      "Stores customer and order information in a Google Sheets order management system.",
      "Sends route-specific Telegram notifications to the appropriate team.",
      "Escalates incomplete or unusual orders for human intervention.",
      "Sends customers an acknowledgement after processing their request."
    ],
    automationScreenshots: [
      {
        image: projectOrderDeliveryImg,
        title: "Delivery Order Workflow",
        caption: "Shows the workflow path used to process customer delivery orders after AI extracts and validates the order details."
      },
      {
        image: projectOrderPickupImg,
        title: "Pickup Order Workflow",
        caption: "Shows the workflow path used to process customer pickup orders and route them to the appropriate handling process."
      },
      {
        image: projectOrderOtherImg,
        title: "Other Order Workflow",
        caption: "Shows how orders that do not match the standard Delivery or Pickup routes are handled by the automation."
      },
      {
        image: projectOrderIncompleteImg,
        title: "Incomplete Order Workflow",
        caption: "Shows the workflow path used when the customer's message does not contain all the information required to process the order."
      },
      {
        image: projectOrderSheetImg,
        title: "Order Management Sheet",
        caption: "Shows the Google Sheets order management system where processed customer orders and their details are stored."
      },
      {
        image: projectOrderTelegramDeliveryImg,
        title: "Telegram Delivery Notification",
        caption: "Shows the Telegram notification sent to the delivery team when a customer places a delivery order."
      },
      {
        image: projectOrderTelegramPickupImg,
        title: "Telegram Pickup Notification",
        caption: "Shows the Telegram notification sent to the appropriate team when a customer places a pickup order."
      },
      {
        image: projectOrderTelegramHumanImg,
        title: "Telegram Human Intervention",
        caption: "Shows the Telegram notification used to alert a human team member when an order requires manual intervention."
      },
      {
        image: projectOrderTelegramClarificationImg,
        title: "Telegram Order Clarification",
        caption: "Shows the Telegram notification used when additional information or clarification is required before an order can be processed."
      }
    ]
  },

  {
    id: "proj-11",
    title: "AI Email Triage & Response System",
    category: "AI Automation",
    featured: true,
    description: "Built an AI-powered email triage and response system in n8n that automatically retrieves unread Gmail messages, analyzes their content using Google Gemini, classifies emails as Sales, Support, Urgent, or General, determines priority and intent, routes each email based on the AI classification, generates appropriate responses, flags urgent emails for human attention, and marks processed emails as read.",
    tags: [
      "n8n",
      "Gmail",
      "Google Gemini",
      "AI Automation",
      "Email Automation",
      "AI Agent",
      "Workflow Automation",
      "Email Triage",
      "Human-in-the-Loop"
    ],
    mediaUrl: projectEmailTriageOverviewImg,
    demoUrl: "[https://github.com/abdullxxhi/AI-Email-Triage-Response](https://github.com/abdullxxhi/AI-Email-Triage-Response)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Automatically retrieves and processes unread Gmail messages.",
      "Uses Google Gemini to analyze email content and determine category, priority, and intent.",
      "Classifies emails into Sales, Support, Urgent, and General categories.",
      "Routes emails automatically based on the AI classification.",
      "Generates appropriate responses based on the email category and intent.",
      "Flags urgent emails for human attention.",
      "Marks successfully processed emails as read.",
      "Tested all four classification branches to verify that the routing logic works as expected."
    ],
    automationScreenshots: [
      {
        image: projectEmailTriageOverviewImg,
        title: "AI Email Triage Workflow Overview",
        caption: "Shows the complete n8n workflow connecting Gmail, Google Gemini, AI classification, routing logic, response generation, and email processing."
      },
      {
        image: projectEmailSalesRoutingImg,
        title: "Sales Email Routing",
        caption: "Shows an email classified as Sales and routed through the appropriate automation branch for sales-related messages."
      },
      {
        image: projectEmailSupportRoutingImg,
        title: "Support Email Routing",
        caption: "Shows an email classified as Support and routed through the support-specific automation branch."
      },
      {
        image: projectEmailUrgentRoutingImg,
        title: "Urgent Email Routing",
        caption: "Shows an email classified as Urgent and routed through the urgent handling branch for messages requiring immediate attention."
      },
      {
        image: projectEmailGeneralRoutingImg,
        title: "General Email Routing",
        caption: "Shows an email classified as General and routed through the general email handling branch."
      },
      {
        image: projectEmailUrgentLabelImg,
        title: "AI Urgent Email Classification",
        caption: "Shows Google Gemini identifying an urgent email and applying the urgent classification so the workflow can flag it for human attention."
      }
    ]
  },

  {
    id: "proj-12",
    title: "Product Quality Control Data Cleaning & Validation",
    category: "Data Automation",
    featured: true,
    description: "Built an n8n automation workflow designed to validate, clean, standardize, and quality-check a Product Quality Control dataset. The workflow processes a messy source CSV, identifies structural and data-quality issues, applies safe corrections, flags records that require human review, generates a quality summary and report, and saves a cleaned CSV.",
    tags: [
      "n8n",
      "JavaScript",
      "CSV",
      "Data Cleaning",
      "Data Validation",
      "Data Quality",
      "Automation",
      "Human-in-the-Loop"
    ],
    mediaUrl: projectQualityControlWorkflowImg,
    demoUrl: "[https://github.com/abdullxxhi/Product-Quality-Control-Data-Cleaning-Validation](https://github.com/abdullxxhi/Product-Quality-Control-Data-Cleaning-Validation)",
    githubUrl: "[https://github.com/abdullxxhi](https://github.com/abdullxxhi)",
    keyHighlights: [
      "Validates CSV structure and prepares valid records for processing.",
      "Detects invalid dates, numeric values, production counts, QC results, and defect information.",
      "Standardizes QC results and corrects defect types where the intended value can be determined safely.",
      "Preserves questionable production values instead of inventing corrections and flags them for human review.",
      "Processes 943 valid records, with 525 records cleaned and 320 records flagged for review.",
      "Generates a quality summary and report showing the changes, issues, and validation results.",
      "Creates and saves a cleaned CSV while maintaining an audit trail of data-quality corrections."
    ],
    automationScreenshots: [
      {
        image: projectQualityControlWorkflowImg,
        title: "Data Cleaning & Validation Workflow",
        caption: "Shows the complete n8n workflow used to validate the source CSV, detect data-quality issues, clean records, generate a quality summary, create the cleaned dataset, and save the resulting files."
      },
      {
        image: projectQualityControlSourceImg,
        title: "Source Data Quality",
        caption: "Shows the original messy Product Quality Control dataset and its data-quality issues, including missing data identified during the quality assessment."
      },
      {
        image: projectQualityControlCleanedImg,
        title: "Cleaned Product Quality Dataset",
        caption: "Shows the cleaned dataset produced after validation, standardization, and safe data-quality corrections."
      },
      {
        image: projectQualityControlReportImg,
        title: "Data Quality Report",
        caption: "Shows the generated quality report summarizing records processed, corrections made, data-quality issues identified, and records requiring human review."
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
    image: alxCertificateIMG,
    credentialUrl: "[https://savanna.alxafrica.com/certificates/59TRPhyBSL](https://savanna.alxafrica.com/certificates/59TRPhyBSL)",
    skillsLearned: [
      "SQL",
      "Data Analytics",
      "Power BI",
      "Exploratory Data Analysis",
      "Problem Solving"
    ]
  },
  {
    id: "cert-2",
    title: "AI Automation Training",
    issuer: "AI Automation Institute",
    date: "2026",
    status: "Completed",
    image: fadaqaImg,
    skillsLearned: [
      "AI Workflow Automation",
      "Google Apps Script",
      "AI Agents",
      "Prompt Engineering",
      "Process Optimization"
    ]
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
    role: "Data Analyst",
    company: "CR8US Studio Africa",
    period: "2026",
    type: "Remote",
    achievements: [
      "Data collection, cleaning, labelling, structuring, and analysis tasks in support of CR8US Intelligence."
    ]
  }
];
