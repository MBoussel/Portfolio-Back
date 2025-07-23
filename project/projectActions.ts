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

export default { browse, read, add };
