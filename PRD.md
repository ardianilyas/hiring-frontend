# Product Requirements Document (PRD)

## Hiring System Landing Page (Internal Company Recruitment)

**Version:** 1.0
**Project:** Internal Hiring System
**Frontend Stack:** React + TailwindCSS v4 + TypeScript + React Icons
**Target Users:** HR, Hiring Managers, Internal Employees

---

# 1. Overview

Design and build a modern landing page for an Internal Hiring System where companies can manage job postings and employees can browse internal vacancies.

The design should follow the attached reference:

* Large clean typography
* White background
* Minimalistic UI
* Rounded cards
* Modern spacing
* Centered hero section
* Premium SaaS appearance
* Black primary text
* Primary accent color:

  * Indigo
  * Purple
* Soft shadows
* Plenty of whitespace

The landing page should feel similar to Linear, Vercel, Stripe, Notion, and the provided design reference.

---

# 2. Goals

The landing page should:

* Introduce the hiring platform
* Explain its purpose
* Display available internal job openings
* Encourage HR/Admin to login
* Encourage employees to browse jobs

---

# 3. Design System

## Color Palette

Background

```
#FFFFFF
```

Primary

```
#5B3DF5
```

Secondary

```
#111827
```

Gray

```
#6B7280
```

Border

```
#E5E7EB
```

Light Section

```
#F9FAFB
```

Success

```
#10B981
```

---

## Typography

Hero

```
text-6xl
font-bold
tracking-tight
```

Section Title

```
text-4xl
font-bold
```

Paragraph

```
text-lg
text-gray-600
leading-relaxed
```

Buttons

```
font-medium
rounded-xl
```

---

## Border Radius

```
rounded-xl
rounded-2xl
rounded-3xl
```

---

## Shadow

```
shadow-sm

hover:shadow-lg
```

---

# 4. Landing Page Structure

```
Navbar

↓

Hero

↓

Job Opening Section

↓

Footer
```

---

# 5. Navbar

Height

```
80px
```

Sticky

```
Yes
```

Background

```
White
```

Shadow

```
shadow-sm
```

---

## Left

Company Logo

Example

```
HireFlow
```

---

## Center Navigation

```
Home

Jobs

Features

About

Contact
```

Desktop only.

---

## Right

Secondary Button

```
Login
```

Primary Button

```
Post a Job
```

Purple background.

---

# 6. Hero Section

Height

```
90vh
```

Centered vertically.

---

## Headline

```
Simplify Internal Hiring
and Discover Your Next Opportunity
```

Large typography.

---

## Description

Example

```
Manage internal job postings,
streamline recruitment,
and help employees find their next career move inside your organization.
```

---

## CTA Buttons

Primary

```
Browse Jobs
```

Filled Purple

Secondary

```
Post a Job
```

Outlined

---

## Hero Illustration

Below buttons.

Large rounded illustration/card.

Possible illustration:

* Office team
* Recruitment dashboard
* Hiring analytics
* Career growth

Card style like reference.

```
rounded-3xl

shadow-xl

overflow-hidden
```

---

# 7. Job Opening Section

Background

```
Gray-50
```

Padding

```
py-24
```

---

## Title

```
Open Positions
```

Subtitle

```
Explore current internal opportunities across departments.
```

---

## Grid

Desktop

```
3 columns
```

Tablet

```
2 columns
```

Mobile

```
1 column
```

Gap

```
gap-8
```

---

# 8. Job Card

Each job card contains:

Top

Department Badge

Example

```
Engineering
```

---

Job Title

Example

```
Senior Backend Engineer
```

---

Description

2–3 lines

---

Information Row

Location

```
Jakarta
```

Employment

```
Full Time
```

Experience

```
3+ Years
```

---

Bottom

Salary (optional)

```
Competitive
```

Button

```
View Details
```

---

Hover

```
Lift

Shadow

Border Purple
```

Animation

```
transition-all

duration-300
```

---

Example Cards

```
Backend Engineer

Frontend Engineer

QA Engineer

DevOps Engineer

UI/UX Designer

Product Manager
```

---

# 9. Footer

Background

```
#111827
```

White text.

Padding

```
py-16
```

---

## Left

Logo

Description

```
Internal Hiring Platform
built for modern companies.
```

---

## Middle

Navigation

```
Home

Jobs

Features

About
```

---

## Right

Contact

```
Email

Phone

Address
```

---

Bottom

Divider

```
Copyright © 2026
```

---

# 10. Responsive Design

## Mobile

Navbar

```
Hamburger menu
```

Hero

```
Stack vertically
```

Buttons

```
Full width
```

Job Cards

```
Single column
```

---

## Tablet

Two-column jobs

---

## Desktop

Centered layout

```
max-w-7xl

mx-auto
```

---

# 11. Component Structure

```
src/

components/

├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── hero/
│   ├── Hero.tsx
│   └── HeroIllustration.tsx
│
├── jobs/
│   ├── JobCard.tsx
│   ├── JobGrid.tsx
│   └── JobBadge.tsx
│
├── ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Container.tsx
│   └── SectionTitle.tsx
│
pages/
└── LandingPage.tsx
```

---

# 12. Sample Job Data

```ts
export const jobs = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Jakarta",
    type: "Full Time",
    experience: "3+ Years",
    description:
      "Build scalable backend services and APIs for internal platforms.",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full Time",
    experience: "2+ Years",
    description:
      "Develop modern and responsive web applications using React.",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "Bandung",
    type: "Full Time",
    experience: "4+ Years",
    description:
      "Collaborate with engineering and business teams to deliver product value.",
  },
];
```

---

# 13. Animations

Use subtle entrance animations for a polished SaaS feel.

* Navbar fades in on page load.
* Hero title and description slide up with a slight delay.
* CTA buttons fade in sequentially.
* Hero illustration scales in softly.
* Job cards animate upward with staggered timing as they enter the viewport.
* Buttons use smooth hover transitions.
* Cards elevate with a soft shadow and slight upward movement on hover.
* Respect the user's `prefers-reduced-motion` setting.

---

# 14. Accessibility Requirements

* Semantic HTML (`header`, `main`, `section`, `footer`, `nav`).
* Keyboard-accessible navigation and buttons.
* Visible focus indicators.
* Color contrast meeting WCAG AA.
* Proper heading hierarchy (`h1`, `h2`, etc.).
* Descriptive `aria-label`s for navigation and mobile menu controls.
* Alt text for illustrations and logos.

---

# 15. Acceptance Criteria

* Responsive on mobile, tablet, and desktop.
* Matches the clean, minimal SaaS aesthetic shown in the design reference.
* Includes a sticky navbar with navigation and CTAs.
* Hero section clearly communicates the platform's purpose and primary actions.
* Job Opening section displays responsive job cards with hover interactions.
* Footer contains navigation, company information, and contact details.
* Built with reusable React components and Tailwind CSS v4 utility classes.
* Uses consistent spacing, typography, and color tokens throughout.
* Achieves a Lighthouse Accessibility score of at least 90 for the landing page.
