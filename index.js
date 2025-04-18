import "dotenv/config";
import express from "express";
import uniqid from "uniqid";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const teas = [];

// Get all teas
app.get("/teas", (req, res) => {
  res.status(200).send(teas);
});

// Get a tea by id
app.get("/teas/:id", (req, res) => {
  const { id } = req.params;
  const tea = teas.find((tea) => tea.id === id);
  res.status(200).send(tea);
});

// Add a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const tea = { id: uniqid(), name, price };
  teas.push(tea);
  res.status(200).send(tea);
});

// Update a tea
app.put("/teas/:id", (req, res) => {
  const { id } = req.params;
  // const index = teas.findIndex((tea) => tea.id === id);
  // teas[index] = { ...teas[index], ...req.body };

  const tea = teas.find((tea) => tea.id === id);

  if (!tea) {
    res.status(404).send("Tea not found");
  }

  tea.name = req.body.name;
  tea.price = req.body.price;

  res.status(200).send(tea);
});

// Delete a tea
app.delete("/teas/:id", (req, res) => {
  const { id } = req.params;

  const index = teas.findIndex((tea) => tea.id === id);

  if (index === -1) {
    return res.status(404).send("Tea not found");
  }

  teas.splice(index, 1);

  res.status(200).send("Tea deleted");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
