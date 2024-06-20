"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ health: "Working" });
});
const prisma = new client_1.PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});
// Gets all tasks
app.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.task.findMany({});
    res.json(response);
}));
// Creates new task
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = yield prisma.task.create({
        data: {
            title: body.title,
            description: body.description,
        },
    });
    res.json({ msg: "Created successfully", response });
}));
// Delete a particular Task
app.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = yield prisma.task.delete({
        where: {
            id: body.id,
        },
    });
    res.json({
        msg: "Task deleted successfully",
        response,
    });
}));
app.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = yield prisma.task.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            description: body.description
        }
    });
    res.json({
        msg: "Task Updated successfully",
        response
    });
}));
// To check/uncheck a task
app.put("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = yield prisma.task.update({
        where: {
            id: body.id
        },
        data: {
            completed: body.status
        }
    });
    res.json({
        msg: "Status Inverted Succesfully",
        response
    });
}));
app.listen(3000, () => console.log("listening"));
