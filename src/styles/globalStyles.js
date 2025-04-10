import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* 기본 색상 */
    --background: #ffffff;
    --foreground: #0f172a;
    --card: #ffffff;
    --card-foreground: #0f172a;
    --popover: #ffffff;
    --popover-foreground: #0f172a;
    --primary: #10b981; /* 녹색 - 건강과 영양을 상징 */
    --primary-foreground: #ffffff;
    --secondary: #f1f5f9;
    --secondary-foreground: #1e293b;
    --muted: #f1f5f9;
    --muted-foreground: #64748b;
    --accent: #ecfdf5; /* 연한 녹색 */
    --accent-foreground: #10b981;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #e2e8f0;
    --input: #e2e8f0;
    --ring: #10b981;
    --radius: 0.5rem;

    /* 영양소 색상 */
    --protein: #10b981; /* 에메랄드 그린 */
    --protein-light: #d1fae5;
    --protein-dark: #047857;
    --protein-foreground: #ffffff;
    
    --carbs: #6366f1; /* 인디고 */
    --carbs-light: #e0e7ff;
    --carbs-dark: #4338ca;
    --carbs-foreground: #ffffff;
    
    --fat: #f59e0b; /* 앰버 */
    --fat-light: #fef3c7;
    --fat-dark: #b45309;
    --fat-foreground: #ffffff;
    
    --vitamin: #ec4899; /* 핑크 */
    --vitamin-light: #fce7f3;
    --vitamin-dark: #be185d;
    --vitamin-foreground: #ffffff;
    
    --mineral: #06b6d4; /* 사이언 */
    --mineral-light: #cffafe;
    --mineral-dark: #0e7490;
    --mineral-foreground: #ffffff;
  }

  .dark {
    --background: #0f172a;
    --foreground: #f8fafc;
    --card: #1e293b;
    --card-foreground: #f8fafc;
    --popover: #1e293b;
    --popover-foreground: #f8fafc;
    --primary: #10b981;
    --primary-foreground: #ffffff;
    --secondary: #334155;
    --secondary-foreground: #f8fafc;
    --muted: #334155;
    --muted-foreground: #94a3b8;
    --accent: #064e3b;
    --accent-foreground: #10b981;
    --destructive: #ef4444;
    --destructive-foreground: #ffffff;
    --border: #334155;
    --input: #334155;
    --ring: #10b981;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--foreground);
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .grid {
    display: grid;
  }

  /* 영양소 관련 스타일 */
  .protein-badge {
    background-color: var(--protein);
    color: var(--protein-foreground);
  }

  .carbs-badge {
    background-color: var(--carbs);
    color: var(--carbs-foreground);
  }

  .fat-badge {
    background-color: var(--fat);
    color: var(--fat-foreground);
  }

  .nutrition-progress-protein {
    height: 0.5rem;
    background-color: var(--protein-light);
  }
  
  .nutrition-progress-protein > div {
    background-color: var(--protein);
  }

  .nutrition-progress-carbs {
    height: 0.5rem;
    background-color: var(--carbs-light);
  }
  
  .nutrition-progress-carbs > div {
    background-color: var(--carbs);
  }

  .nutrition-progress-fat {
    height: 0.5rem;
    background-color: var(--fat-light);
  }
  
  .nutrition-progress-fat > div {
    background-color: var(--fat);
  }
`;

export default GlobalStyles;