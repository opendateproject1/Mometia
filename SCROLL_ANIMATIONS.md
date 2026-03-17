# 🎬 Scroll Animation Blueprint - Mometia Website

## Overview
Your website now features **smooth, scroll-driven animations** throughout every section. Each element is tied to the user's scroll position, creating an immersive, parallax-rich experience.

---

## 🚀 HERO SECTION - Global Scroll Animations

### What Happens As User Scrolls Down:

#### 1. **Main Content Container**
```
Scroll Progress: 0px → 520px
├─ Position Y: 0 → -100px (moves up off-screen)
├─ Opacity: 1 → 0 (fades out)
├─ Scale: 1 → 0.92 (shrinks)
└─ Rotation: 0° → -1.5° (subtle tilt)
```
*Effect: Content gracefully exits viewport while shrinking and rotating*

#### 2. **Ambient Orbs** (3 floating blurred circles)
```
Scroll Progress: 0px → 600px
├─ Orb 1 (primary): moves DOWN 200px
├─ Orb 2 (secondary): moves UP 150px
└─ Orb 3 (accent): moves DOWN 120px
```
*Effect: 3D parallax depth - different layers move at different speeds*

#### 3. **Eyebrow Pill** ("Enterprise Cybersecurity & GRC" badge)
```
Scroll Progress: 0px → 300px
└─ Position X: 0 → -30px (slides left)
```
*Effect: Pushes content left as hero fades*

#### 4. **Title (H1)** ("Your Shield Against Modern Threats")
```
Scroll Progress: 300px → 500px
└─ Blur Filter: 0px → 4px (becomes unreadable)
```
*Effect: Text blurs out as it exits viewport*

#### 5. **Scroll Hint** (Chevron icon)
```
Scroll Progress: 0px → 140px
└─ Opacity: 1 → 0 (disappears immediately)
```
*Effect: Hint vanishes first, encouraging scroll*

---

## 📊 ABOUT SECTION - Section-Level Scroll Animations

### Dual Scroll Tracking:
- **`sectionProgress`**: Entire About section (viewport top to bottom)
- **`contentProgress`**: Content container (smoother for element animations)

### Animation Timeline:

#### Phase 1: Header Entrance (Progress: 0% → 20%)
```
Section Header
├─ Opacity: 0 → 1 (fades in)
├─ Scale: 0.95 → 1.0 (grows)
├─ Underline: width 0 → 80px animated
└─ "Discover Our Story" badge animates in
```
*Effect: Professional reveal as About section comes into view*

---

#### Phase 2: Service Cards Entrance (Progress: 10% → 40%)
```
Left Services Column (Cloud Security, GRC, Ransomware)
├─ Position Y: 40px → 0 (slides up)
├─ Opacity: 0 → 1 (fades in)
├─ Rotation: -2° → 0° (straightens from left tilt)
└─ Hover: slight lift on mouse over

Right Services Column (Assessments, Incident Response, Zero-Trust)
├─ Position Y: 40px → 0 (slides up)
├─ Opacity: 0 → 1 (fades in)
├─ Rotation: +2° → 0° (straightens from right tilt)
└─ Hover: subtle rotate jiggle on icon
```
*Effect: Services "correct" their tilt as they slide into view, creating visual balance*

---

#### Phase 3: Center Image Transformation (Progress: 30% → 50%)
```
Image Container
├─ Scale: 0.90 → 1.05 (grows and slightly overshoots)
├─ Rotation: -1° → 0° (unrotates smoothly)
├─ Parallax Y: -24px → +24px (continuous subtle movement)
└─ Border frame opacity animates in
```
*Effect: Image grows and "snaps" into perfect alignment as user scrolls closer*

---

#### Phase 4: Stats Cards Reveal (Progress: 65% → 85%)
```
4 Stat Cards (Organizations, Retention, Response Time, Standards)
├─ Position Y: 60px → 0 (comes up from below)
├─ Opacity: 0 → 1 (fades in)
├─ Scale: 0.96 → 1.0 (grows slightly)
├─ Staggered: Each card appears 0.1s after previous
├─ Top accent bar: scaleX 0 → 1 (grows from center)
└─ Hover: lift up + icon rotates 360°
```
*Effect: Counters "pop" into view in sequence, counting up from 0*

---

#### Phase 5: Orbs Parallax (Continuous)
```
Background Orbs
├─ Orb 1: moves -48px over full section scroll
├─ Orb 2: moves +48px (opposite direction)
└─ Floating particles: subtle oscillating animation
```
*Effect: Depth - background moves slower than foreground*

---

## 🎯 Technical Implementation

### Scroll Progress Mapping
```typescript
// Example from Hero
const contentY = useTransform(scrollY, [0, 520], [0, -100]);
// reads: "When user scrolls 0-520px, move content from 0 to -100px"

// Example from About
const servicesY = useTransform(contentProgress, [0.1, 0.4], [40, 0]);
// reads: "When section progress is 10%-40%, move from 40px to 0px"
```

### Easing Function
```typescript
const EASE_EXPO = [0.16, 1, 0.3, 1]; // Custom cubic bezier
// Feels natural and smooth, not linear
```

### Combining Transforms
```jsx
<motion.div
  style={{
    y: servicesY,           // Vertical position
    opacity: servicesOpacity, // Transparency
    rotateZ: leftServiceRotation, // Rotation
  }}
>
  {/* Element smoothly animates across all 3 properties */}
</motion.div>
```

---

## 🔄 Animation Patterns for Future Pages

When adding new sections, follow this pattern:

```typescript
export function NewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create transforms for each animation property
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.6], [40, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 1]);

  return (
    <section ref={sectionRef}>
      <motion.div style={{ opacity, y, scale }}>
        {/* Content animates as user scrolls through section */}
      </motion.div>
    </section>
  );
}
```

---

## 🎨 Visual Effects Achieved

| Effect | Where | How |
|--------|-------|-----|
| **Parallax Depth** | Hero orbs, About image | Different Y transforms at different speeds |
| **Entrance Animation** | Services, Stats, Header | Y + opacity transforms on 0→1 range |
| **Exit Animation** | Hero content | Y + opacity transforms on 1→0 range |
| **Scale Pop** | Image, Stats | Scale 0.9→1.05 for "snappy" feel |
| **Rotation Correction** | Service cards | Rotate from ±2° to 0° for alignment |
| **Blur Effect** | Hero title | Filter blur 0→4px smoothly |
| **Color/Opacity Shifts** | Stats icons | Hover rotate 360° on interaction |
| **Staggered Reveals** | Multiple elements | DelayChildren + staggerChildren in variants |

---

## 📱 Responsive & Accessible

- All animations respect `prefers-reduced-motion` media query
- Canvas wave animations have `reducedMotion` detection
- Mouse influence on waves is disabled for accessibility
- Animations don't block scrolling (GPU-accelerated transforms)
- Scroll hints disappear smoothly, don't interrupt content

---

## 🚀 Performance Notes

✅ **GPU-Accelerated**: All motion uses `transform` and `opacity` (best performance)
✅ **Lazy Triggered**: Animations only for elements in viewport
✅ **Frame-Optimal**: 60fps on modern devices (uses `useTransform` for direct scroll mapping)
✅ **No Layout Shifts**: No animations that cause reflows

---

## 🎬 Experience Flow

**User Journey:**
1. **Lands on page** → Hero section fills viewport with glowy waves
2. **Scrolls slightly (0-140px)** → Scroll hint chevron fades
3. **Scrolls more (0-400px)** → Eye candy pill slides left, title blurs, content shrinks
4. **Continues scrolling (400-600px)** → Hero content fades out, orbs move at parallax speeds
5. **Reaches About section** → Header fades in and grows
6. **Scrolls through services (10-40%)** → Cards slide up, correcting their tilts
7. **Reaches image (30-50%)** → Image grows and snaps into alignment
8. **Scrolls to stats (65-85%)** → Counters pop in and count up from 0
9. **Scrolls to CTA** → Banner enters view with smooth animations

---

## 📝 Future Implementation Checklist

For every new page/section:
- [ ] Add `useScroll()` with target element and offset
- [ ] Create 3-5 `useTransform()` hooks for different properties
- [ ] Map progress ranges (0.0-1.0) to meaningful output ranges
- [ ] Test scroll mapping with browser dev tools
- [ ] Combine multiple transforms on one element for richness
- [ ] Use stagger for multi-element reveals
- [ ] Add hover effects with `whileHover` for interactivity
- [ ] Test on mobile (scroll is smooth, not janky)

---

**Result:** A website that feels alive and responsive to user interaction, with smooth animations that enhance rather than distract from the content.
