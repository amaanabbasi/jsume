# Amaan Portfolio — Next.js Portfolio Site

A modern, story-driven portfolio website built with Next.js 14+ (App Router), TypeScript, TailwindCSS, and configured for Netlify deployment.

## 🚀 Features

- **Modern Stack**: Next.js 14+ with App Router, TypeScript, TailwindCSS
- **Lightweight Animations**: CSS keyframes and small utility hooks (no heavy 3D libraries)
- **Interactive UI**: SVG globe with CSS animations, tilt effects on project cards
- **SEO Optimized**: Comprehensive metadata, Open Graph, and Twitter cards
- **Netlify Ready**: Pre-configured with `@netlify/plugin-nextjs` for seamless deployment
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Optimized images, lazy loading, minimal bundle size
- **Responsive**: Mobile-first design that works on all devices

## 📋 Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- A Netlify account (for deployment)

## 🛠️ Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### 3. Build for Production

```bash
pnpm build
```

### 4. Start Production Server (local testing)

```bash
pnpm start
```

### 5. Lint

```bash
pnpm lint
```

## 📁 Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── projects/
│       └── [slug]/
│           └── page.tsx   # Dynamic project pages (placeholder)
├── components/            # React components
│   ├── Hero.tsx          # Hero section with story
│   ├── SimpleSVGGlobe.tsx # Lightweight SVG globe with CSS animations
│   ├── TestimonialsCarousel.tsx
│   ├── ProjectsGrid.tsx
│   ├── ProjectCard.tsx
│   ├── WhyWorkWithMe.tsx
│   ├── ContactForm.tsx   # Netlify forms integration
│   └── Footer.tsx
├── hooks/                 # Custom React hooks
│   ├── useInView.ts      # IntersectionObserver hook for scroll animations
│   └── useTilt.ts        # Tilt effect hook for project cards
├── data/
│   └── demo-data.ts      # Sample projects and testimonials
├── public/               # Static assets
│   ├── favicon.svg
│   ├── screenshot-1.png
│   └── screenshot-2.png
├── netlify.toml          # Netlify configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # TailwindCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🌐 Deployment to Netlify

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Revamp: Story-first homepage, lightweight animations, Netlify contact form"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select the repository

3. **Configure Build Settings**
   - Build command: `pnpm run build` (or `npm run build`)
   - Publish directory: `.next` (Netlify plugin will handle this automatically)
   - The `netlify.toml` file is already configured

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically install dependencies and build your site
   - The `@netlify/plugin-nextjs` plugin will be automatically installed and configured

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Post-Deployment Setup

1. **Configure Netlify Forms**
   - The contact form is already configured with `data-netlify="true"`
   - Forms will automatically work once deployed
   - View submissions in Netlify Dashboard → Forms

2. **Update Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables (none required for basic setup)

3. **Custom Domain** (optional)
   - Go to Site settings → Domain management
   - Add your custom domain

## 📝 Customization

### Update Content

1. **Hero Story**: Edit `components/Hero.tsx` (use exact copy provided)
2. **Projects**: Edit `data/demo-data.ts`
3. **Testimonials**: Edit `data/demo-data.ts` (use exact copy provided)
4. **Social Links**: Edit `components/Footer.tsx`

### Replace Placeholder Images

Replace the placeholder images in `/public`:
- `screenshot-1.png` and `screenshot-2.png` - Project screenshots (800x450px recommended)
- `favicon.svg` - Site favicon

### Styling

- TailwindCSS configuration: `tailwind.config.js`
- Global styles: `app/globals.css`
- Custom colors and animations are defined in `tailwind.config.js`

## 🔧 Technical Details

### Lightweight Animations

- **No heavy 3D libraries**: This project intentionally avoids `three.js`, `react-globe.gl`, and similar heavy libraries
- **SVG Globe**: Uses inline SVG with CSS `@keyframes` for rotation and orbit animations
- **Tilt Effect**: Custom `useTilt` hook (~40 lines) using CSS transforms based on mouse position
- **Scroll Animations**: `useInView` hook using IntersectionObserver API
- **CSS Keyframes**: All animations use lightweight CSS animations

### Performance

- Minimal bundle size (no heavy graphics libraries)
- Optimized images with Next.js Image component
- Lazy loading for components
- CSS-only animations for better performance

## 🔧 Troubleshooting

### Build Errors

- Ensure Node.js 18+ is installed
- Clear `.next` folder and `node_modules`, then reinstall:
  ```bash
  rm -rf .next node_modules
  pnpm install
  ```

### Netlify Forms Not Working

- Ensure `data-netlify="true"` is on the form element
- Check that the form has a `name` attribute matching the hidden `form-name` field
- Verify the honeypot field is present and hidden

## 📚 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: CSS keyframes + custom hooks (no heavy animation libraries)
- **Icons**: react-icons
- **Deployment**: Netlify with `@netlify/plugin-nextjs`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Amaan
