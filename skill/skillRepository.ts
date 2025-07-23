import databaseClient from "../database/client";

import type { Result, Rows } from "../database/client";

type Skill ={
     id: number;
     nom:string;
     logo:string;
}

class SkillRepository {

     async create(skill:Omit<Skill, "id">){
          const[result]=await databaseClient.query<Result>(
               "INSERT INTO skills (nom, logo) values (?,?)",
               [skill.nom, skill.logo]
          );
          return result.insertId;
     }
}
export default new SkillRepository();