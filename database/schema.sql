USE portfolio;
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  url VARCHAR(255)
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  logo VARCHAR(100) NOT NULL
);

CREATE TABLE projects_skills (
  projects_id INT NOT NULL,
  skills_id INT NOT NULL,
  PRIMARY KEY (projects_id, skills_id),
  FOREIGN KEY (projects_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (skills_id) REFERENCES skills(id) ON DELETE CASCADE
);
