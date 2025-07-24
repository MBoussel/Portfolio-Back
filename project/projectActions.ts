import type { RequestHandler } from "express";

// Import access to data
import projectRepository from "./projectRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectRepository.readAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);
    const project = await projectRepository.read(projectId);
    if (project == null) {
      res.sendStatus(404);
    } else {
      res.json(project);
    }
  } catch (err) {
    next(err);
  }
};
// THE E OF BREAD - Edit operation
const edit : RequestHandler = async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const updatedRows = await projectRepository.update(id, req.body);
    if (updatedRows === 0) return res.sendStatus(404);
res.sendStatus(204); 
  }catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newProject = {
      titre: req.body.titre,
      description: req.body.description,
      image:req.body.image,
      url:req.body.url
    };

    const insertId = await projectRepository.create(newProject);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Delete operation

const destroy : RequestHandler = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);
    const deletedRows = await projectRepository.deleteProject(projectId);
    if (deletedRows === 0) return res.sendStatus(404);
    res.sendStatus(204);
  }catch(err){
    next(err)
  }
}

// GET - Project with Skills
const getProjectsWithSkills: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectRepository.projectsWithSkills();
    res.json(projects)
  }catch (err){
    next(err)
  }
}

export default { browse, read, edit, add, destroy, getProjectsWithSkills };
