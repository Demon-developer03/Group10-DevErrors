const express = require('express');
const port = 3000;

let nextId = 1;
const students = [
    { id: nextId++, name: "Kiara", course: "BSCRIM" },
    { id: nextId++, name: "Peter", course: "BSED" },
    { id: nextId++, name: "John Rey", course: "BSM" },
    { id: nextId++, name: "John Phillip", course: "BSCS" },
];
//hihawvvvvvv
const app = express();

app.use(express.json());

app.post("/students", (request, response) => {
    const newName = request.body.name;
    const newCourse = request.body.course;

    const newStudent = { id: nextId++, name:newName, course: newCourse };
    
    students.push(newStudent);
    
    response.send(newStudent);
});

app.listen(3000, () => {
    console.log("App is listening to port 3000");
});