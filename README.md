# 🌟 Interactive Particle Rain Effect

A mesmerizing, interactive particle system built with React, TypeScript, and Canvas API. Create stunning visual effects with 6 different particle modes and real-time controls!

## ✨ Features

### 🎮 **6 Interactive Modes**

- **🌧️ Rain** - Classic falling particles
- **🎆 Firework** - Explosive particle bursts
- **🌀 Spiral** - Swirling spiral patterns
- **⚡ Bounce** - Physics-based bouncing particles
- **🧲 Magnetic** - Particles attracted to mouse
- **🌪️ Vortex** - Swirling vortex effects around cursor

### 🎛️ **Real-time Controls**

- **Speed Control** - Adjust particle movement speed
- **Particle Size** - Change particle dimensions
- **Trail Length** - Customize particle trails
- **Color Themes** - 4 beautiful color palettes (Rainbow, Fire, Ice, Neon)
- **Gravity Toggle** - Switch between normal and low gravity
- **Auto Explode** - Automatic firework explosions

### ⌨️ **Keyboard Shortcuts**

- `1-6` - Switch between particle modes
- `Space` - Toggle auto-explode for firework mode
- `↑↓` - Increase/decrease speed
- `S/A` - Increase/decrease particle size
- `T` - Cycle through color themes
- `G` - Toggle gravity
- `R` - Clear all particles
- `C` - Hide/show controls

### 🖱️ **Mouse Interactions**

- **Click** - Create particle explosions
- **Drag** - Continuous particle generation
- **Move** - Particles follow mouse movement (magnetic/vortex modes)

## 🚀 Live Demo

**[View Live Demo](https://andy3520.github.io/particle-rain)**

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Canvas API** - High-performance 2D graphics
- **Custom Hooks** - Modular, reusable logic
- **CSS3** - Modern styling with animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/andy3520/particle-rain.git

# Navigate to project directory
cd particle-rain

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗️ Project Structure

```
particle-rain/
├── src/
│   ├── hooks/
│   │   ├── useParticleSystem.ts    # Core particle logic
│   │   ├── useKeyboardControls.ts  # Keyboard event handling
│   │   └── useCanvas.ts           # Canvas setup and management
│   ├── components/
│   │   └── ControlsPanel.tsx      # UI controls component
│   ├── App.tsx                    # Main application component
│   └── App.css                    # Styling
├── public/
└── README.md
```

## 🎯 Key Features

### **Efficient Architecture**

- **Custom Hooks** - Separated concerns for better maintainability
- **Optimized Rendering** - Smooth 60fps animations
- **Memory Management** - Proper cleanup and garbage collection
- **Type Safety** - Full TypeScript coverage

### **Interactive Physics**

- **Realistic Gravity** - Natural particle movement
- **Collision Detection** - Bouncing off boundaries
- **Force Fields** - Magnetic attraction and vortex effects
- **Particle Lifecycle** - Birth, movement, and decay

### **Visual Effects**

- **Particle Trails** - Dynamic trail rendering
- **Shadow Effects** - Glowing particles with shadows
- **Color Gradients** - Beautiful color transitions
- **Smooth Animations** - RequestAnimationFrame optimization

## 🎨 Customization

### **Adding New Particle Types**

1. Extend the `ParticleType` in `useParticleSystem.ts`
2. Add physics logic in the `updateParticles` function
3. Implement rendering styles in the drawing section

### **Creating New Color Themes**

1. Add new theme to `colorThemes` object
2. Update the `ColorTheme` type
3. Add theme button in `ControlsPanel.tsx`

### **Modifying Physics**

- Adjust gravity values in the config
- Modify collision detection logic
- Change particle life and decay rates

## 🚀 Deployment

### **GitHub Pages**

This project is configured for GitHub Pages deployment:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Set source to `gh-pages` branch or `/docs` folder

### **Other Platforms**

- **Netlify** - Drag and drop `build` folder
- **Vercel** - Connect GitHub repository
- **Firebase Hosting** - Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Canvas API** - For high-performance graphics
- **TypeScript Team** - For type safety
- **Open Source Community** - For inspiration and tools

---

**Made with ❤️ and lots of particles!**

_Enjoy creating beautiful visual effects! 🌟_
