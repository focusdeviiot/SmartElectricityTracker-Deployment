import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";
import { AlertProvider } from "./contexts/AlertContext";

const App = () => (
  <AlertProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </AlertProvider>
);

export default App;
