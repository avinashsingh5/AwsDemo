const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>🚀 CI/CD is Working!</h1>
        <p>If you can see this dog, GitHub Actions deployed successfully.</p>
        <img src="https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg" width="400">
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});