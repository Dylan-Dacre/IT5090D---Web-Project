import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();
  const domain = "dev-gx32ay1mp1zopqmb.us.auth0.com";
  const clientId = "bMTFH85qLerGmhFvKCRJaVemf9TtvPtl";
  const audience = "https://xxx.co.nz";
  const redirectUri = window.location.origin;
  const authorizationParams = { audience: audience, redirectUri: redirectUri };

  const onRedirectCallback = (appState) => {
    if (appState?.returnTo === "/dashboard") {
      navigate("/dashboard");
    } else {
      navigate(appState?.returnTo || "/");
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={authorizationParams}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
