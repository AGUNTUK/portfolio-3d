# Interactive 3D Motion Graphics Portfolio

A mind-blowing portfolio website for a full stack developer and designer featuring an explorable 3D world with Claymorphism design, mouse-following effects, scroll-triggered animations, and draggable 3D objects.

## ✨ Features

- **Explorable 3D World** - Navigate through an immersive 3D environment
- **Claymorphism Design** - Soft, clay-like UI with beautiful shadows
- **Mouse-Following Effects** - Interactive light source and parallax layers
- **Scroll-Triggered Animations** - Smooth camera journey through sections
- **Draggable 3D Objects** - Physics-based interactions
- **Dark/Light Theme** - Toggle between themes
- **Responsive Design** - Works on all devices

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **3D Engine**: Three.js + React Three Fiber
- **Animations**: Framer Motion + GSAP + React Spring
- **Physics**: @react-three/cannon
- **Styling**: Tailwind CSS with Claymorphism
- **State**: Zustand

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd sohel-rana

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section** (`src/components/sections/Hero.tsx`)
   - Update name, title, and description

2. **About Section** (`src/components/sections/About.tsx`)
   - Update skills, technologies, and bio

3. **Projects** (`src/components/sections/Projects.tsx`)
   - Add your own projects to the `projects` array

4. **Experience** (`src/components/sections/Experience.tsx`)
   - Update work history

5. **Contact** (`src/components/sections/Contact.tsx`)
   - Update contact information and social links

### Customize Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --clay-bg: #f0e6d3;
  --clay-surface: #f5ebe0;
  --clay-primary: #c9ada7;
  /* ... more colors */
}
```

### Add 3D Models

1. Place `.glb` or `.gltf` files in `public/models/`
2. Use `useGLTF` from `@react-three/drei` to load them

## 📁 Project Structure

```
sohel-rana/
├── public/
│   ├── models/          # 3D models
│   └── fonts/           # Custom fonts
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Main page
│   │   └── globals.css  # Global styles
│   ├── components/
│   │   ├── 3d/          # 3D components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # UI components
│   ├── store/           # Zustand stores
│   └── hooks/           # Custom hooks
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production

```bash
npm run build
npm start
```

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Built with ❤️ using Next.js, Three.js & Framer Motion
