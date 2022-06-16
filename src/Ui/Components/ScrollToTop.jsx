import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Use to scroll back to top after navigated
const ScrollToTop = (props) => {
  // Prevent auto scrolling to top in Settings page
  const pttr = new RegExp("/settings/.*");
  const location = useLocation();

  useEffect(() => {
    const matchSettings = location.pathname.match(pttr);
    if (!matchSettings) window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
