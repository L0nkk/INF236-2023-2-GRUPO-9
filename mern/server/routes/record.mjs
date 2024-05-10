import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("horas");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:rut", async (req, res) => {
  let collection = await db.collection("horas");
  let query = {rut: req.params.rut};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  // Extract required fields for new document
  let newDocument = {
    rut: req.body.rut,
    fecha: req.body.fecha,
    hora: req.body.hora,
    med: req.body.med,
    obs: req.body.obs,
    name: req.body.name,
    tipo: req.body.tipo,
  };

  try {
    // Insert into "horas" collection
    let collection = await db.collection("horas");
    let result = await collection.insertOne(newDocument);
    // Send response
    res.status(204).send();
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      rut: req.body.rut,
    fecha: req.body.fecha,
    hora: req.body.hora,
    med: req.body.med,
    obs: req.body.obs,
    name: req.body.name,
    tipo: req.body.tipo,
    }
  };

  let collection = await db.collection("horas");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:rut", async (req, res) => {
  const query = { rut: req.params.rut };

  const collection = db.collection("horas");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;