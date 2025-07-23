import express from "express";
import projectActions from "./project/projectActions";
import skillActions from "./skill/skillActions";


const router =express.Router();
//Routes Projects
router.get("/api/projects", projectActions.browse);
router.get("/api/projects/:id", projectActions.read);
router.post("/api/projects", projectActions.add);
router.put("/api/projects/:id", projectActions.edit);
router.delete("/api/projects/:id", projectActions.destroy);

//Routes Skills
router.get("/api/skills", skillActions.browse)
router.get("/api/skills/:id", skillActions.read);

router.post("/api/skills",skillActions.add)

export default router