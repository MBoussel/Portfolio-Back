import databaseClient from "../database/client";

import type { Result, Rows } from "../database/client";

type Project = {
  id: number;
  titre: string;
  description: string;
  image:string;
  url:string;
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
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ProjectRepository();
