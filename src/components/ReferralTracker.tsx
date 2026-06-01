import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { validateAndStoreRef } from "@/lib/affiliateRef";

/** Detects ?ref=CODE in URL and stores a tracking cookie for 90 days. */
const ReferralTracker = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("ref");
    if (code) {
      validateAndStoreRef(code, "link");
    }
  }, [location.search]);
  return null;
};

export default ReferralTracker;
