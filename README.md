# CrowdLink - Crowdsourcing Platform

> **Connect. Collaborate. Create Impact.**

CrowdLink is a modern, professional crowdsourcing platform built with Next.js 16, React 19, and Tailwind CSS 4. It connects organizations, researchers, and skilled participants for research studies, events, and impactful collaborations.

## Features

### For Researchers & Organizations
- **Smart Project Management** - Create and manage research studies and events
- **Participant Matching** - Find qualified participants with the right skills
- **Real-time Analytics** - Track engagement, applications, and success metrics
- **Team Collaboration** - Coordinate with your research team
- **Approval Workflows** - Manage submissions with built-in review processes

### For Participants
- **Discover Opportunities** - Browse hundreds of research studies and events
- **Personalized Recommendations** - Get matched based on your skills and interests
- **Application Tracking** - Monitor your applications in one dashboard
- **Skill Development** - Gain experience through meaningful contributions
- **Community Access** - Connect with researchers and fellow participants

### Platform Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Easy on the eyes for extended use
- **SEO Optimized** - Built-in metadata, sitemaps, and structured data
- **Accessibility First** - WCAG 2.1 compliant with keyboard navigation
- **Type-Safe** - Full TypeScript support for reliable code

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/crowdlink.git

# Navigate to project directory
cd crowdlink

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
crowdlink/
├── public/                 # Static assets
│   └── images/
│       ├── events/
│       ├── research/
│       └── avatars/
├── src/
│   ├── app/               # App Router pages
│   │   ├── (public)/      # Public routes
│   │   ├── auth/          # Authentication
│   │   ├── admin/         # Admin dashboard
│   │   ├── organizer/     # Organizer dashboard
│   │   └── participant/   # Participant dashboard
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   ├── dashboard/     # Dashboard widgets
│   │   └── [feature]/     # Feature components
│   ├── config/            # Configuration
│   ├── data/              # Mock data
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities
│   └── types/             # TypeScript types
├── tailwind.config.ts     # Tailwind configuration
├── next.config.ts         # Next.js configuration
└── package.json
```

## Design System

### Colors

The platform uses a professional color palette designed for trust and clarity:

- **Primary**: Indigo/Blue gradient (`#4c6ef5`)
- **Success**: Green (`#16a34a`)
- **Warning**: Amber (`#d97706`)
- **Danger**: Red (`#dc2626`)
- **Neutral**: Slate gray palette

### Typography

- **Headings**: Geist Sans (system font)
- **Body**: Geist Sans (system font)
- **Monospace**: Geist Mono

### Components

All UI components follow these principles:
- Accessible by default (WCAG 2.1)
- Keyboard navigable
- Screen reader friendly
- Responsive design
- Consistent styling

## User Roles

### Administrator
- Manage users and organizers
- Approve/reject submissions
- Monitor platform activity
- Configure platform settings

### Organizer
- Create and manage events/research
- Review applications
- Track participant engagement
- Manage announcements

### Participant
- Browse opportunities
- Submit applications
- Track application status
- Manage profile

## Development

### Adding a New Feature

1. Create types in `src/types/`
2. Add mock data in `src/data/`
3. Create components in `src/components/`
4. Build pages in `src/app/`
5. Add hooks in `src/hooks/` if needed

### Code Quality

- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier (recommended)
- **Types**: Strict TypeScript
- **Testing**: Add tests for critical paths

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Other Platforms

The application can be deployed to any Node.js hosting platform:

```bash
# Build
pnpm build

# Start
pnpm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [docs.crowdlink.com](https://docs.crowdlink.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/crowdlink/issues)
- **Email**: support@crowdlink.com
- **Discord**: [Join our community](https://discord.gg/crowdlink)

---

Built with ❤️ for the crowds that matter.