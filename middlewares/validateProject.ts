import { RequestHandler } from "express";
const validateProject: RequestHandler = (req, res, next) => {
  const { titre, description, image, url } = req.body;

  if (
    !titre || typeof titre !== "string" || titre.trim().length < 3 ||
    !description || typeof description !== "string" || description.trim().length < 10 ||
    !image || typeof image !== "string" ||
    !url || typeof url !== "string" || !url.startsWith("http")
  ) {
    return res.status(400).json({ error: "Champs invalides ou manquants." });
  }
  next();
};

export default validateProject;
