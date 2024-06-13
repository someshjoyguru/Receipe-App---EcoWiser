import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { Context, server } from '../main';
import axios from 'axios';
import formatDate from '../utils/formatDate';
import { useTheme } from '@mui/material/styles';

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const { user } = useContext(Context);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    setDeleteRecipe(false);
    const foundRecipe = recipes.find((r) => r._id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setDeleteRecipe(String(user._id) === String(foundRecipe.user));
    }
  }, [id, user, recipes]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${server}/recipe/${id}`, {
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
      // handle error properly, e.g., toast notification
    }
  };

  if (!recipe) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, width: isLargeScreen ? '65%' : '90%', margin: '0 auto' }}>
      <Button onClick={() => navigate('/')} variant="contained" sx={{ mb: 2 }}>
        Back
      </Button>
      {deleteRecipe && (
        <Button onClick={handleDelete} variant="contained" sx={{ mb: 2 }}>
          Delete
        </Button>
      )}
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        {`By: ${recipe.userName} | Created: ${formatDate(recipe.createdAt)} | Updated: ${formatDate(recipe.updatedAt)}`}
        {user._id === recipe.user}
      </Typography>
      <img src={recipe.recipeImage} alt={recipe.heading} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="h4" component="div" sx={{ mt: 2 }}>
        {recipe.heading}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        {recipe.description}
      </Typography>
    </Box>
  );
};

export default RecipeDetail;
