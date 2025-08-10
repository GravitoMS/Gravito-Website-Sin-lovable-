import { useLocation } from "react-router-dom";
import { FadeIn } from '@/components/ui/SimpleAnimations';
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Track 404 error for analytics
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <FadeIn className="text-center">
        <FadeIn delay={0.1} className="text-4xl font-bold mb-4">
          404
        </FadeIn>
        <FadeIn delay={0.2} className="text-xl text-muted-foreground mb-4">
          Oops! Page not found
        </FadeIn>
        <FadeIn delay={0.3} className="text-info hover:text-info underline">
          <a href="/">Return to Home</a>
        </FadeIn>
      </FadeIn>
    </div>
  );
};

export default NotFound;
