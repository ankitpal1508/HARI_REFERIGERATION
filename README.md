# Hari Refrigeration Website

A complete React website for **Hari Refrigeration**, Navi Mumbai — a local appliance repair business offering AC, refrigerator, washing machine, microwave, and water purifier services across Navi Mumbai localities.

Built with: React 18, plain CSS with CSS variables, Formspree (contact form), and Claude AI (embedded chat assistant).

---

## What is `.sixth`?

The `.sixth` folder at the root of this project is **a Claude Code project directory** — created automatically by [Claude Code](https://claude.ai/code), Anthropic's AI coding assistant CLI. It is **not part of the website** and has no effect on how the site runs or builds.

It contains:
```
.sixth/
└── skills/     ← stores custom Claude Code skills for this project
```

You can safely ignore this folder. Do not delete it if you use Claude Code to assist with development — it stores project-level AI configuration.

---

## Project Structure

```
PAL/
├── .sixth/                         ← Claude Code config (not part of website)
│   └── skills/
├── public/
│   └── index.html                  ← HTML shell (add favicon here)
├── src/
│   ├── App.js                      ← Main app — assembles all sections
│   ├── index.js                    ← React entry point
│   ├── index.css                   ← Global CSS variables & design system
│   ├── config.js                   ← EDIT THIS to change all content
│   └── components/
│       ├── Navbar.js / .css
│       ├── Hero.js / .css
│       ├── Services.js / .css
│       ├── WhyUs.js / .css
│       ├── Gallery.js / .css
│       ├── Testimonials.js / .css
│       ├── Contact.js / .css       ← Claude AI chat is inside here
│       └── Footer.js / .css
├── package.json
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.2 (Create React App) |
| Styling | Plain CSS with CSS custom properties |
| Fonts | Google Fonts — Rajdhani, Nunito |
| Contact Form | Formspree (email delivery, free tier) |
| AI Chat | Anthropic API (Claude AI) |
| Animations | Intersection Observer API (scroll fade-in) |
| WhatsApp | WhatsApp Web link API (floating button) |

---

## Run Locally (Step by Step)

### Step 1 — Install Node.js
Download from: https://nodejs.org — choose the **LTS** version.

### Step 2 — Open the project in VS Code
1. Open VS Code
2. File → Open Folder → select the `PAL` folder

### Step 3 — Open Terminal in VS Code
Press: **Ctrl + `** (backtick key, below Escape)

### Step 4 — Install dependencies
```bash
npm install
```
Wait about 1–2 minutes for packages to download.

### Step 5 — Start the development server
```bash
npm start
```
Your browser will open automatically at **http://localhost:3000**

### Build for production
```bash
npm run build
```
Creates an optimized `build/` folder ready for deployment.

---

## Edit Content (No Coding Needed)

Open `src/config.js` — every piece of content is labeled:

| What to change | Where in config.js |
|----------------|-------------------|
| Phone number | `SITE_CONFIG.phone` |
| WhatsApp number | `SITE_CONFIG.whatsapp` |
| Email address | `SITE_CONFIG.email` |
| Service area | `SITE_CONFIG.serviceArea` |
| Stats (500+, 15+ yrs) | `SITE_CONFIG.stats` |
| Services list | `SERVICES` array |
| Gallery photos | `GALLERY` array |
| Customer reviews | `TESTIMONIALS` array |
| Formspree form ID | `SITE_CONFIG.formspreeId` |

### Change colors
In `src/index.css`, edit the CSS variables at the top:
```css
--cold: /* ice blue color */
--warm: /* orange/accent color */
```

---

## Go Live — Complete Setup Guide

### Step 1: Receive Customer Queries in Your Email (Free)

1. Go to [formspree.io](https://formspree.io) and sign up free
2. Click **"New Form"** → name it "Hari Refrigeration Queries"
3. You'll get a form ID like `xpzgkwab`
4. Open `src/config.js`, find `formspreeId` and replace it:
   ```js
   formspreeId: "xpzgkwab",
   ```
5. Every customer query will arrive directly in your Gmail inbox.
   - Free plan: 50 submissions/month
   - Paid plan: unlimited

### Step 2: Add Your Real Photos (Gallery)

1. Upload your field photos to [imgbb.com](https://imgbb.com) (free image hosting)
2. Copy the direct image link
3. In `src/config.js`, find a GALLERY item and change:
   ```js
   url: null,
   ```
   to:
   ```js
   url: "https://i.ibb.co/your-photo-link.jpg",
   ```

You can also use **Google Photos**, **Cloudinary** (free tier), or any public image URL.

### Step 3: Host Free on Vercel (Live on Google, Forever Free)

1. Push this project to GitHub (free at [github.com](https://github.com)):
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   # create a repo on github.com, then:
   git remote add origin https://github.com/yourusername/hari-refrigeration.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) → **"Add New Project"** → Import from GitHub
3. Click **Deploy** — your site goes live in ~2 minutes at:
   ```
   https://hari-refrigeration.vercel.app
   ```
4. Every time you push to GitHub, Vercel auto-redeploys your live site.
5. Later you can connect a custom domain like `harirefrigeration.com` (~₹800/year for the domain).

### Step 4: Get Found on Google (SEO)

Add this inside the `<head>` tag in `public/index.html`:
```html
<meta name="description" content="AC, Fridge, Washing Machine repair in Navi Mumbai. Call Hari Refrigeration — same day service.">
```

Then register your business on **Google Business Profile** (free):
- Go to [business.google.com](https://business.google.com)
- Register **Hari Refrigeration** with your address, phone, and working hours
- This puts you on **Google Maps** and local search results

### Step 5: Secure the AI API Key for Production

The Claude AI chat assistant uses the Anthropic API. For production:
- Do **not** expose your API key in the browser
- Set up a simple backend proxy (Node.js/Express or a Vercel serverless function) that forwards requests to Anthropic
- For demo/learning purposes it works directly in the browser

---

## Claude AI Chat Assistant

The AI chat box is built into the Contact section. It uses the Anthropic API and is pre-configured to know:

- All services (AC, Fridge, Washing Machine, Microwave, Water Purifier, AMC)
- Service areas across Navi Mumbai (Vashi, Kharghar, Belapur, Nerul, Panvel, etc.)
- Working hours and contact details
- How to help customers describe appliance problems

---

## Future Expansion — What Can Be Added

### Short-term (Low effort, high value)
- **Online Booking Form** — let customers pick a date/time slot; use Calendly (free embed) or a custom form
- **WhatsApp Chat Button** — already in the footer; make it more prominent with a popup prompt
- **More Gallery Photos** — add real before/after service photos to build trust
- **Customer Review Count** — display live Google review count via Google Places API
- **SMS Notifications** — use Twilio or Fast2SMS to send booking confirmations to customers

### Medium-term
- **Service Request Tracking** — a simple admin dashboard (Airtable or Google Sheets + Zapier) to track all incoming jobs
- **Multi-language Support** — add a Hindi/Marathi toggle using i18n libraries
- **Blog/Tips Section** — SEO-friendly articles like "How to clean your AC filter" to rank on Google
- **Pricing Page** — transparent service charge estimates (builds customer trust)
- **Annual Maintenance Contract (AMC) Signup** — dedicated page with a form to sign up for yearly contracts

### Long-term (Full stack upgrade)
- **Backend + Database** — migrate to Next.js with a PostgreSQL/Supabase database for job management
- **Customer Portal** — login for repeat customers to view service history and warranties
- **Technician Assignment System** — internal tool to assign incoming jobs to field technicians
- **Payment Integration** — Razorpay or Paytm for advance booking payments
- **Automated WhatsApp Reminders** — send service reminders to AMC customers using WhatsApp Business API

---

## Project Decisions Worth Knowing

- All content lives in `src/config.js` — this was a deliberate choice so non-developers can edit the site without touching JSX
- CSS uses plain custom properties (not Tailwind or styled-components) to keep the build simple and fast for a non-technical owner
- The Claude AI key is currently used client-side — fine for demos, needs a proxy for production
- The `.sixth` folder is a Claude Code artifact — safe to `.gitignore` if you don't use Claude Code

---

## Support

For help with this website, contact your web developer or ask Claude AI at [claude.ai](https://claude.ai).
