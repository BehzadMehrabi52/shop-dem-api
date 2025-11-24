import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const order = req.body;

  // saving on DB
  console.log("NEW ORDER:", order);

  res.json({
    success: true,
    orderId: Math.floor(Math.random() * 90000 + 10000),
  });
});

export default router;
