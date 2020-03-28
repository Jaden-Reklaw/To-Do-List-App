CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	task VARCHAR (120) NOT NULL,
	description VARCHAR (250) NOT NULL,
	location VARCHAR (120),
	due_date DATE,
	status VARCHAR (80) DEFAULT 'Scheduled'
);

INSERT INTO tasks (task, description, location, due_date)
VALUES ('Groceries', 'Buy groceries for the week', 'Cub Foods','03/29/2020');
INSERT INTO tasks (task, description, location, due_date)
VALUES ('Clean Kitchen', 'Dishes, floor, trash, recycling', 'Home','03/29/2020');
INSERT INTO tasks (task, description, location, due_date)
VALUES ('Laundry', 'Towels and Clothes', 'Home','03/29/2020');
INSERT INTO tasks (task, description, location, due_date)
VALUES ('Movie Night', 'Get friend together to watch a movie over zoom', 'Zoom Meeting','04/04/2020');