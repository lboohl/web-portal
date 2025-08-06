// src/App.js
import AnimatedBackground from "./components/AnimatedBackground";
import ModeToggle from "./components/ModeToggle";
import BentoBox from "./components/BentoBox";

/**
 * Portal App: Visually appealing, modern UI with animated mesh background,
 * glassmorphic Bento cards, and light/dark mode toggle.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <AnimatedBackground />
      <ModeToggle />
      <header className="mb-12 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-xl mb-2">
          IT & Asset Portal
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Quick access to essential IT services for your organization.
        </p>
      </header>
      <BentoBox />
    </div>
  );
}

export default App;
