import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import AgencyOnboardingWizard from "../components/AgencyOnboardingWizard";
import ClientOnboardingWizard from "../components/ClientOnboardingWizard";
import { useApp } from "../context/AppContext";

export default function OnboardingWizardPage() {
  const {
    isLoggedIn,
    isAdminUser,
    isAdmin,
    onboardingComplete,
    agencyOnboardingComplete,
    currentTenantId,
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  // Agency/admin users see the agency wizard
  if (isAdmin || isAdminUser) {
    if (agencyOnboardingComplete) {
      navigate({ to: "/dashboard" });
      return null;
    }
    return <AgencyOnboardingWizard />;
  }

  // Client users see the client wizard
  if (onboardingComplete[currentTenantId]) {
    navigate({ to: "/dashboard" });
    return null;
  }
  return <ClientOnboardingWizard />;
}
