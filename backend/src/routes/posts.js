const express = require("express");

const { getGroupedPosts } = require("../services/postsService");

const router = express.Router();

// Optional: GET /posts?name=Pedro
router.get("/", async (req, res) => {
  try {
    const nameFilter = (req.query.name || "").trim();
    const data = await getGroupedPosts({ nameFilter });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
