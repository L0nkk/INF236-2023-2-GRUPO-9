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

router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("pacientes");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;