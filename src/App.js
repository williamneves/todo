import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { ProtectedRoute } from "./components";
import { Login, Register, Todos, UserSettings } from "./pages";
import { appContext } from "./lib/context";
import { useContext } from "react";

function App() {
  const { theme } = useContext(appContext);
  return (
    <>
      <div className={theme === "dark" ? "dark" : "light"}>
        <div className="mainApp">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route path="/todos" element={<Todos />} />
              <Route path="/user" element={<UserSettings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
