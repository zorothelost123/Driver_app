import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { EarningsPage } from "./pages/EarningsPage";
import { InboxPage } from "./pages/InboxPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SurgPage } from "./pages/SurgPage";
import { LoadingScreen } from "./components/LoadingScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/earnings",
    Component: EarningsPage,
  },
  {
    path: "/inbox",
    Component: InboxPage,
  },
  {
    path: "/profile",
    Component: ProfilePage,
  },
  {
    path: "/surg",
    Component: SurgPage,
  },
  {
    path: "/loading",
    Component: LoadingScreen,
  },
]);
