"use strict";

const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("./expressError");

const { items } = require("./fakeDb");


router.get("/", function (req, res) {
  return res.json({ "items": items });
});

router.post("/", function (req, res) {
  const item = { "name": req.body.name, "price": req.body.price };
  items.push(item);

  return res.json({ "added": item });
});

router.get("/:name", function (req, res) {
  let name = req.params.name;
  let price;

  const itemNames = items.map(i => i.name);
  if (!(itemNames.includes(name))) {
    throw new BadRequestError("Name not found");
  }

  // database could have multiple items with the same name...
  for (let item of items) {
    if (name === item.name) {
      price = item.price;
    }
  }

  return res.json({ "name": name, "price": price });
});

router.patch("/:name", function (req, res) {
  let originalName = req.params.name;

  const itemNames = items.map(i => i.name);
  if (!(itemNames.includes(originalName))) {
    throw new BadRequestError("Patch failed: Name not found");
  }

  let item;

  for (let i = 0; i < items.length; i++) {
    if (originalName === items[i].name) {
      items[i].name = req.body.name || items[i].name;
      items[i].price = req.body.price || items[i].price;
      item = items[i];
    }
  }

  return res.json({ "updated": item });
});

router.delete("/:name", function (req, res) {
  let name = req.params.name;

  const itemNames = items.map(i => i.name);
  if (!(itemNames.includes(name))) {
    throw new BadRequestError("Delete failed: name not found");
  }

  for (let i = 0; i < items.length; i++) {
    if (name === items[i].name) {
      items.splice(i, 1);
    }
  }

  return res.json({ "message": "Deleted" });
});


module.exports = router;