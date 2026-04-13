# Мәлік генератор / Complaint Generator

A professional, production-grade complaint generator app built with React and Tailwind CSS. 100% client-side, no backend required.

## Features

✓ **Full Kazakh UI** — No English or Russian text  
✓ **Government-style design** — Clean, trustworthy, official appearance  
✓ **15 problem categories** — Organized into 4 main categories + "Other"  
✓ **Template-based generation** — Each problem has its own complaint template  
✓ **Responsive design** — Mobile-first, works on all devices  
✓ **Local state only** — No backend, no API calls  
✓ **LocalStorage persistence** — Form data auto-saves  
✓ **Copy to clipboard** — Easy sharing and submission  

## Problem Categories

1. **Қалалық инфрақұрылым** (Municipal Infrastructure)
   - Қоқыс (Garbage)
   - Шу (Noise)
   - Жол мәселесі (Road Issues)
   - Жарықтандыру (Lighting)
   - Аула жағдайы (Courtyard Condition)

2. **Тұрғын үй және коммуналдық қызметтер** (Housing & Utilities)
   - Су / кәріз (Water/Sewage)
   - Жылу (Heating)
   - Электр энергиясы (Electricity)
   - Лифт (Elevator)
   - Подъезд тазалығы (Entrance Cleanliness)

3. **Қоғамдық орта** (Public Environment)
   - Қоғамдық көлік (Public Transport)
   - Заңсыз құрылыс (Illegal Construction)
   - Рұқсатсыз сауда (Unlicensed Trade)

4. **Мемлекеттік қызметтер** (Government Services)
   - Сыбайлас жемқорлық (Corruption)
   - Қызмет сапасы (Service Quality)

5. **Басқа** (Other)
   - Custom description field

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:5173`

## Project Structure

```
src/
├── App.jsx                 # Main app component (flow logic)
├── main.jsx               # Entry point
├── index.css              # Tailwind & custom styles
├── templates.js           # Complaint templates and categories
├── utils.js               # Helper functions
└── components/
    ├── StepHeader.jsx     # Step indicator & title
    ├── PrimaryButton.jsx  # Button component
    ├── InputField.jsx     # Form input component
    ├── CategoryCard.jsx   # Problem category card
    └── ComplaintPreview.jsx # Complaint display
```

## How It Works

1. **Home Screen** — Welcome message and start button
2. **Problem Selection** — Browse 15 problems organized by category
3. **Details Input** — Enter name, address, and date
4. **Complaint Preview** — View generated complaint text
5. **Copy & Share** — Copy to clipboard or edit
6. **Service Link** — Open external government service (egov.kz)

## Design System

### Colors
- **Primary Blue**: `#4B7A99` — Main actions, highlights
- **Secondary Green**: `#65A580` — Positive actions, success states
- **Accent Blue-Gray**: `#8BA4B0` — Secondary elements
- **Light Background**: `#F5F7FA` — Subtle backgrounds
- **Dark Text**: `#2C3E50` — Main text color

### Typography
- All in **system-ui** sans-serif for consistency
- Responsive font sizes
- Professional, formal tone throughout

### Spacing & Layout
- 8px base grid unit
- Generous whitespace for clarity
- Mobile-first responsive design
- Soft shadows for depth

## Customization

### Adding More Problem Templates

Edit `src/templates.js`:

```javascript
export const complaintTemplates = {
  // Add new problem
  my_new_problem: `ШАҒЫМ

Тарихы: {date}
...
Құрметпен,
{fullName}`,
  
  // Update problemCategories to include it
};
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#4B7A99',     // Change blue
  secondary: '#65A580',   // Change green
  // ...
}
```

### Modifying Service Link

In `src/App.jsx`, find the "Қызметті ашу" button and update the URL:

```javascript
window.open('https://your-egov-link.kz', '_blank');
```

## Data Flow

1. User selects problem → `selectedProblem` state updates
2. User enters details → `formData` state updates
3. Form data + template → `replaceTemplatePlaceholders()` generates complaint
4. Complaint displayed in preview → User can copy or edit
5. All data saved to `localStorage` for persistence

## Validation

- **Full name** — Required, non-empty string
- **Address** — Required, non-empty string
- **Date** — Required, valid date format
- **Custom description** (if "Басқа" selected) — Required if problem is "Other"

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- No external API calls — instant generation
- LocalStorage caching — fast form restore
- Optimized React re-renders — smooth user experience
- Lightweight CSS-in-JS with Tailwind — minimal bundle
- ~50KB gzip on production build

## License

MIT — Feel free to use and modify

## Support

For issues or feature requests, contact the development team.

---

**Built with ❤️ using React + Tailwind CSS**
