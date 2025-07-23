import { RequestHandler } from "express";
const validateProject: RequestHandler = (req, res, next) => {
  const { titre, description, image, url } = req.body;

  if (!titre || !description || !image || !url) {
    return res.status(400).json({ error: "Champs manquants dans la requête." });
  }

  next();
};

export default validateProject;
