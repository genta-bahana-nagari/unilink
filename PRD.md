# Product Requirements Document (PRD)
## UniLink - Outsourcing Platform (Frontend Only)

---

## Document Information

| Property | Value |
|----------|-------|
| **Project Name** | UniLink |
| **Document Version** | 1.0.0 |
| **Status** | Development Ready |
| **Last Updated** | 2026-09-09 |
| **Author** | Product Team |
| **Project Type** | Frontend Only (Next.js) |
| **Data Source** | Dummy/Mock Data |

---

## 1. Executive Summary

### 1.1 Product Vision
UniLink is a comprehensive outsourcing platform frontend that connects three primary user roles (Admin, Organizer, and Participant) through a unified opportunity system. The platform streamlines the creation, management, and participation in events and research opportunities using mock data.

### 1.2 Key Innovation
- **Unified Opportunity System**: Events and Research are treated as a single entity type with type-specific properties
- **Shared Components**: Common logic and UI components for all opportunity types
- **Role-Based Access**: Distinct dashboards and capabilities for each user role

### 1.3 Target Users

| Role | Primary Responsibilities |
|------|------------------------|
| **Administrator** | User management, approvals, platform monitoring |
| **Organizer** | Create and manage events/research, review applications |
| **Participant** | Explore opportunities, apply, track applications |

---

## 2. Technical Stack

### 2.1 Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 15.x |
| Language | TypeScript | Latest |
| UI Library | React | 19.x |
| Styling | Tailwind CSS | 3.x |
| Icons | Lucide React | Latest |
| Package Manager | npm/yarn | Latest |
| State Management | React Hooks | - |
| Data Source | Mock Data (JSON) | - |

### 2.2 Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│                   App Router                    │
├─────────────────────────────────────────────────┤
│              Route Groups (public, auth)        │
├─────────────────────────────────────────────────┤
│      Domain Components (events, research)       │
├─────────────────────────────────────────────────┤
│         Shared Components (opportunity)         │
├─────────────────────────────────────────────────┤
│          Base UI Components (ui/)               │
├─────────────────────────────────────────────────┤
│         Service Layer (lib/mock-api)            │
└─────────────────────────────────────────────────┘
```

### 2.3 Data Flow Architecture

```
Component → Hook → Service → Mock Data
```

### 2.4 Frontend-Only Scope

This project is **frontend only** with the following characteristics:

- All data is stored in mock files (JSON/TypeScript arrays)
- No database or backend API required
- Authentication is simulated using localStorage
- CRUD operations work on in-memory mock data
- All components are built with dummy data

---

## 3. Complete Project Structure

```
outsourcing-platform/
│
├── public/
│   └── images/
│       ├── events/
│       ├── research/
│       └── avatars/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── research/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── announcements/
│   │   │       └── page.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── organizers/
│   │   │   │   └── page.tsx
│   │   │   ├── events/
│   │   │   │   └── page.tsx
│   │   │   ├── research/
│   │   │   │   └── page.tsx
│   │   │   ├── announcements/
│   │   │   │   └── page.tsx
│   │   │   └── approvals/
│   │   │       └── page.tsx
│   │   │
│   │   ├── organizer/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── events/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── edit/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── applicants/
│   │   │   │           └── page.tsx
│   │   │   ├── research/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── edit/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── applicants/
│   │   │   │           └── page.tsx
│   │   │   └── announcements/
│   │   │       ├── page.tsx
│   │   │       └── create/
│   │   │           └── page.tsx
│   │   │
│   │   └── participant/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── explore/
│   │       │   └── page.tsx
│   │       ├── applications/
│   │       │   └── page.tsx
│   │       └── profile/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── pagination.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── public-navbar.tsx
│   │   │   ├── dashboard-sidebar.tsx
│   │   │   ├── dashboard-header.tsx
│   │   │   ├── mobile-sidebar.tsx
│   │   │   └── footer.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── stat-card.tsx
│   │   │   ├── activity-list.tsx
│   │   │   └── welcome-card.tsx
│   │   │
│   │   ├── opportunity/
│   │   │   ├── opportunity-card.tsx
│   │   │   ├── opportunity-grid.tsx
│   │   │   ├── opportunity-filter.tsx
│   │   │   ├── opportunity-search.tsx
│   │   │   └── opportunity-detail.tsx
│   │   │
│   │   ├── events/
│   │   │   ├── event-form.tsx
│   │   │   ├── event-card.tsx
│   │   │   └── event-table.tsx
│   │   │
│   │   ├── research/
│   │   │   ├── research-form.tsx
│   │   │   ├── research-card.tsx
│   │   │   └── research-table.tsx
│   │   │
│   │   ├── announcements/
│   │   │   ├── announcement-card.tsx
│   │   │   ├── announcement-form.tsx
│   │   │   └── announcement-table.tsx
│   │   │
│   │   ├── applications/
│   │   │   ├── application-card.tsx
│   │   │   ├── application-table.tsx
│   │   │   └── application-status.tsx
│   │   │
│   │   └── applicants/
│   │       ├── applicant-table.tsx
│   │       └── applicant-detail.tsx
│   │
│   ├── data/
│   │   ├── users.ts
│   │   ├── events.ts
│   │   ├── research.ts
│   │   ├── announcements.ts
│   │   └── applications.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── event.ts
│   │   ├── research.ts
│   │   ├── announcement.ts
│   │   ├── application.ts
│   │   └── opportunity.ts
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-events.ts
│   │   ├── use-research.ts
│   │   ├── use-applications.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── mock-api.ts
│   │   └── storage.ts
│   │
│   └── config/
│       ├── navigation.ts
│       └── site.ts
│
├── .env.local
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. Design System

### 4.1 Colors (CSS Variables)

```css
:root {
  /* Base */
  --background: #ffffff;
  --foreground: #171717;
  
  /* Primary */
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  
  /* Secondary */
  --secondary: #64748b;
  
  /* UI */
  --border: #e2e8f0;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  
  /* Status */
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;
  
  /* Spacing */
  --radius: 10px;
}
```

### 4.2 Typography Scale

| Element | Size |
|---------|------|
| Heading 1 | 24px |
| Heading 2 | 20px |
| Heading 3 | 18px |
| Body Text | 16px |
| Body Small | 14px |
| Label Text | 13px |
| Caption | 12px |

### 4.3 Spacing System

| Token | Value |
|-------|-------|
| Space 1 | 4px |
| Space 2 | 8px |
| Space 3 | 12px |
| Space 4 | 16px |
| Space 5 | 20px |
| Space 6 | 24px |
| Space 7 | 32px |
| Space 8 | 48px |
| Space 9 | 64px |

---

## 5. Core Components Implementation

### 5.1 Button Component

```tsx
// src/components/ui/button.tsx
"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium transition";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400",
    outline: "border border-slate-300 bg-white hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    ghost: "hover:bg-slate-100 disabled:text-slate-400",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-12 px-6 text-base rounded-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 5.2 Input Component

```tsx
// src/components/ui/input.tsx
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <input
        className={`
          w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5
          text-sm outline-none transition placeholder:text-slate-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          disabled:bg-slate-50 disabled:text-slate-400
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

### 5.3 Card Component

```tsx
// src/components/ui/card.tsx
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-slate-200 bg-white shadow-sm
        ${hover ? "hover:shadow-md transition-shadow" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
```

### 5.4 Badge Component

```tsx
// src/components/ui/badge.tsx
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}
```

### 5.5 Textarea Component

```tsx
// src/components/ui/textarea.tsx
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <textarea
        className={`
          w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5
          text-sm outline-none transition placeholder:text-slate-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          disabled:bg-slate-50 disabled:text-slate-400
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

### 5.6 Select Component

```tsx
// src/components/ui/select.tsx
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  error?: string;
  placeholder?: string;
}

export function Select({
  label,
  options,
  error,
  placeholder = "Select an option",
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <select
        className={`
          w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5
          text-sm outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
          disabled:bg-slate-50 disabled:text-slate-400
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
```

### 5.7 Checkbox Component

```tsx
// src/components/ui/checkbox.tsx
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        className={`
          h-4 w-4 rounded border-slate-300 text-blue-600
          focus:ring-2 focus:ring-blue-100
          disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  );
}
```

### 5.8 Modal Component

```tsx
// src/components/ui/modal.tsx
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={20} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
```

### 5.9 Avatar Component

```tsx
// src/components/ui/avatar.tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, alt, fallback, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-slate-200 overflow-hidden flex-shrink-0`}
    >
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-600">
          {fallback?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>
  );
}
```

### 5.10 Spinner Component

```tsx
// src/components/ui/spinner.tsx
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md" }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        animate-spin rounded-full border-slate-300 border-t-blue-600
      `}
    />
  );
}
```

---

## 6. Complete Type System

### 6.1 Opportunity Type

```tsx
// src/types/opportunity.ts
export type OpportunityType = "EVENT" | "RESEARCH";
export type OpportunityStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | "CLOSED";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  organizerId: string;
  category: string;
  status: OpportunityStatus;
  createdAt: string;
  deadline?: string;
  image?: string;
}
```

### 6.2 User Type

```tsx
// src/types/user.ts
export type UserRole = "ADMIN" | "ORGANIZER" | "PARTICIPANT";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  bio?: string;
  organization?: string;
}
```

### 6.3 Event Type

```tsx
// src/types/event.ts
import { Opportunity } from "./opportunity";

export interface Event extends Opportunity {
  type: "EVENT";
  location: string;
  startDate: string;
  endDate: string;
  quota: number;
  registeredCount: number;
  isOnline?: boolean;
  meetingLink?: string;
}
```

### 6.4 Research Type

```tsx
// src/types/research.ts
import { Opportunity } from "./opportunity";

export interface Research extends Opportunity {
  type: "RESEARCH";
  researcher: string;
  requiredParticipants: number;
  currentParticipants: number;
  criteria: string[];
  compensation?: string;
  duration?: string;
}
```

### 6.5 Application Type

```tsx
// src/types/application.ts
export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export interface Application {
  id: string;
  applicantId: string;
  opportunityId: string;
  opportunityType: "EVENT" | "RESEARCH";
  status: ApplicationStatus;
  appliedAt: string;
  motivation: string;
  updatedAt?: string;
  feedback?: string;
}
```

### 6.6 Announcement Type

```tsx
// src/types/announcement.ts
export type AnnouncementType = "INFO" | "UPDATE" | "IMPORTANT";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  authorId: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}
```

---

## 7. Mock Data

### 7.1 Users Data

```tsx
// src/data/users.ts
import { User } from "@/types/user";

export const users: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@unilink.com",
    role: "ADMIN",
    status: "ACTIVE",
    avatar: "/images/avatars/admin.jpg",
    createdAt: "2026-01-01T00:00:00Z",
    bio: "Platform Administrator",
  },
  {
    id: "user-2",
    name: "Tech Conference Organizer",
    email: "organizer@unilink.com",
    role: "ORGANIZER",
    status: "ACTIVE",
    avatar: "/images/avatars/organizer-1.jpg",
    createdAt: "2026-01-15T00:00:00Z",
    bio: "Organizing tech events since 2020",
    organization: "Tech Events Inc",
  },
  {
    id: "user-3",
    name: "Research Lead",
    email: "research@unilink.com",
    role: "ORGANIZER",
    status: "ACTIVE",
    avatar: "/images/avatars/organizer-2.jpg",
    createdAt: "2026-02-01T00:00:00Z",
    bio: "PhD in Computer Science",
    organization: "University Research Lab",
  },
  {
    id: "user-4",
    name: "John Participant",
    email: "john@example.com",
    role: "PARTICIPANT",
    status: "ACTIVE",
    avatar: "/images/avatars/participant-1.jpg",
    createdAt: "2026-03-01T00:00:00Z",
    bio: "Software Developer",
  },
  {
    id: "user-5",
    name: "Jane Developer",
    email: "jane@example.com",
    role: "PARTICIPANT",
    status: "ACTIVE",
    avatar: "/images/avatars/participant-2.jpg",
    createdAt: "2026-03-15T00:00:00Z",
    bio: "Frontend Developer & Designer",
  },
];
```

### 7.2 Events Data

```tsx
// src/data/events.ts
import { Event } from "@/types/event";

export const events: Event[] = [
  {
    id: "event-1",
    title: "AI Technology Conference 2026",
    description: "Join the premier AI conference featuring top researchers and industry leaders. Explore cutting-edge developments in machine learning, natural language processing, and computer vision.",
    type: "EVENT",
    organizerId: "user-2",
    category: "Technology",
    status: "PUBLISHED",
    location: "San Francisco, CA",
    startDate: "2026-09-15T09:00:00Z",
    endDate: "2026-09-17T18:00:00Z",
    quota: 500,
    registeredCount: 342,
    createdAt: "2026-08-01T00:00:00Z",
    deadline: "2026-09-10T23:59:59Z",
    image: "/images/events/ai-conference.jpg",
    isOnline: false,
  },
  {
    id: "event-2",
    title: "UX Design Workshop",
    description: "Hands-on workshop covering user-centered design principles, prototyping, and user testing. Perfect for designers and product managers.",
    type: "EVENT",
    organizerId: "user-2",
    category: "Design",
    status: "PUBLISHED",
    location: "Online",
    startDate: "2026-10-05T10:00:00Z",
    endDate: "2026-10-06T17:00:00Z",
    quota: 100,
    registeredCount: 67,
    createdAt: "2026-08-15T00:00:00Z",
    deadline: "2026-10-01T23:59:59Z",
    image: "/images/events/ux-workshop.jpg",
    isOnline: true,
    meetingLink: "https://meet.google.com/abc-def-ghi",
  },
  {
    id: "event-3",
    title: "Startup Pitch Competition",
    description: "Showcase your startup to a panel of investors and industry experts. Winner receives funding and mentorship opportunities.",
    type: "EVENT",
    organizerId: "user-3",
    category: "Business",
    status: "PENDING",
    location: "New York, NY",
    startDate: "2026-11-10T14:00:00Z",
    endDate: "2026-11-10T20:00:00Z",
    quota: 50,
    registeredCount: 12,
    createdAt: "2026-09-01T00:00:00Z",
    deadline: "2026-11-05T23:59:59Z",
    image: "/images/events/pitch-competition.jpg",
    isOnline: false,
  },
];
```

### 7.3 Research Data

```tsx
// src/data/research.ts
import { Research } from "@/types/research";

export const research: Research[] = [
  {
    id: "research-1",
    title: "Mental Health Impact of Remote Work",
    description: "Comprehensive study examining the psychological effects of remote work on software developers. Includes surveys, interviews, and biometric data analysis.",
    type: "RESEARCH",
    organizerId: "user-3",
    category: "Health & Psychology",
    status: "PUBLISHED",
    researcher: "Dr. Sarah Thompson, PhD",
    requiredParticipants: 200,
    currentParticipants: 156,
    criteria: [
      "Software developer with 2+ years experience",
      "Working remotely at least 3 days/week",
      "Age 25-45",
      "English fluency",
    ],
    compensation: "$50 Amazon gift card",
    createdAt: "2026-07-01T00:00:00Z",
    deadline: "2026-10-15T23:59:59Z",
    image: "/images/research/remote-work.jpg",
    duration: "3 months",
  },
  {
    id: "research-2",
    title: "Sustainable Energy Adoption Study",
    description: "Research on factors influencing the adoption of sustainable energy solutions in urban environments. Focus on behavioral economics and policy interventions.",
    type: "RESEARCH",
    organizerId: "user-3",
    category: "Environmental Science",
    status: "PUBLISHED",
    researcher: "Dr. Michael Chen",
    requiredParticipants: 300,
    currentParticipants: 89,
    criteria: [
      "Homeowner or renter",
      "Located in urban area",
      "Interest in sustainability",
      "Able to attend 2 interviews",
    ],
    compensation: "Study results and $25 gift card",
    createdAt: "2026-07-15T00:00:00Z",
    deadline: "2026-11-30T23:59:59Z",
    image: "/images/research/sustainable-energy.jpg",
    duration: "6 months",
  },
  {
    id: "research-3",
    title: "AI Ethics in Healthcare",
    description: "Examining the ethical implications of AI implementation in healthcare settings. Includes patient perspectives, practitioner interviews, and policy analysis.",
    type: "RESEARCH",
    organizerId: "user-3",
    category: "Healthcare & Technology",
    status: "PENDING",
    researcher: "Prof. Emily Rodriguez",
    requiredParticipants: 150,
    currentParticipants: 0,
    criteria: [
      "Healthcare professional",
      "Experience with AI/technology",
      "Willing to participate in interviews",
    ],
    compensation: "$100 honorarium",
    createdAt: "2026-09-01T00:00:00Z",
    deadline: "2026-12-15T23:59:59Z",
    image: "/images/research/ai-healthcare.jpg",
    duration: "4 months",
  },
];
```

### 7.4 Announcements Data

```tsx
// src/data/announcements.ts
import { Announcement } from "@/types/announcement";

export const announcements: Announcement[] = [
  {
    id: "announce-1",
    title: "Platform Launch Announcement",
    content: "We are excited to announce the official launch of UniLink! Explore opportunities, connect with organizers, and participate in exciting events and research.",
    type: "INFO",
    authorId: "user-1",
    createdAt: "2026-09-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "announce-2",
    title: "New Feature: Application Tracking",
    content: "Track all your applications in one place! We've added a new dashboard feature that shows the status of all your applications at a glance.",
    type: "UPDATE",
    authorId: "user-1",
    createdAt: "2026-09-05T00:00:00Z",
    isActive: true,
  },
  {
    id: "announce-3",
    title: "Maintenance Scheduled",
    content: "UniLink will be undergoing maintenance on September 20th from 2:00 AM to 4:00 AM EST. The platform will be temporarily unavailable.",
    type: "IMPORTANT",
    authorId: "user-1",
    createdAt: "2026-09-10T00:00:00Z",
    expiresAt: "2026-09-21T00:00:00Z",
    isActive: true,
  },
];
```

### 7.5 Applications Data

```tsx
// src/data/applications.ts
import { Application } from "@/types/application";

export const applications: Application[] = [
  {
    id: "app-1",
    applicantId: "user-4",
    opportunityId: "event-1",
    opportunityType: "EVENT",
    status: "ACCEPTED",
    appliedAt: "2026-08-15T10:30:00Z",
    motivation: "I'm passionate about AI and would love to learn from industry experts.",
    updatedAt: "2026-08-20T14:00:00Z",
  },
  {
    id: "app-2",
    applicantId: "user-5",
    opportunityId: "event-1",
    opportunityType: "EVENT",
    status: "PENDING",
    appliedAt: "2026-08-20T09:15:00Z",
    motivation: "As a developer, I'm excited about the AI topics and networking opportunities.",
  },
  {
    id: "app-3",
    applicantId: "user-4",
    opportunityId: "research-1",
    opportunityType: "RESEARCH",
    status: "REVIEWING",
    appliedAt: "2026-08-10T11:00:00Z",
    motivation: "I've been working remotely for 3 years and would love to contribute to this research.",
    updatedAt: "2026-08-25T16:30:00Z",
  },
  {
    id: "app-4",
    applicantId: "user-5",
    opportunityId: "research-1",
    opportunityType: "RESEARCH",
    status: "REJECTED",
    appliedAt: "2026-08-12T14:45:00Z",
    motivation: "Interested in how remote work affects mental health.",
    updatedAt: "2026-08-28T10:00:00Z",
    feedback: "We have reached our participant limit for this study.",
  },
];
```

---

## 8. Service Layer (Mock API)

```tsx
// src/lib/mock-api.ts
import { events } from "@/data/events";
import { research } from "@/data/research";
import { users } from "@/data/users";
import { applications } from "@/data/applications";
import { announcements } from "@/data/announcements";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { User } from "@/types/user";
import { Application } from "@/types/application";
import { Announcement } from "@/types/announcement";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // ============ USERS ============
  async getUsers(): Promise<User[]> {
    await delay();
    return [...users];
  },

  async getUserById(id: string): Promise<User | undefined> {
    await delay();
    return users.find(u => u.id === id);
  },

  async getUsersByRole(role: string): Promise<User[]> {
    await delay();
    return users.filter(u => u.role === role);
  },

  async createUser(userData: Partial<User>): Promise<User> {
    await delay();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "PARTICIPANT",
      status: "PENDING",
      createdAt: new Date().toISOString(),
      avatar: userData.avatar,
      bio: userData.bio,
      organization: userData.organization,
    };
    users.push(newUser);
    return newUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    await delay();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    users[index] = { ...users[index], ...updates };
    return users[index];
  },

  // ============ EVENTS ============
  async getEvents(): Promise<Event[]> {
    await delay();
    return [...events];
  },

  async getEventById(id: string): Promise<Event | undefined> {
    await delay();
    return events.find(e => e.id === id);
  },

  async getEventsByOrganizer(organizerId: string): Promise<Event[]> {
    await delay();
    return events.filter(e => e.organizerId === organizerId);
  },

  async getPublishedEvents(): Promise<Event[]> {
    await delay();
    return events.filter(e => e.status === "PUBLISHED");
  },

  async createEvent(eventData: Partial<Event>): Promise<Event> {
    await delay();
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: eventData.title || "",
      description: eventData.description || "",
      type: "EVENT",
      organizerId: eventData.organizerId || "",
      category: eventData.category || "General",
      status: eventData.status || "DRAFT",
      location: eventData.location || "",
      startDate: eventData.startDate || new Date().toISOString(),
      endDate: eventData.endDate || new Date().toISOString(),
      quota: eventData.quota || 0,
      registeredCount: 0,
      createdAt: new Date().toISOString(),
      deadline: eventData.deadline,
      image: eventData.image,
      isOnline: eventData.isOnline || false,
      meetingLink: eventData.meetingLink,
    };
    events.push(newEvent);
    return newEvent;
  },

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | undefined> {
    await delay();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return undefined;
    events[index] = { ...events[index], ...updates };
    return events[index];
  },

  async deleteEvent(id: string): Promise<boolean> {
    await delay();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
  },

  // ============ RESEARCH ============
  async getResearch(): Promise<Research[]> {
    await delay();
    return [...research];
  },

  async getResearchById(id: string): Promise<Research | undefined> {
    await delay();
    return research.find(r => r.id === id);
  },

  async getResearchByOrganizer(organizerId: string): Promise<Research[]> {
    await delay();
    return research.filter(r => r.organizerId === organizerId);
  },

  async getPublishedResearch(): Promise<Research[]> {
    await delay();
    return research.filter(r => r.status === "PUBLISHED");
  },

  async createResearch(researchData: Partial<Research>): Promise<Research> {
    await delay();
    const newResearch: Research = {
      id: `research-${Date.now()}`,
      title: researchData.title || "",
      description: researchData.description || "",
      type: "RESEARCH",
      organizerId: researchData.organizerId || "",
      category: researchData.category || "General",
      status: researchData.status || "DRAFT",
      researcher: researchData.researcher || "",
      requiredParticipants: researchData.requiredParticipants || 0,
      currentParticipants: 0,
      criteria: researchData.criteria || [],
      compensation: researchData.compensation,
      createdAt: new Date().toISOString(),
      deadline: researchData.deadline,
      image: researchData.image,
      duration: researchData.duration,
    };
    research.push(newResearch);
    return newResearch;
  },

  async updateResearch(id: string, updates: Partial<Research>): Promise<Research | undefined> {
    await delay();
    const index = research.findIndex(r => r.id === id);
    if (index === -1) return undefined;
    research[index] = { ...research[index], ...updates };
    return research[index];
  },

  async deleteResearch(id: string): Promise<boolean> {
    await delay();
    const index = research.findIndex(r => r.id === id);
    if (index === -1) return false;
    research.splice(index, 1);
    return true;
  },

  // ============ APPLICATIONS ============
  async getApplications(): Promise<Application[]> {
    await delay();
    return [...applications];
  },

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    await delay();
    return applications.filter(a => a.applicantId === userId);
  },

  async getApplicationsByOpportunity(opportunityId: string): Promise<Application[]> {
    await delay();
    return applications.filter(a => a.opportunityId === opportunityId);
  },

  async createApplication(applicationData: Partial<Application>): Promise<Application> {
    await delay();
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      applicantId: applicationData.applicantId || "",
      opportunityId: applicationData.opportunityId || "",
      opportunityType: applicationData.opportunityType || "EVENT",
      status: "PENDING",
      appliedAt: new Date().toISOString(),
      motivation: applicationData.motivation || "",
    };
    applications.push(newApplication);
    return newApplication;
  },

  async updateApplication(id: string, updates: Partial<Application>): Promise<Application | undefined> {
    await delay();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    applications[index] = { ...applications[index], ...updates, updatedAt: new Date().toISOString() };
    return applications[index];
  },

  async deleteApplication(id: string): Promise<boolean> {
    await delay();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return false;
    applications.splice(index, 1);
    return true;
  },

  // ============ ANNOUNCEMENTS ============
  async getAnnouncements(): Promise<Announcement[]> {
    await delay();
    return announcements.filter(a => a.isActive);
  },

  async getAnnouncementById(id: string): Promise<Announcement | undefined> {
    await delay();
    return announcements.find(a => a.id === id);
  },

  async createAnnouncement(announcementData: Partial<Announcement>): Promise<Announcement> {
    await delay();
    const newAnnouncement: Announcement = {
      id: `announce-${Date.now()}`,
      title: announcementData.title || "",
      content: announcementData.content || "",
      type: announcementData.type || "INFO",
      authorId: announcementData.authorId || "",
      createdAt: new Date().toISOString(),
      expiresAt: announcementData.expiresAt,
      isActive: true,
    };
    announcements.push(newAnnouncement);
    return newAnnouncement;
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    await delay();
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return false;
    announcements[index].isActive = false;
    return true;
  },
};
```

---

## 9. Custom Hooks

### 9.1 Authentication Hook

```tsx
// src/hooks/use-auth.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/user";
import { api } from "@/lib/mock-api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedRole && storedUserId) {
      setRole(storedRole);
      api.getUserById(storedUserId).then(userData => {
        if (userData) {
          setUser(userData);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = await api.getUsers();
      const foundUser = users.find(u => u.email === email);

      if (foundUser) {
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("userId", foundUser.id);
        setUser(foundUser);
        setRole(foundUser.role);
        return { success: true, user: foundUser };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const newUser = await api.createUser(userData);
      localStorage.setItem("userRole", newUser.role);
      localStorage.setItem("userId", newUser.id);
      setUser(newUser);
      setRole(newUser.role);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setUser(null);
    setRole(null);
  }, []);

  const quickLogin = useCallback(async (roleType: string) => {
    setIsLoading(true);
    try {
      const users = await api.getUsersByRole(roleType.toUpperCase());
      if (users.length > 0) {
        const foundUser = users[0];
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("userId", foundUser.id);
        setUser(foundUser);
        setRole(foundUser.role);
        return { success: true, user: foundUser };
      }
      return { success: false, error: "No user found" };
    } catch (error) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    role,
    isLoading,
    login,
    register,
    logout,
    quickLogin,
    isAuthenticated: !!user,
  };
}
```

### 9.2 Events Hook

```tsx
// src/hooks/use-events.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Event } from "@/types/event";
import { api } from "@/lib/mock-api";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPublishedEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAllEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEvent = useCallback(async (id: string) => {
    try {
      return await api.getEventById(id);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, []);

  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    try {
      const newEvent = await api.createEvent(eventData);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    try {
      const updated = await api.updateEvent(id, updates);
      if (updated) {
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      const success = await api.deleteEvent(id);
      if (success) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    isLoading,
    error,
    loadEvents,
    loadAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
```

### 9.3 Research Hook

```tsx
// src/hooks/use-research.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Research } from "@/types/research";
import { api } from "@/lib/mock-api";

export function useResearch() {
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPublishedResearch();
      setResearch(data);
    } catch (err) {
      setError("Failed to load research");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAllResearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getResearch();
      setResearch(data);
    } catch (err) {
      setError("Failed to load research");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getResearch = useCallback(async (id: string) => {
    try {
      return await api.getResearchById(id);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, []);

  const createResearch = useCallback(async (researchData: Partial<Research>) => {
    try {
      const newResearch = await api.createResearch(researchData);
      setResearch(prev => [newResearch, ...prev]);
      return newResearch;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateResearch = useCallback(async (id: string, updates: Partial<Research>) => {
    try {
      const updated = await api.updateResearch(id, updates);
      if (updated) {
        setResearch(prev => prev.map(r => r.id === id ? updated : r));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteResearch = useCallback(async (id: string) => {
    try {
      const success = await api.deleteResearch(id);
      if (success) {
        setResearch(prev => prev.filter(r => r.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadResearch();
  }, [loadResearch]);

  return {
    research,
    isLoading,
    error,
    loadResearch,
    loadAllResearch,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
  };
}
```

### 9.4 Applications Hook

```tsx
// src/hooks/use-applications.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { Application } from "@/types/application";
import { api } from "@/lib/mock-api";

export function useApplications(userId?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (userId) {
        data = await api.getApplicationsByUser(userId);
      } else {
        data = await api.getApplications();
      }
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const getApplicationsForOpportunity = useCallback(async (opportunityId: string) => {
    try {
      return await api.getApplicationsByOpportunity(opportunityId);
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const createApplication = useCallback(async (applicationData: Partial<Application>) => {
    try {
      const newApplication = await api.createApplication(applicationData);
      setApplications(prev => [newApplication, ...prev]);
      return newApplication;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateApplication = useCallback(async (id: string, updates: Partial<Application>) => {
    try {
      const updated = await api.updateApplication(id, updates);
      if (updated) {
        setApplications(prev => prev.map(a => a.id === id ? updated : a));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteApplication = useCallback(async (id: string) => {
    try {
      const success = await api.deleteApplication(id);
      if (success) {
        setApplications(prev => prev.filter(a => a.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return {
    applications,
    isLoading,
    error,
    loadApplications,
    getApplicationsForOpportunity,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}
```

### 9.5 Mobile Detection Hook

```tsx
// src/hooks/use-mobile.ts
"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile, isTablet };
}
```

---

## 10. Navigation Configuration

```tsx
// src/config/navigation.ts
import {
  LayoutDashboard,
  Users,
  Calendar,
  FlaskConical,
  Bell,
  CheckCircle,
  User,
  ListChecks,
  Megaphone,
  Search,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: any;
  exact?: boolean;
}

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Organizers", href: "/admin/organizers", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Research", href: "/admin/research", icon: FlaskConical },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
  { label: "Approvals", href: "/admin/approvals", icon: CheckCircle },
];

export const organizerNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/organizer", icon: LayoutDashboard, exact: true },
  { label: "Events", href: "/organizer/events", icon: Calendar },
  { label: "Research", href: "/organizer/research", icon: FlaskConical },
  { label: "Announcements", href: "/organizer/announcements", icon: Megaphone },
  { label: "Profile", href: "/organizer/profile", icon: User },
];

export const participantNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/participant", icon: LayoutDashboard, exact: true },
  { label: "Explore", href: "/participant/explore", icon: Search },
  { label: "Applications", href: "/participant/applications", icon: ListChecks },
  { label: "Profile", href: "/participant/profile", icon: User },
];

export const publicNavigation: NavigationItem[] = [
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Research", href: "/research", icon: FlaskConical },
  { label: "Announcements", href: "/announcements", icon: Bell },
];

export function getNavigationByRole(role: string | null): NavigationItem[] {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return adminNavigation;
    case "ORGANIZER":
      return organizerNavigation;
    case "PARTICIPANT":
      return participantNavigation;
    default:
      return publicNavigation;
  }
}
```

---

## 11. Core Page Components

### 11.1 Login Page

```tsx
// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, quickLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success && result.user) {
      router.push(`/${result.user.role.toLowerCase()}`);
    } else {
      alert(result.error || "Login failed");
    }
  };

  const handleQuickLogin = async (role: string) => {
    const result = await quickLogin(role);
    if (result.success && result.user) {
      router.push(`/${result.user.role.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center mb-3">
            Quick Login (Development)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("admin")}
            >
              Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("organizer")}
            >
              Organizer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("participant")}
            >
              Participant
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

### 11.2 Dashboard Sidebar

```tsx
// src/components/layout/dashboard-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  items: NavigationItem[];
  role: string;
}

export function DashboardSidebar({ items, role }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex-shrink-0 hidden md:block">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">UniLink</h1>
        <p className="text-sm text-slate-500 capitalize mt-1">{role}</p>
      </div>

      <nav className="p-4 space-y-1">
        {items.map(item => {
          const isActive = pathname === item.href ||
            (pathname.startsWith(item.href + "/") && !item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

---

## 12. Implementation Roadmap

### Phase 1: Foundation (Days 1-2)

**Step 1: Project Setup**
```bash
npx create-next-app@latest outsourcing-platform
# Select: TypeScript, ESLint, Tailwind CSS, src/ directory, App Router

cd outsourcing-platform
npm run dev
```

**Step 2: Install Dependencies**
```bash
npm install lucide-react
```

**Step 3: Design System Setup**
- Update `src/app/globals.css` with CSS variables
- Create base UI components in `src/components/ui/`

**Step 4: Type Definitions**
- Create all type definitions in `src/types/`

**Step 5: Create Mock Data**
- Create mock data in `src/data/`

**Step 6: Service Layer**
- Create `src/lib/mock-api.ts` with CRUD operations

### Phase 2: Public Pages (Days 3-4)

**Step 7: Public Layout**
- Public navbar with navigation
- Footer component
- `src/app/(public)/layout.tsx`

**Step 8: Homepage**
- Hero section with CTA
- Featured opportunities
- How it works steps

**Step 9: Opportunity Listing**
- Events page with grid
- Research page with grid
- Announcements page

**Step 10: Opportunity Detail**
- Full description
- Key information display
- Apply button

### Phase 3: Authentication (Day 5)

**Step 11: Login Page**
- Email/password form
- Quick login buttons (dev)
- Role-based redirect

**Step 12: Register Page**
- Registration form
- Role selection

**Step 13: Auth Hook**
- Login, register, logout functions
- localStorage session management

### Phase 4: Dashboard Layout (Days 6-7)

**Step 14: Dashboard Sidebar**
- Navigation configuration
- Role-based menu items

**Step 15: Dashboard Header**
- User info display
- Mobile menu toggle

**Step 16: Role-Specific Layouts**
- Admin layout
- Organizer layout
- Participant layout

### Phase 5: Role-Specific Dashboards (Days 8-10)

**Step 17: Admin Dashboard**
- Stat cards (users, events, research)
- Pending approvals list
- Recent activity

**Step 18: Organizer Dashboard**
- My statistics
- Quick actions
- Recent applications

**Step 19: Participant Dashboard**
- Application stats
- Recommended opportunities
- Recent activity

### Phase 6: Create & Edit Forms (Days 11-13)

**Step 20: Event Form**
- Basic information
- Event details (location, dates, quota)
- Save draft / submit for approval

**Step 21: Research Form**
- Basic information
- Research details (criteria, compensation)
- Save draft / submit for approval

**Step 22: Form Pages**
- Create pages
- Edit pages

### Phase 7: Application System (Days 14-16)

**Step 23: Application Form**
- Motivation text
- Terms agreement
- Submit application

**Step 24: Application Status**
- Status badge component
- Status lifecycle

**Step 25: Application Table**
- List applications
- Status filtering
- Action buttons

### Phase 8: Approval System (Day 17)

**Step 26: Approval Listing**
- Pending opportunities
- Approve/Reject actions

### Phase 9: Applicant Management (Day 18)

**Step 27: Applicant Table**
- View applicants
- Accept/Reject applicants

### Phase 10: Announcements (Day 19)

**Step 28: Create Announcement**
- Title, content, type
- Publish announcement

**Step 29: Announcement Listing**
- Display announcements
- Type badges

### Phase 11: Polish & Responsive (Day 20)

**Step 30: Mobile Responsiveness**
- Mobile detection hook
- Mobile sidebar

**Step 31: Final Polish**
- Loading states
- Empty states
- Error handling
- Consistent styling

---

## 13. Testing Strategy

### Component Testing
- UI Components: Render variants correctly
- Form Components: Validation and submission
- List Components: Filtering and pagination

### Integration Testing
- Navigation: Routing between pages
- Authentication: Login/logout flow
- CRUD Operations: Create, read, update, delete

### User Flow Testing
- **Visitor**: Browse public pages → View opportunities → Register
- **Organizer**: Create event → View applicants → Manage applications
- **Participant**: Search opportunities → Apply → Track status
- **Admin**: Approve opportunities → Manage users → Monitor platform

---

## 14. Deployment Checklist

### Pre-deployment
- [ ] Build successful (`npm run build`)
- [ ] Type checking passes (`npx tsc --noEmit`)
- [ ] Linting passes (`npm run lint`)
- [ ] All links and navigation work
- [ ] Forms and inputs functional
- [ ] Loading states present
- [ ] Error handling implemented

### Production Readiness
- [ ] Asset optimization
- [ ] SEO metadata
- [ ] Performance monitoring

---

## 15. Future Enhancements

### Phase 2 Features
- Real Authentication (JWT, OAuth)
- Real Database (PostgreSQL with Prisma)
- File Uploads (Cloudinary/S3)
- Email Notifications
- Real-time Updates (WebSocket)
- Advanced Search (Algolia)
- Social Features (Comments, Ratings)
- Payment Integration
- Export Features (PDF, Excel)

### Performance Optimizations
- Image Optimization (Next.js Image)
- Code Splitting (Dynamic imports)
- Caching (React cache, SWR)
- Deferred Loading

---

## 16. Success Criteria

### Technical
- [ ] Project bootstrapped with Next.js 15
- [ ] TypeScript fully implemented
- [ ] Tailwind CSS configured
- [ ] Component-based architecture
- [ ] Mock data and service layer

### Functional
- [ ] Three role-based dashboards
- [ ] Public browsing and search
- [ ] CRUD operations for events/research
- [ ] Application system
- [ ] Approval workflow
- [ ] Announcement system

### User Experience
- [ ] Responsive design
- [ ] Loading and error states
- [ ] Consistent UI/UX
- [ ] Intuitive navigation
- [ ] Fast page loads

---

**End of Document**
