import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import Cards from "../components/Cards";
import RecipeDetail from "../components/RecipeDetail";
import Header from "../components/Header";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get(`${server}/recipe`, {
      withCredentials: true,
    })
      .then((res) => {
        setRecipes(res.data.recipes);
        setFilteredRecipes(res.data.recipes);
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.response.data.message);
      });
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                {filteredRecipes.length > 0 ? (
                  filteredRecipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                      <Cards recipe={recipe} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center", marginTop: "20px" }}>
                    No recipes found
                  </Typography>
                )}
              </Grid>
            </Box>
          </ProtectedRoute>
        } />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
      </Routes>
    </>
  );
};

export default Home;
