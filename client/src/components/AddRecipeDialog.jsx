import React, { useContext, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';

const AddRecipeDialog = ({ open, onClose, onAdd }) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const {user} = useContext(Context);
  const handleSubmit = async () => {
    try {
      const newRecipe = { heading, description, recipeImage, userName: user.name};
      await axios.post(`${server}/recipe/new`, newRecipe, {
        withCredentials: true,
      });
      const res = await axios.get(`${server}/recipe`, {
        withCredentials: true,
      })
        .then((res) => {
          onAdd(res.data.recipes);
        })
        .catch((e) => {
          console.error(e);
          toast.error(e.response.data.message);
        });
      toast.success('Recipe added successfully');
      onClose();
    } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Recipe</DialogTitle>
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
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecipeDialog;
