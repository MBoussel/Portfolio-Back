import express from "express";
import projectActions from "./project/projectActions";



const router =express.Router();
//Routes Projects
router.get("/api/projects", projectActions.browse);
router.get("/api/projects/:id", projectActions.read);
router.post("/api/project", projectActions.add);



export default router