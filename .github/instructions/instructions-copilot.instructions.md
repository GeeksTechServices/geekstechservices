---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

# GitHub Copilot Instructions for GeekStechServices.com

## Project Overview

This is a static Next.js 15 site using Tailwind CSS 3, Framer Motion, and shadcn/ui. The site showcases an AI-powered IoT dashboard product.

## Design Language

- Dark theme with glassmorphism
- Primary color: #b32dff
- Use backdrop blur and translucent panels
- Typography: sleek, modern sans-serif

## Component Style

- Use Tailwind utility classes
- Prefer functional components with arrow syntax
- Use Framer Motion for animations (e.g., fade-in, slide-up)
- Use shadcn/ui for buttons, modals, tabs, etc.
- Always use React-icons

## Page Structure

- Home page: Hero, Features, Benefits, CTA, Testimonials, FAQ, Footer
- Features page: Detailed breakdown of dashboard capabilities
- Pricing page: Tiered plans with toggle
- About page: Company mission and vision, Why choose us, Team section
- Contact page: Form + map, social links
- Blog page: Article grid with dynamic routing

## Coding Preferences

- Use TypeScript
- Avoid unnecessary abstraction
- Keep components lean and reusable
- Use semantic HTML

## Copilot Behavior

- Suggest Tailwind + Framer Motion animations
- Use shadcn/ui components where appropriate
- Prefer concise, readable code with comments
- Suggest responsive design patterns
- Follow best practices for accessibility (ARIA roles, alt text)
- Suggest SEO optimizations (meta tags, structured data)
- Always use framer motion for animations
- Static export will be used, so avoid server-side code
- Use Next.js 15 features and conventions
- Add detailed content for each section
- Ensure all links and buttons have hover and focus states
- Always use Chart.js for data visualization
- Must have a loading state with skeleton screens for all pages
- Data will be stored in local JSON files for this static site
- Use React Context for state management if needed
- Ensure all forms have validation and error handling
- Integrate the firebase authentication for login and signup (for the dashboard)
- Always use Glassmorphism design principles
- Default to react-icons
