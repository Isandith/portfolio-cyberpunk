# 🎮 Cyberpunk Portfolio - IZEE_EDITZ

A futuristic, cyberpunk-themed portfolio website showcasing video editing services with neon aesthetics, glitch effects, and interactive UI elements.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Cyberpunk UI/UX
- **Neon aesthetics** with cyan/yellow color schemes
- **Glitch text effects** with dynamic scrambling animations
- **CRT/Scanline overlays** for retro-futuristic feel
- **Animated backgrounds** with floating particles and neon beams
- **Holographic borders** and interactive hover effects
- **Fully responsive** design (mobile-first approach)

### 📧 Contact Form
- **Gmail API integration** with Nodemailer
- Real-time form validation
- Cyberpunk-styled success/error messages
- Professional HTML email templates
- **500 emails/day capacity** (Gmail free tier)

### 🎬 Freelance Showcase
- **Interactive image carousel** with 4 client reviews
- Auto-cycling slideshow (5-second intervals)
- **Tactical modal viewer** with glitch animations
- Thumbnail navigation with mobile swipe support
- Direct Fiverr profile integration

### 🛠️ Tech Stack
- **Hero Section** - Animated landing with CTA
- **Skills Section** - Technology showcase
- **Projects Section** - Portfolio highlights
- **Career Section** - Professional timeline
- **Contact Section** - Secure contact form
- **Navigation** - Smooth scroll with active states

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Gmail account with App Password enabled
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Isandith/portfolio-cyberpunk.git
cd portfolio-cyberpunk
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

**How to get Gmail App Password:**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not enabled)
3. Search for "App Passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
portfolio-cyberpunk/
├── app/
│   ├── components/
│   │   ├── sections/          # Main page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Career.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Freelance.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                # Reusable UI components
│   │   └── utils/             # Utility components
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts       # Email API endpoint
│   ├── config/
│   │   └── projectConfig.ts   # Project configuration
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── Reviews/               # Client review images
│       ├── 1.png
│       ├── 2.png
│       ├── 3.png
│       └── 4.png
├── .env.local                 # Environment variables (not in repo)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Key Components

### Contact Form (`Contact.tsx`)
- Cyberpunk-styled input fields with animated borders
- Real-time validation and loading states
- Gmail API integration for email delivery
- Success/error feedback with auto-dismiss

### Freelance Showcase (`Freelance.tsx`)
- Image carousel with glitch transitions
- Modal viewer with metadata display
- Mobile-optimized thumbnail navigation
- Fiverr profile integration

### Navigation (`Navigation.tsx`)
- Smooth scroll behavior
- Active section highlighting
- Mobile-responsive hamburger menu

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Add these in your hosting platform:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

## 📊 Email Limits

- **Gmail Free:** 500 emails/day
- **Google Workspace:** 2,000 emails/day

Consider alternatives for high volume:
- SendGrid (100/day free)
- Mailgun (5,000 free for 3 months)
- AWS SES (62,000/month free)

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- Primary: Cyan (`#06b6d4`)
- Secondary: Yellow (`#fbbf24`)
- Accent: Fuchsia (`#d946ef`)

### Content
- **Profile Info:** Edit `Freelance.tsx` (lines 430-450)
- **Fiverr Link:** Update in `Freelance.tsx` (line 468)
- **Project Images:** Replace files in `public/Reviews/`
- **Email Template:** Modify in `app/api/send-email/route.ts`

## 🛡️ Security Recommendations

- ✅ Environment variables are in `.gitignore`
- ⚠️ Add rate limiting to prevent spam
- ⚠️ Add reCAPTCHA for bot protection
- ⚠️ Implement email validation on backend

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**IZEE_EDITZ**
- Fiverr: [@izee_editz](https://fiverr.com/izee_editz)
- GitHub: [@Isandith](https://github.com/Isandith)

## 🙏 Acknowledgments

- Next.js for the amazing framework
- Tailwind CSS for utility-first styling
- Lucide React for cyberpunk icons
- Nodemailer for email functionality

---

<div align="center">
  <strong>🎮 SYSTEM ONLINE // TERMINAL READY 🎮</strong>
  <br />
  Made with ⚡ by IZEE_EDITZ
</div>
