import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
