import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("pacientes");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:rut", async (req, res) => {
  let collection = await db.collection("pacientes");
  let query = {rut: req.params.rut};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  let collection = await db.collection("pacientes");
  let paciente = {
    rut: req.body.rut,
    name: req.body.name,
    createdAt : req.body.createdAt,
  };
  let is_complete = Object.values(paciente).every(x => x != null);
  let result = await collection.insertOne(paciente);

  if(is_complete) res.status(204).send();
  else res.status(400).send();
})

router.delete("/:rut", async (req, res) => {
  const query = { rut: req.params.rut };

  const collection = db.collection("pacientes");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;