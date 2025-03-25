# React + Tailwind CSS in Taro.js Miniapp

This repository showcases a Taro.js miniapp built using React and styled with Tailwind CSS. Taro.js is a multi-platform development framework, and this project demonstrates how to integrate Tailwind CSS for consistent and efficient styling.

---

## Features

- **React**: Build reusable components with React.
- **Taro.js**: Develop cross-platform miniapps effortlessly.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Custom Configuration**: Tailwind integrated with Taro's environment.

---

## Prerequisites

- In Every Page make sure use **useTaroNavbar()** to make sure navbar color and title color works as expected

Make sure you have the following tools installed:
- [Node.js](https://nodejs.org/) (version >= 14)
- [Taro CLI](https://taro-docs.jd.com/docs/cli/installation)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Run the Development Server

```bash
# For qq dev
npm run dev:qq

# For qq production
npm run dev:qq-production
```

---

## Integrating Tailwind CSS

1. **Install Tailwind CSS**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

2. **Configure Tailwind for Taro**:

   Update `tailwind.config.js` to include Taro-specific files:

   ```js
   module.exports = {
     content: [
       './src/**/*.{js,jsx,ts,tsx}',
       './public/index.html',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. **Setup PostCSS**:

   Add Tailwind CSS to your `postcss.config.js`:

   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

4. **Import Tailwind in the Application**:

   Add the following line in your main stylesheet (e.g., `src/app.css`):

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. **Ensure Taro Compatibility**:

   Add Tailwind's generated CSS file to Taro's `app.config.ts` or `app.config.js`:

   ```js
   export default {
     pages: [
       'pages/index/index',
     ],
     window: {
       backgroundTextStyle: 'light',
       navigationBarBackgroundColor: '#fff',
       navigationBarTitleText: 'Taro Miniapp',
       navigationBarTextStyle: 'black',
     },
     style: 'v2',
   };
   ```

---

## Available Scripts

- **`npm run dev:qq`**: Run locally dev env
- **`npm run dev:qq-production`**: Run locally dev env


- **`npm run build:qq`**: build dev env
- **`npm run build:qq-production`**: build production env


---

## Project Structure

```plaintext
src/
├── components/       # Reusable components
├── pages/            # Application pages
├── styles/           # Global styles (including Tailwind CSS imports)
├── app.js            # Entry point for the application
├── app.config.js     # Taro application configuration
├── tailwind.config.js# Tailwind configuration
└── ...
```

---

## Deployment

Build your miniapp for production:

```bash
# qq DEV
npm run build:qq 

# qq production
npm run build:qq-production 
```

Deploy the generated files from the `dist` directory to your desired platform.

---


