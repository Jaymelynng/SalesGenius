# Sales Genius - Lead Management Dashboard

A comprehensive sales management system designed specifically for Oasis Gymnastics to track, manage, and re-engage leads through systematic campaigns and data-driven insights.

## Project Overview and Purpose

Sales Genius is a React-based dashboard application that empowers sales managers to efficiently handle lead re-engagement, track campaign performance, and optimize enrollment processes. The system was developed to address the challenge of re-engaging 352 inactive accounts identified through comprehensive drop reports spanning August 2023 to August 2024.

The platform centralizes all sales activities into a unified interface, enabling managers to execute targeted campaigns, monitor success rates, and convert leads into enrollments through proven scripts and systematic follow-up processes.

## Primary Goals and Objectives

### Business Objectives (High Priority)
- **Lead Re-engagement**: Systematically re-engage inactive families who previously enrolled but are no longer active
- **Revenue Recovery**: Convert dormant accounts back into paying customers through targeted outreach
- **Campaign Optimization**: Achieve and maintain high success rates (target: 85%+ voicemail success rate)
- **Enrollment Growth**: Increase trial class bookings and program enrollments through structured campaigns

### Operational Efficiency Goals
- **Centralized Management**: Provide a single dashboard for all lead management activities
- **Workflow Automation**: Streamline follow-up processes and campaign execution
- **Performance Tracking**: Monitor daily metrics including trial bookings, follow-ups, and conversion rates
- **Script Standardization**: Ensure consistent messaging across all sales interactions

### User Experience Goals
- **Intuitive Navigation**: Enable quick access to all essential functions through organized sidebar navigation
- **Real-time Updates**: Provide immediate visibility into campaign results and lead status changes
- **Mobile Responsiveness**: Support sales activities across all device types
- **Visual Analytics**: Present complex data through clear charts and progress indicators

## Key Features and Functionality

### Dashboard Overview
- Daily lead summary with key metrics (6 free trials scheduled, 5 pending follow-ups)
- Campaign performance indicators and success rate tracking
- Quick action buttons for common tasks (voicemail campaigns, trial scheduling)

### Lead Management System
- Comprehensive lead tracking with status categorization (new, pending, completed, needs contact)
- Contact information management with phone and email integration
- Priority-based lead organization with visual indicators
- Detailed activity logging and follow-up scheduling

### Drop Report Analysis
- Annual inactive account reporting (352 total inactive accounts identified)
- Sibling relationship tracking (174 accounts with active siblings)
- Re-engagement campaign targeting and segmentation
- Success rate monitoring and conversion tracking

### Voicemail Campaign Manager
- Automated campaign execution with script management
- Success rate tracking (achieved 85.91% success rate from 362 calls)
- Response monitoring and follow-up coordination
- Script variations for different lead types (re-engagement, siblings, new leads)

### Camp Telethon System
- Seasonal campaign management (Winter/Summer camps)
- Promotion code tracking (THANKS15, FLEXIBLE2024)
- Revenue monitoring and conversion rate analysis
- Enrollment process streamlining with flexible payment options

### Scripts & Objection Handling
- Categorized script library (phone scripts, objection handling, voicemail, follow-up)
- Search functionality for quick script access
- Best practice guidelines and talking points
- Practice mode with audio playback simulation

### Analytics & Reporting
- Comprehensive performance dashboards with key metrics
- Campaign effectiveness analysis and trend monitoring
- Revenue tracking and conversion rate calculations
- Exportable reports for stakeholder communication

## Target Users and Use Cases

### Primary Users
- **Sales Managers**: Monitor overall performance, manage campaigns, and track team results
- **Sales Representatives**: Execute calls, manage individual leads, and access scripts
- **Gym Owners/Directors**: Review performance metrics and campaign ROI

### Key Use Cases
1. **Daily Lead Management**: Review new leads, prioritize follow-ups, and track completion status
2. **Campaign Execution**: Launch voicemail campaigns targeting specific lead segments
3. **Performance Analysis**: Monitor success rates, identify trends, and optimize strategies
4. **Script Reference**: Access proven scripts during live calls and objection handling
5. **Enrollment Tracking**: Monitor trial bookings and conversion to paid enrollments

## Success Metrics

### Quantitative Metrics
- **Voicemail Success Rate**: Target 85%+ (currently achieving 85.91%)
- **Lead Response Rate**: Track responses from voicemail campaigns
- **Trial Conversion**: Monitor free trial bookings and enrollment conversions
- **Revenue Recovery**: Measure revenue generated from re-engaged accounts
- **Campaign ROI**: Calculate return on investment for outreach efforts

### Qualitative Metrics
- **User Adoption**: Sales team utilization of dashboard features
- **Process Efficiency**: Reduction in time spent on manual lead tracking
- **Data Accuracy**: Improvement in lead information quality and completeness
- **Team Consistency**: Standardization of sales messaging and processes

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradient design system
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React hooks for component state management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # React components for each dashboard section
│   ├── Dashboard.tsx    # Main overview dashboard
│   ├── LeadManagement.tsx
│   ├── DropReport.tsx
│   ├── VoicemailCampaign.tsx
│   ├── CampTelethon.tsx
│   ├── Scripts.tsx
│   ├── Reports.tsx
│   └── Sidebar.tsx
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Contributing

This project follows standard React development practices with TypeScript for type safety and Tailwind CSS for consistent styling. All components are designed to be modular and maintainable, following the single responsibility principle.

---

*Sales Genius Dashboard - Empowering systematic lead re-engagement for Oasis Gymnastics*