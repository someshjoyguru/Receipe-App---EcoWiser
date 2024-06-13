import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { Context, server } from '../main';
import axios from 'axios';
import formatDate from '../utils/formatDate';
import { useTheme } from '@mui/material/styles';
import EditRecipeDialog from '../components/EditRecipeDialog';
import { toast } from 'react-hot-toast';

const RecipeDetail = ({ recipes, setRecipes}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const { user } = useContext(Context);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userAndRecipeAuthor, setUserAndRecipeAuthor] = useState([null, null]);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  
  useEffect(() => {
    const foundRecipe = recipes.find((r) => r._id === id);
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [id, user, recipes]);

    
  useEffect(() => {
    if (user && recipe) {
      setUserAndRecipeAuthor([user._id, recipe.user]);
    }
  }, [user, recipe]);

    const handleDelete = async () => {
      try {
        await axios.delete(`${server}/recipe/${id}`, {
        withCredentials: true,
        });
      toast.success('Recipe deleted successfully');
      setRecipes(recipes.filter((r) => r._id !== id));
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipe(updatedRecipe);
    setRecipes(recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r)));
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  if (!recipe) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  console.log(recipe);
  return (
    <Box sx={{ p: 2, width: isLargeScreen ? '65%' : '90%', margin: '0 auto' }}>
      <Button onClick={() => navigate('/')} variant="contained" sx={{ mb: 2 }}>
        Back
      </Button>
      {(userAndRecipeAuthor[0] && userAndRecipeAuthor[1] && userAndRecipeAuthor[0] === userAndRecipeAuthor[1]) && (
        <>
          <Button onClick={handleDelete} variant="contained" sx={{ mb: 2 }}>
            Delete
          </Button>
          <Button onClick={handleEdit} variant="contained" sx={{ mb: 2 }}>
            Edit
          </Button>
        </>
      )}
      <Typography variant="body2" component="div" sx={{ mt: 1 }}>
        {`By: ${recipe.userName} | Created: ${formatDate(recipe.createdAt)} | Updated: ${formatDate(recipe.updatedAt)}`}
      </Typography>
      <img src={recipe.recipeImage} alt={recipe.heading} style={{ width: '100%', height: 'auto' }} />
      <Typography variant="h4" component="div" sx={{ mt: 2 }}>
        {recipe.heading}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        {recipe.description}
      </Typography>

      <EditRecipeDialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        recipe={recipe} 
        onUpdate={handleUpdate} 
      />
    </Box>
  );
};

export default RecipeDetail;
