const express = require("express");

const app = express();

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 32,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 30,
  },
  {
    id: 3,
    name: "John Smith",
    age: 25,
  },
];

//middleware
app.use(express.json());

// This route gets *ALL* the users
app.get("/api/users", (req, res) => {
  res.json(data);
});

// Add a new route to get a *SINGLE* user (you can use either path param or query param)
// /api/users/1      <-- path param (req.params.id)
// /api/users?id=1   <-- query param (req.query.id) If you go with query param, just modify the existing endpoint above instead of creating a new endpoint

app.get("/api/users/:id", (req, res) => {
  const singleUser = data.find((usr) => {return usr.id === Number(req.params.id)});
  if (singleUser){
    res.json(singleUser);
  } else {
    res.status(404).end()
  }
});

// BONUS QUESTION - Add routes to implement all the CRUD operations (POST, PUT, DELETE)

// POST
app.post("/api/users/:id", (req, res) => {
  if(req.body.id !== Number(req.params.id)){
    console.log("hhhhaaaaa????")
    res.status(400).end();
  }

  if(!data.find((usr) => {return usr.id === Number(req.params.id)})){
    data.push(req.body);
    res.end()
  } else {
    res.status(409).end();
  }
});

// PUT
app.put("/api/users/:id", (req, res) => {
  if(req.body.id !== Number(req.params.id)){
    res.status(400).end();
    return;
  }
  
  const requestedUser = data.find((usr) => {return usr.id === Number(req.params.id)});
  if(requestedUser){
    const index = data.indexOf(requestedUser);
    if (index > -1) {
      data.splice(index, 1);
    }
    data.push(req.body);
    res.end()
  } else {
    data.push(req.body);
    res.status(201).end();
  }
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  const userToDelete = data.find((usr) => {return usr.id === Number(req.params.id)});
  if(userToDelete){
    const index = data.indexOf(userToDelete);
    if (index > -1) {
      data.splice(index, 1);
    }
    res.end()
  } else {
    res.status(404).end();
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
