import express from "express";
import projectActions from "./project/projectActions";
import skillActions from "./skill/skillActions";
import validateProjects from "./middlewares/validateProject";
import validateSkills from "./middlewares/validateSkill";
import projectWithSkillsActions from "./projetWithSkills/projectWithSkillsActions";


const router =express.Router();
//Routes Projects
router.get("/api/projects", projectActions.browse);
router.get("/api/projects/:id", projectActions.read);
router.post("/api/projects",validateProjects, projectActions.add);
router.put("/api/projects/:id",validateProjects, projectActions.edit);
router.delete("/api/projects/:id", projectActions.destroy);

//Routes Skills
router.get("/api/skills", skillActions.browse)
router.get("/api/skills/:id", skillActions.read);
router.post("/api/skills",validateSkills, skillActions.add)

//Routes Projects With Skills
router.get("/api/projects-with-skills", projectWithSkillsActions.getProjectsWithSkills)

export default router