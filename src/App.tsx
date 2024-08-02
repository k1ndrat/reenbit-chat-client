import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Login from "./auth/Login";
import Main from "./pages/Main";
import { AppProvider } from "./context/appContext";
import { ToastProvider } from "./components/Toast/ToastContext";

function App() {
  const routesArray = [
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <p className="text-center">404</p>,
    },
  ];
  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          <main className="min-h-screen">{routesElement}</main>
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
