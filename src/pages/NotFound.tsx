import { useLocation } from "react-router-dom";
import { FadeInUp, FadeInUpStaggered, FadeInSide, FadeInScale, HoverScale, HoverLift, HoverGlow, FadeInOnScroll, SlideInOnScroll, LoadingPulse, LoadingBounce, FadeInUpWithHover, StaggeredGroup } from '@/components/ui/AnimatedComponents';
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Track 404 error for analytics
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <FadeInUp 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <FadeInUp 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-bold mb-4"
        >
          404
        </FadeInUp>
        <FadeInUp 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-muted-foreground mb-4"
        >
          Oops! Page not found
        </FadeInUp>
        <FadeInUp 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-info hover:text-info underline"
        >
          <a href="/">Return to Home</a>
        </FadeInUp>
      </FadeInUp>
    </div>
  );
};

export default NotFound;
