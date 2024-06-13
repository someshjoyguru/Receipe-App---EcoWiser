import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { server } from '../main';
import { toast } from 'react-hot-toast';

const EditRecipeDialog = ({ open, onClose, recipe, onUpdate }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState('');

  useEffect(() => {
    if (recipe) {
      setHeading(recipe.heading);
      setDescription(recipe.description);
      setRecipeImage(recipe.recipeImage);
    }
  }, [recipe]);

  const handleSubmit = async () => {
    try {
      const updatedRecipe = { _id: recipe._id, heading, description, recipeImage};
      await axios.post(`${server}/recipe/edit`, updatedRecipe, {
        withCredentials: true,
      });
      onUpdate({ ...recipe, heading, description, recipeImage });
      toast.success('Recipe updated successfully');
      onClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Recipe</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Recipe Image URL"
            value={recipeImage}
            onChange={(e) => setRecipeImage(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecipeDialog;
