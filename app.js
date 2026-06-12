const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>🚀 CI/CD is Working!</h1>
        <p>If you can see the avenger, GitHub Actions deployed successfully.</p>
        <img src="https://imgs.search.brave.com/uX0njq4ORignY9m00BL1LGo-S_H3a9Jd_six8FwRqlE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZlLzMx/L2YxLzZlMzFmMTUy/Y2E1YjBiMWI3Njk1/ZDAyMWMzZmQwOTg1/LmpwZw" width="400">
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});