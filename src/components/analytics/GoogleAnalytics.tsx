import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Simulate sending pageview to Google Analytics
        console.log(`[GA] Pageview: ${location.pathname}`);

        // In a real implementation, this would be:
        // window.gtag('config', 'GA_MEASUREMENT_ID', {
        //   page_path: location.pathname,
        // });
    }, [location]);

    return null;
}
