import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cards = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/recipe/${recipe._id}`)}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.recipeImage}
        alt={recipe.heading}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cards;
