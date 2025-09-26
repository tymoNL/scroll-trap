const express = require("express");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 3000;

// Jouw frontend files in /public
app.use(express.static("public"));

// Endpoint om fake posts door te geven
app.get("/api/posts", async (req, res) => {
  try {
    // Ophalen van DummyJSON (je kan ook JSONPlaceholder gebruiken)
    const response = await fetch("https://dummyjson.com/posts?limit=5");
    const data = await response.json();

    // Optioneel: map de data naar jouw format
    const posts = data.posts.map(post => ({
      id: post.id,
      user: `User${post.userId}`,
      avatar: `https://i.pravatar.cc/40?u=${post.userId}`,
      content: post.body
    }));

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Kon posts niet ophalen" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
