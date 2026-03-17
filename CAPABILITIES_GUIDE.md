# Capabilities Section - Integration Guide

## 🎯 Overview

The Capabilities section showcases Mometia's security capabilities with an animated radar effect. It features:
- **Radar animation** with rotating sweep lines
- **7 cybersecurity capabilities** positioned around the radar
- **Scroll-based animations** for smooth entrance and interactions
- **Theme-integrated design** using Mometia's color palette
- **Responsive layout** optimized for all screen sizes

---

## 📂 Component Structure

### 1. **`components/ui/radar-effect.tsx`** - Reusable Components

Core building blocks:

#### `Circle` Component
- Concentric circles for radar visualization
- Staggered entrance animation (delay: idx * 0.1)
- Uses CSS variables for theme colors
- Opacity-based gradient for depth

#### `Radar` Component
- Main radar container (20rem x 20rem)
- Rotating sweep line (10s rotation)
- 8 concentric circles with fading opacity
- Gradient sweep from primary color
- Self-contained with inline styles

#### `CapabilityIcon` Component
- Individual capability card
- Icon + text layout
- Hover scale animation (1 → 1.08)
- Springs physics on hover (`stiffness: 400, damping: 25`)
- Theme-aware border and background colors

---

### 2. **`components/sections/capabilities.tsx`** - Full Section

#### Scroll Tracking
```typescript
// Dual scroll tracking for different animation ranges
const { scrollYProgress: sectionProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],  // Full viewport to end
});

const { scrollYProgress: contentProgress } = useScroll({
  target: contentRef,
  offset: ["start center", "end center"],  // Content-focused
});
```

#### Animation Timeline

**Header (0% → 15%)**
- Opacity: 0 → 1
- Scale: 0.95 → 1
- Creates smooth entrance

**Content (15% → 40%)**
- Y position: 40px → 0 (slides up)
- Opacity: 0 → 1 (fades in)

**Radar (30% → 60%)**
- Scale: 0.8 → 1.1 (grows and slightly overshoots)
- Opacity: 0 → 1 (fades in)

**Capabilities** (Staggered entrance)
- Each delays by index * 0.1s
- Individual stagger in rows (top → middle → bottom)

**Background Orbs** (Continuous parallax)
- Orb 1: moves -100px as user scrolls section
- Orb 2: moves +100px (opposite direction = depth)

---

## 🔧 Customization

### Change Capabilities

Edit the `capabilities` array in `components/sections/capabilities.tsx`:

```typescript
const capabilities = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    text: "Threat Detection",
    delay: 0.2,
  },
  // Add more capabilities here
];
```

### Adjust Radar Size

In `capabilities.tsx`, find the radar container:

```jsx
<Radar className="h-80 w-80" />  // Change h-80 w-80 to h-96 w-96 etc.
```

### Modify Animation Ranges

Example - Make radar grow faster:

```typescript
// Currently: 0.3 → 0.6
const radarScale = useTransform(contentProgress, [0.3, 0.6], [0.8, 1.1]);

// Change to: 0.2 → 0.5 (starts earlier, ends earlier)
const radarScale = useTransform(contentProgress, [0.2, 0.5], [0.8, 1.1]);
```

### Theme Customization

All colors use CSS variables (no hardcoding):

```typescript
// Border color with opacity
borderColor: `color-mix(in oklab, var(--primary) ${100 - (idx + 1) * 10}%, transparent)`

// Sweep line color
bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent

// Icon background
backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)"
```

Changes to `app/globals.css` theme variables instantly update all colors.

---

## 🎨 How It Fits Your Website

### Color Scheme
- **Borders**: Primary color with decreasing opacity
- **Sweep line**: Primary gradient
- **Icons**: Primary color
- **Background**: Uses muted/secondary colors for ambient orbs
- **Text**: Foreground colors with muted-foreground for descriptions

### Typography
- **Header**: 5xl → 6xl (responsive)
- **Subtitle**: lg → xl with muted-foreground
- **Icon text**: xs bold
- **Description cards**: sm

### Layout
- Full-width section with 6xl container max-width
- Padding: py-28 md:py-36 (matches other sections)
- Grid layout for descriptions (1 column → 3 columns on md+)

---

## 📊 Capability Items

Currently showcased in order:

| Position | Capability | Icon | Purpose |
|----------|-----------|------|---------|
| Top-Left | Threat Detection | Shield | Identifies threats |
| Top-Center | Cloud Defense | Cloud | Cloud security |
| Top-Right | Encryption | Lock | Data protection |
| Middle-Left | Network Security | Network | Network protection |
| Middle-Right | Incident Response | Zap | Emergency response |
| Bottom-Left | Monitoring | Eye | Continuous monitoring |
| Bottom-Right | Vulnerability Scan | Bug | Find vulnerabilities |

---

## 🚀 Performance Notes

✅ **GPU-Accelerated**: All transforms use `transform` and `opacity`
✅ **Lazy-Triggered**: Animations only when in viewport (`whileInView`)
✅ **Staggered Loading**: Icons animate in sequentially (not all at once)
✅ **No Layout Shifts**: All animations use `transform` (no reflows)

---

## 🔗 Integration Points

### Navigation
Updated `components/layout/nav-config.tsx`:
```typescript
{ label: "Capabilities", href: "#capabilities" }
```

### Home Page
Updated `app/page.tsx`:
```jsx
<Capabilities />  // Inserted between About and (future) Case Studies
```

### Route
Accessible via `#capabilities` hash navigation (smooth scroll)

---

## 🎬 Animation Behavior

### On Scroll Into View
1. Header fades in and scales (0% → 15%)
2. Content slides up from 40px below (15% → 40%)
3. Radar scales from 0.8 → 1.1 (30% → 60%)
4. Capabilities pop in with staggered delays
5. Description cards fade in from bottom

### On Hover
- Capability icons scale to 1.08
- Description cards lift up (-4px) with `whileHover={{ y: -4 }}`
- Border color transitions to stronger primary

### Continuous
- Background orbs move in parallax (opposite directions)
- Radar sweep rotates continuously (10s loop)

---

## 💡 Future Enhancements

Potential improvements:

1. **Click to reveal details**
```typescript
const [selectedCapability, setSelectedCapability] = useState(null);
// Show modal/drawer with full details
```

2. **Animated capability cards**
```typescript
<motion.div whileHover={{ rotate: 360 }}>
  // Icon rotates 360° on hover
</motion.div>
```

3. **More capabilities**
```typescript
// Add to array and adjust positioning (grid layout)
```

4. **Color per capability**
```typescript
const colorMap = {
  "Threat Detection": "var(--primary)",
  "Cloud Defense": "var(--secondary)",
  // ... etc
}
```

---

## 📝 Key Technical Details

### Imports
```typescript
import { motion, useScroll, useTransform } from "framer-motion";
import { Radar, CapabilityIcon } from "@/components/ui/radar-effect";
import {
  Shield, Cloud, Lock, Zap, Bug, Eye, Network, Check
} from "lucide-react";
```

### Dependencies
- `framer-motion`: Scroll animations
- `lucide-react`: Icons
- `tailwind-merge`: Utility merging
- `tailwindcss`: Styling

### Browser Support
- Chrome/Edge: Full support (modern animations)
- Firefox: Full support
- Safari: Full support (GPU acceleration)
- Mobile: Fully responsive

---

## 📖 Related Documentation

See `SCROLL_ANIMATIONS.md` for:
- General scroll animation patterns
- useScroll + useTransform mapping reference
- How to create new animated sections

---

**Summary**: The Capabilities section is a fully self-contained, theme-aware, scroll-animated component that showcases your security services with a modern radar visualization. It follows the Mometia design language and integrates seamlessly into the single-page experience.
