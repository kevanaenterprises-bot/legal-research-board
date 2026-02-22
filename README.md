# Legal Research Board

A client-side legal research dashboard and cease-and-desist letter generator.

## Features

- **State Selection**: Choose from all 50 US states
- **Legal Issue Description**: Describe your legal issue in detail
- **Automated Research**: Generate a research checklist with links to real legal sources
- **Letter Builder**: Draft a customizable cease-and-desist letter
- **Print-Ready Output**: Print your letter directly from the app

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (Icons)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

## Important Disclaimer

⚠️ **This app does NOT provide legal advice.** It is a research tool that provides links to public legal resources and helps draft letters. Always:

1. Verify all information with official state sources
2. Consult a licensed attorney in your state before taking legal action
3. Follow all applicable laws and regulations

## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # React entry point
├── index.css            # Global styles with Tailwind
├── components/
│   └── PrintButton.tsx  # Print functionality
└── lib/
    ├── usStates.ts      # US state data
    ├── letter.ts        # Letter generation logic
    └── research.ts      # Research data and utilities
```

## License

MIT
