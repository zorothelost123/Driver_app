import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { DemoAppProvider, useDemoAppContext } from "./context/DemoAppContext";
import { AuthScreen } from "./components/AuthScreen";
import { SplashScreen } from "./components/SplashScreen";
import { router } from "./routes";

function AppContent() {
  const { isAuthenticated } = useDemoAppContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowSplash(false);
    }, 900);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <DemoAppProvider>
      <AppContent />
    </DemoAppProvider>
  );
}
