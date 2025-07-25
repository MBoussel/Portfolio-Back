import databaseClient from "../database/client";

import type { Result, Rows } from "../database/client";

type Project = {
  id: number;
  titre: string;
  description: string;
  image: string;
  url: string;
};

class ProjectRepository {
  // The C of CRUD - Create operation

  async create(project: Omit<Project, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO projects (titre, description, image, url) values (?, ?, ?, ?)",
      [project.titre, project.description,project.image,project.url],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM projects WHERE id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Project;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM projects");

    // Return the array of items
    return rows as Project[];
  }

  // The U of CRUD - Update operation
 async update(id:number, project:Partial<Project> ){
  const [result] = await databaseClient.query<Result>(
    "UPDATE projects SET titre = ?, description = ?, image = ?, url = ? WHERE id = ?",
    [project.titre, project.description, project.image, project.url, id])
  return result.affectedRows;
 }

  // The D of CRUD - Delete operation
async deleteProject(id:number){
  const[result] =await databaseClient.query<Result>(
    "DELETE FROM projects WHERE id = ?",
    [id]
  );
  return result.affectedRows
}

// GET - Project with Skills
async projectsWithSkills () {
  const [rows] = await databaseClient.query<Result>(
    "SELECT p.id AS projects_id, p.titre AS projects_titre, p.description AS projects_description, p.image AS projects_image, p.url AS projects_url, s.id AS skills_id, s.nom AS skills_nom, s.logo AS skills_logo FROM projects AS p LEFT JOIN projects_skills AS ps ON ps.projects_id = p.id LEFT JOIN skills AS s ON s.id = ps.skills_id"
  );
  return rows;
}
}

export default new ProjectRepository();
