import { RowDataPacket } from "mysql2";
import databaseClient from "../database/client";


type Skills = {
  id: number;
  nom: string| null;
  logo: string| null;
};

type Project = {
  id: number;
  titre: string;
  description: string;
  image: string;
  url: string;
  skills: Skills[];
};
type RawRow = {
  projects_id: number;
  projects_titre: string;
  projects_description: string;
  projects_image: string;
  projects_url: string;
  skills_id: number | null;
  skills_nom: string | null;
  skills_logo: string | null;
};

class ProjectWithSkillsRepository {

// GET - Project with Skills


async projectsWithSkills () {
  const [rows] = await databaseClient.query<RowDataPacket[] & RawRow[]>(
    "SELECT p.id AS projects_id, p.titre AS projects_titre, p.description AS projects_description, p.image AS projects_image, p.url AS projects_url, s.id AS skills_id, s.nom AS skills_nom, s.logo AS skills_logo FROM projects AS p LEFT JOIN projects_skills AS ps ON ps.projects_id = p.id LEFT JOIN skills AS s ON s.id = ps.skills_id"
  );
const projectMap = new Map<number, Project>();

    for (const row of rows) {
      const projectId = row.projects_id;

      if (!projectMap.has(projectId)) {
        projectMap.set(projectId, {
          id: projectId,
          titre: row.projects_titre,
          description: row.projects_description,
          image: row.projects_image,
          url: row.projects_url,
          skills: [],
        });
      }

      if (row.skills_id) {
        projectMap.get(projectId)!.skills.push({
          id: row.skills_id,
          nom: row.skills_nom,
          logo: row.skills_logo,
        });
      }
    }

    return Array.from(projectMap.values());
  }
}





export default new ProjectWithSkillsRepository();
