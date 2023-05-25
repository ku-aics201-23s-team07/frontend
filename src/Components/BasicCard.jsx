import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({
  width = "",
  height = "",
  prefix = "",
  title = "",
  adjective = "",
  description = "",
}) {
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState([]);
  useEffect(() => {
    setNewTitle(title.split(" "));
  }, []);
  return (
    <Card sx={{ width, height, margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {prefix}
        </Typography>
        <Typography variant="h5" component="div">
          {newTitle?.map((word, idx) => {
            if (idx === newTitle.length - 1) {
              return <Box component="span">{word}</Box>;
            } else
              return (
                <>
                  <Box component="span">{word}</Box>
                  {bull}
                </>
              );
          })}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {adjective}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          Test it 👉
        </Button>
      </CardActions>
    </Card>
  );
}
