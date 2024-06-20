import { PrismaClient } from "@prisma/client";
import express from "express";
import "dotenv/config";
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ health: "Working" });
});

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

// Gets all tasks
app.get("/all", async (_req, res) => {
  const response = await prisma.task.findMany({});
  res.json(response);
});

// Creates new task
app.post("/create", async (req, res) => {
  const {title, description} = req.body;
  const response = await prisma.task.create({
    data: {
      title,
      description},
  });
  res.json({ msg: "Created successfully", response });
});

// Delete a particular Task
app.delete("/delete", async (req, res) => {
  const {id} = req.body;
  const response = await prisma.task.delete({
    where: {
      id,
    },
  });
  res.json({
    msg: "Task deleted successfully",
    response,
  });
});

// To Update the title or description of task
app.put("/update", async (req, res)=>{
    const {title, description, id} = req.body;
    const response = await prisma.task.update({
        where: {
            id,
        },
        data: {
            title,
            description
        }
    }
    )
    res.json({
        msg: "Task Updated successfully",
        response
    })
})


// To check/uncheck a task
app.put("/check", async (req, res)=>{
    const {id, status} = req.body;
    const response = await prisma.task.update({
        where: {
            id,
        },
        data:{
            completed: status
        }
    })
    res.json({
        msg: "Status Inverted Succesfully",
        response
    });
})

app.listen(PORT, () => console.log(`listening at PORT ${PORT}`));
