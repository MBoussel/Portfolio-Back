import type { RequestHandler } from "express";

// Import access to data
import projectWithSkillsRepository from "./projectWithSkillsRepository";



// GET - Project with Skills
const getProjectsWithSkills: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectWithSkillsRepository.projectsWithSkills();
    res.json(projects)
  }catch (err){
    next(err)
  }
}

export default { getProjectsWithSkills };
