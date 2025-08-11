import AnimatedBackground from "./AnimatedBackground";
import ModeToggle from "./ModeToggle";

export default function FormLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative pt-20">
      <AnimatedBackground />
      <ModeToggle />
      
      {/* This is where the form content will render */}
      <div className="z-10 w-full">
        {children}
      </div>
    </div>
  );
}
