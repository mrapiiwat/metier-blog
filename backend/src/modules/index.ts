import { Elysia } from "elysia";

const modules = new Elysia({ prefix: "/api" })
    .get("/ping", () => { return "pong" })

export default modules;
