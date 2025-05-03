// index.js – API de Controle do ClickUp via Express + Railway

const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const CLICKUP\_TOKEN = "pk\_42977582\_SID0A4XAF5BMA4E9IFT254KJGFK01C5F";
const DEFAULT\_LIST\_ID = "901305833574"; // Lista INBOX
const SPACE\_ID = "90131308758";

// Criar tarefa (em lista específica ou default)
app.post("/create-task", async (req, res) => {
const { name, description, status = "BACKLOG", list\_id = DEFAULT\_LIST\_ID, priority = 2, tags = \[] } = req.body;

const response = await fetch(`https://api.clickup.com/api/v2/list/${list_id}/task`, {
method: "POST",
headers: {
Authorization: `Bearer ${CLICKUP_TOKEN}`,
"Content-Type": "application/json",
},
body: JSON.stringify({ name, description, status, priority, tags }),
});

const data = await response.json();
res.status(response.status).json(data);
});

// Listar tarefas de todas as listas do espaço
app.get("/tasks", async (req, res) => {
const response = await fetch(`https://api.clickup.com/api/v2/space/${SPACE_ID}/task`, {
method: "GET",
headers: {
Authorization: `Bearer ${CLICKUP_TOKEN}`,
},
});

const data = await response.json();
res.status(response.status).json(data);
});

// Criar documento no ClickUp Docs
app.post("/create-doc", async (req, res) => {
const { name, content, parent\_id = SPACE\_ID, parent\_type = "space" } = req.body;

const response = await fetch("[https://api.clickup.com/api/v2/doc](https://api.clickup.com/api/v2/doc)", {
method: "POST",
headers: {
Authorization: `Bearer ${CLICKUP_TOKEN}`,
"Content-Type": "application/json",
},
body: JSON.stringify({ name, content, parent: { id: parent\_id, type: parent\_type } }),
});

const data = await response.json();
res.status(response.status).json(data);
});

// Atualizar tarefa existente
app.patch("/update-task/\:task\_id", async (req, res) => {
const { task\_id } = req.params;
const updatePayload = req.body;

const response = await fetch(`https://api.clickup.com/api/v2/task/${task_id}`, {
method: "PUT",
headers: {
Authorization: `Bearer ${CLICKUP_TOKEN}`,
"Content-Type": "application/json",
},
body: JSON.stringify(updatePayload),
});

const data = await response.json();
res.status(response.status).json(data);
});

// Excluir tarefa
app.delete("/delete-task/\:task\_id", async (req, res) => {
const { task\_id } = req.params;

const response = await fetch(`https://api.clickup.com/api/v2/task/${task_id}`, {
method: "DELETE",
headers: {
Authorization: `Bearer ${CLICKUP_TOKEN}`,
},
});

res.status(response.status).json({ status: "deleted", task\_id });
});

// Teste básico de vida do endpoint
app.get("/", (\_, res) => {
res.send("Alcides operacional. ClickUp armado.");
});

app.listen(process.env.PORT || 3000, () => {
console.log(`Servidor ouvindo na porta ${process.env.PORT || 3000}`);
});
