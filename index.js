const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

app.post("/create-task", async (req, res) => {
  const result = await fetch("https://api.clickup.com/api/v2/list/901311515692/task", {
    method: "POST",
    headers: {
      "Authorization": "Bearer pk_42977582_SID0A4XAF5BMA4E9IFT254KJGFK01C5F",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

  const data = await result.json();
  res.json(data);
});

app.get("/", (_, res) => {
  res.send("Alcides está online. Endpoint ativo.");
});

app.listen(process.env.PORT || 3000);
