const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

//Route to add new material
app.post("/api/add_material", (req, res) => {
  console.log("add_material");
  const { nameMaterial, priceMaterial, unitMaterial } = req.body;

  db.query(
    "INSERT INTO `db.material` (nameMaterial, priceMaterial, unitMaterial) VALUES (?,?,?)",
    [nameMaterial, priceMaterial, unitMaterial],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all material
app.get("/api/get_material", (req, res) => {
  console.log("get_material");
  db.query("SELECT * FROM `db.material`", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//Route to add new parts
app.post("/api/add_parts", (req, res) => {
  console.log("add_parts");
  const {
    nameParts,
    materialParts,
    quintityMagazinParts,
    quantityOrderParts,
    quantityOccupiedParts,
  } = req.body;

  db.query(
    "INSERT INTO `db.parts` (nameParts, materialParts, quintityMagazinParts, quantityOrderParts, quantityOccupiedParts) VALUES (?,?,?,?,?)",
    [
      nameParts,
      materialParts,
      quintityMagazinParts,
      quantityOrderParts,
      quantityOccupiedParts,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// Route to get all parts
app.get("/api/get_parts", (req, res) => {
  console.log("get_parts");
  db.query("SELECT * FROM `db.parts`", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to delete parts

app.delete("/api/del_parts/:id", (req, res) => {
  const id = req.params.id;
  console.log("del_parts");
  db.query("DELETE FROM `db.parts` WHERE idParts= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Route for update part
app.post("/api/update_part/:id", (req, res) => {
  console.log("update_part");
  const {
    nameParts,
    materialParts,
    quintityMagazinParts,
    quantityOrderParts,
    quantityOccupiedParts,
  } = req.body;

  const id = req.params.id;

  db.query(
    "UPDATE `db.parts` SET `nameParts`= ? ,`materialParts`= ?,`quintityMagazinParts`= ?,`quantityOrderParts`= ?,`quantityOccupiedParts`= ? WHERE idParts = ?",
    [
      nameParts,
      materialParts,
      quintityMagazinParts,
      quantityOrderParts,
      quantityOccupiedParts,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

//EXAMPLES

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the post
app.post("/api/create", (req, res) => {
  const username = req.body.userName;
  const title = req.body.title;
  const text = req.body.text;

  console.log(username, title, text);

  db.query(
    "INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",
    [title, text, username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route for like
app.post("/api/like/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to delete a post

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
