import React from "react";
import { AuthProvider } from "./hooks/useAuth.jsx";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
