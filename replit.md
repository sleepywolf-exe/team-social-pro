# Social Media OS

## Overview

Social Media OS is a comprehensive B2B SaaS platform for managing social media content across multiple channels. The application provides a unified dashboard for creating, scheduling, and analyzing social media posts across Instagram, LinkedIn, and TikTok. Built with a modern React frontend and Express backend, it features AI-powered content generation, team collaboration workflows, asset management, and detailed analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring professional B2B SaaS theming
- **State Management**: TanStack Query for server state management
- **Routing**: React Router for client-side navigation
- **Component Structure**: Modular component architecture with separate views for Dashboard, Calendar, AI Composer, Analytics, Assets, Approvals, Social Accounts, and Settings

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling
- **API Structure**: RESTful API with `/api` prefix routing
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) for development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: Drizzle-Zod integration for runtime validation

### Development and Build System
- **Monorepo Structure**: Shared types and schemas in `/shared` directory
- **Frontend Build**: Vite with React plugin for hot module replacement
- **Backend Build**: esbuild for production server bundling
- **Development Server**: Integrated Vite middleware for seamless full-stack development
- **TypeScript**: Strict configuration with path mapping for clean imports

### Component Architecture
- **Dashboard**: Centralized hub with metrics, upcoming posts, and quick actions
- **Calendar View**: Visual scheduling interface with multi-channel post management
- **AI Composer**: Content generation tool with platform-specific optimizations
- **Analytics**: Performance tracking with metrics, engagement rates, and channel comparisons
- **Asset Management**: Media library with tagging, search, and rights management
- **Approval Workflow**: Team collaboration for content review and approval
- **Social Accounts**: Platform connection management and authentication
- **Settings**: Workspace, team, and configuration management

## External Dependencies

### Database and ORM
- **Neon Database**: Serverless PostgreSQL hosting via `@neondatabase/serverless`
- **Drizzle ORM**: Type-safe database client with `drizzle-orm` and `drizzle-zod`
- **Session Storage**: PostgreSQL-based session management with `connect-pg-simple`

### UI and Design System
- **Radix UI**: Comprehensive set of accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library for consistent UI patterns
- **Class Variance Authority**: Type-safe component variant management
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast development server and build tool
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Date-fns**: Date manipulation and formatting utilities
- **Embla Carousel**: Touch-friendly carousel component

### Build and Runtime
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **React Router**: Client-side routing for single-page application