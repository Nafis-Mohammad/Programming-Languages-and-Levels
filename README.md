# About
Project created using Node, Express, React, and Postgresql stack

## Programming-Languages-and-Levels
Retrieves Table 2 from https://www.cs.bsu.edu/homepages/dmz/cs697/langtbl.htm , stores it in the database if it doesnt already exist, and displays it. \

### Setup

1) To install the packages required:

On one terminal
```
cd backend
npm install
```

On another terminal
```
cd frontend
npm install
```

2) Create a .env file inside the backend folder and put the following there:

```
DB_NAME = insert-the-database-name-you-want-here
DB_USER = insert-your-postgres-name-here- // default is postgres
DB_HOST = insert-your-postgres-host-here // default is localhost
DB_PASSWORD = insert-DB-password-here
DB_PORT = insert-DB-port-here // default is 5432
```


### To Run

Open two terminals

In terminal 1:
```
cd backend
npm start
```

In terminal 2:
```
cd frontend
npm start
```
