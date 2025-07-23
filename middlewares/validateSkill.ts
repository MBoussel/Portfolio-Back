import { RequestHandler } from "express";
const validateSkills: RequestHandler = (req, res, next) => {
    const {nom, logo} =req.body;
    if (!nom || !logo){
        return res.status(400).json({ error: "Champs manquants dans la requête." })
    }
    next()
}
export default validateSkills;