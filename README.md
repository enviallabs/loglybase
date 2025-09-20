<div align="center">
  <img src="./assets/images/logo_dark.png" alt="Loglybase Logo" width="120" height="120">
  
  # Loglybase
  
  **Open Source changelog management platform for developers**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)](https://nuxt.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white)](https://www.prisma.io/)
  
  [Cloud](https://loglybase.com) • [Report Bug](https://github.com/enviallabs/loglybase/issues) • [Request Feature](https://github.com/enviallabs/loglybase/issues) • [Contribute](https://github.com/enviallabs/loglybase/pulls)
</div>

---

## 📖 About

Loglybase is a modern changelog management platform designed for developers who want to keep their users informed about product updates, bug fixes, and new features. Built with modern web technologies, it provides a beautiful and intuitive interface for creating, managing, and publishing changelogs.

**💡 Looking for a hosted solution?** Check out [Loglybase Cloud](https://loglybase.com) - our fully managed service with additional enterprise features, automatic updates, and professional support.

### Why Loglybase?

- **🆓 Completely Free & Open Source** - No subscription fees or usage limits
- **🏠 Self-Hosted** - Full control over your data and infrastructure  
- **🎨 Beautiful UI** - Modern, responsive design that looks great everywhere
- **⚡ Developer-Friendly** - Built with TypeScript, easy to customize and extend
- **🔒 Privacy-First** - Your data stays on your servers
- **☁️ Cloud Alternative Available** - Prefer managed hosting? Try [Loglybase Cloud](https://loglybase.com)

## 🚀 Features

- **📝 Block Editor** - Create beautiful changelogs with our advanced block-based editor
- **🎨 Customizable Design** - Fully customizable themes, fonts, and branding options
- **📱 Responsive Design** - Perfect experience across all devices and screen sizes
- **🔐 Secure Authentication** - OAuth integration with GitHub and Google
- **🌐 Multi-language Support** - Built with internationalization in mind
- **⚡ Fast Performance** - Server-side rendering with Nuxt 3 for optimal speed
- **🔒 Security First** - Built-in security headers and CSRF protection
- **📊 Project Management** - Organize multiple projects and changelogs
- **🎯 Widget Integration** - Embeddable changelog widgets for your applications
- **📤 API Access** - RESTful API for programmatic access and integrations

> **💡 Want these features without the setup?** [Loglybase Cloud](https://loglybase.com) offers all these features plus enterprise-grade hosting, automatic backups, and dedicated support.

## 🛠️ Tech Stack

### Frontend
- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework with SSR
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Nuxt UI](https://ui.nuxt.com/)** - Beautiful UI components
- **[TipTap](https://tiptap.dev/)** - Headless rich text editor
- **[Pinia](https://pinia.vuejs.org/)** - State management

### Backend & Database
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library

### Development & Deployment
- **[Docker](https://www.docker.com/)** - Containerization
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm**
- **PostgreSQL** database (v12 or higher)
- **Git** for version control
- **Docker** (optional, for containerized development)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/enviallabs/loglybase.git
cd loglybase
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

```env
# Database
PGUSER=loglybase
POSTGRES_PASSWORD=loglybase
POSTGRES_DB=loglybase

# Database Configuration
DATABASE_URL="postgresql://loglybase:loglybase@localhost:5432/loglybase"

# Application Configuration
BASE_URL="localhost:3000"
SSL_PREFIX="http"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email Configuration (Optional)
RESEND_API_KEY="your_resend_api_key"
EMAIL_SENDER="noreply@yourdomain.com"

# File Storage (Optional - for image uploads)
STORAGE_ENDPOINT="your_s3_compatible_endpoint"
STORAGE_BUCKET="your_bucket_name"
STORAGE_ACCESS_KEY="your_access_key"
STORAGE_SECRET_KEY="your_secret_key"
```

### 4. Database setup

Run database migrations to set up the schema:

```bash
npm run migrate:dev
```

Generate Prisma client:

```bash
npm run prisma:generate
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access Loglybase.

## 🐳 Docker Development

For a containerized development environment:

```bash
# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The Docker setup includes:
- **PostgreSQL database** - Automatically configured and ready to use
- **Application container** - Loglybase OSS running on port 3000
- **Volume persistence** - Database data persists between container restarts

## 📚 Project Structure

```
loglybase/
├── assets/              # Static assets (CSS, images)
├── components/          # Vue components
│   ├── Elements/        # Rich text editor elements
│   ├── EmailTemplates/  # Email template components
│   ├── Preview/         # Changelog preview components
│   └── SettingSections/ # Settings page components
├── composables/         # Vue composables and utilities
│   └── api/            # API composables
├── layouts/            # Nuxt layouts (default, auth, etc.)
├── middleware/         # Route middleware (auth, etc.)
├── pages/              # Application pages and routes
│   ├── Auth/           # Authentication pages
│   ├── Create/         # Project creation pages
│   ├── Project/        # Project management pages
│   ├── Settings/       # Settings pages
│   └── Widget/         # Embeddable widget pages
├── prisma/             # Database schema and migrations
│   ├── migrations/     # Database migration files
│   └── schema.prisma   # Prisma schema definition
├── server/             # Server-side API routes
│   ├── api/            # API endpoints
│   └── utils/          # Server utilities
├── stores/             # Pinia stores for state management
├── types/              # TypeScript type definitions
└── utils/              # Client-side utility functions
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run preview          # Preview production build

# Database Management
npm run migrate:dev      # Run database migrations (development)
npm run migrate:deploy   # Deploy migrations (production)
npm run migrate:status   # Check migration status
npm run prisma:generate  # Generate Prisma client

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
```

## 🚀 Production Deployment

### Building for Production

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run migrate:deploy

# Build the application
npm run build

# Start production server
npm run start
```

### Docker Production Deployment

```bash
# Run docker compose
docker compose up -d
```

### Environment Variables for Production

Ensure all required environment variables are properly configured:

- Set `NODE_ENV=production`
- Use production database URL with proper credentials
- Configure OAuth applications for your domain
- Set up proper SSL certificates if using HTTPS
- Configure email service for notifications (optional)
- Set up file storage for image uploads (optional)

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, your help is appreciated.

### How to Contribute

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/loglybase.git
   cd loglybase
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes** and commit them:
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to your branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** on GitHub

### Development Guidelines

- **Code Style**: Follow the existing code style and use TypeScript
- **UI/UX**: Use Tailwind CSS for styling and maintain consistency
- **Testing**: Ensure your changes don't break existing functionality
- **Documentation**: Update documentation if you're adding new features
- **Commit Messages**: Write clear, descriptive commit messages

### Types of Contributions

- 🐛 **Bug fixes** - Help us squash bugs
- ✨ **New features** - Add functionality that benefits users
- 📚 **Documentation** - Improve or add documentation
- 🎨 **UI/UX improvements** - Make the interface better
- ⚡ **Performance** - Optimize code and improve speed
- 🔧 **Refactoring** - Clean up code without changing functionality

### Getting Help

- 💬 **Discussions** - Use GitHub Discussions for questions and ideas
- 🐛 **Issues** - Report bugs or request features via GitHub Issues
- 📧 **Email** - Reach out to the maintainers if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) for the amazing Vue.js framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [TipTap](https://tiptap.dev/) for the powerful rich text editor
- [Better Auth](https://www.better-auth.com/) for modern authentication
- All our [contributors](https://github.com/loglybase/loglybase/contributors) who help make this project better

## 📞 Support & Community

- 🐛 **Issues**: [GitHub Issues](https://github.com/enviallabs/loglybase/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/enviallabs/loglybase/discussions)
- 📖 **Documentation**: Check the code and README for detailed information
- 🤝 **Contributing**: See the contributing section above
- ☁️ **Managed Solution**: Need professional support? Consider [Loglybase Cloud](https://loglybase.com)

---

<div align="center">
  <p>Made with ❤️ by the open source community</p>
  <p>⭐ Star this project if you find it useful!</p>
</div>
