# React + Vite App

This project is a React application bootstrapped with Vite. It includes a Playwright test file located at the root directory (`test.js`) for end-to-end testing.

## Prerequisites

- Node.js (version 16 or higher).
- npm or yarn.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing

This project uses Playwright for testing. The `test.js` file at the root directory contains test scripts.

### Running Tests

1. Install Playwright dependencies:
   ```bash
   npx playwright install
   ```
2. Run the tests:
   ```bash
   npx playwright test test.js
   ```

## File Structure

```
.
├── src/             # React application source code
├── test.js          # Playwright test file
├── package.json     # Dependency management
└── README.md        # Project documentation
```
