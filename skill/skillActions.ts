import type { RequestHandler } from "express";

import skillRepository from "./skillRepository";

const browse: RequestHandler = async (req, res, next) => {
    try{
        const skills = await skillRepository.readAll()
        res.json(skills)
    }catch(err){
        next(err);
    }
};
const read: RequestHandler = async (req, res, next) => {
    try{
        const skillId = Number(req.params.id);
        const skill = await skillRepository.read(skillId)
        if(!skill){
            res.status(404).json("No Skill 🥺");
           
        }else{
            res.json(skill);
        }
    }catch (err){
        next(err);
    }
}
const add: RequestHandler = async (req, res, next) =>{
    try{
        const newSkill = {
             nom:req.body.nom,
     logo:req.body.logo,
        };
        const insertId = await skillRepository.create(newSkill)
        res.status(201).json({ insertId });
    }catch(err){
        next(err)
    }
}
export default { browse, read, add };