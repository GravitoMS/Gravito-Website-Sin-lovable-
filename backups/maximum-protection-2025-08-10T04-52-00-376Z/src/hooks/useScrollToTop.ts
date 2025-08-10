import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  const scrollToTop = useCallback(() => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }, []);

  useEffect(() => {
    // Only scroll if pathname changed and we're not at the top
    if (prevPathname.current !== pathname && window.scrollY > 0) {
      scrollToTop();
      prevPathname.current = pathname;
    }
  }, [pathname, scrollToTop]);

  return scrollToTop;
};
