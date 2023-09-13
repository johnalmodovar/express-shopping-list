const express = require("express");
const router = new express.Router();

const items = require("./fakeDb");

router.get("/", function(req, res) {
  return res.json({ "items": items });
});

router.post("/", function(req, res) {
  const item = {"name": req.body.name, "price": req.body.price};
  items.push(item);

  return res.json({ "added": item });
})

router.get("/:name", function(req, res) {
  let name = req.params.name;
  let price;

  for (let item of items) {
    if (name === item.name) {
      price = item.price;
    }
  }

  return res.json({ "name": name, "price": price });
});

router.patch("/:name", function(req, res) {
  let item;

  for (let i = 0; i < items.length; i++) {
    if (req.body.name === items[i].name) {
      items[i].name = req.body.name;
      items[i].price = req.body.price;
      item = items[i];
    }
  }

  return res.json({ "updated": item });
});

router.delete("/:name", function(req, res) {
  for (let i = 0; i < items.length; i++) {
    if (req.body.name === items[i].name) {
      items.splice(i, 1);
    }
  }

  return res.json({ "message": "Deleted" });
});


modules.exports = router;