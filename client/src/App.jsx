import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import RecipeDetail from "./components/RecipeDetail";
function App() {
  const { setUser, setIsAuthenticated} = useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/recipe/:id" element={<RecipeDetail />} /> */}
        <Route path="/*" element={<Home />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
