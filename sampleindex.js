const express = require('express');
const port = 3000;

let nextId = 1;
const students = [
    { id: nextId++, name: "Kiara", course: "BSCRIM" },
    { id: nextId++, name: "Peter", course: "BSED" },
    { id: nextId++, name: "John Rey", course: "BSM" },
    { id: nextId++, name: "John Phillip", course: "BSCS" },
];

const app = express();

app.use(express.json());

app.post("/students", (request, response) => {
    const newName = request.body.name;
    const newCourse = request.body.course;

    const newStudent = { id: nextId++, name: newName, course: newCourse };
    
    students.push(newStudent);
    
    response.status(201).json(newStudent);
});

// GET: Retrieve all students
app.get("/students", (request, response) => {
    response.json(students);
});

app.get("/students/:id", (request, response) => {
    const studentId = parseInt(request.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        response.json(student);
    } else {
        response.status(404).json({ error: "Student not found" });
    }
});

app.put("/students/:id", (request, response) => {
    const studentId = parseInt(request.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // Update the student's data if provided in the request body
        if (request.body.name) students[studentIndex].name = request.body.name;
        if (request.body.course) students[studentIndex].course = request.body.course;
        
        response.json(students[studentIndex]);
    } else {
        response.status(404).json({ error: "Student not found" });
    }
});

app.delete("/students/:id", (request, response) => {
    const studentId = parseInt(request.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        // Remove the student from the array
        const deletedStudent = students.splice(studentIndex, 1);
        response.json({ message: "Student deleted successfully", deletedStudent: deletedStudent[0] });
    } else {
        response.status(404).json({ error: "Student not found" });
    }
});

app.listen(port, () => {
    console.log('App is listening on port ${port}');
});