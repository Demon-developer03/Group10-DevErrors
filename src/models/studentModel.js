let nextId = 1;
const students = [
    { id: nextId++, name: "Kiara", course: "BSCRIM" },
    { id: nextId++, name: "Peter", course: "BSED" },
    { id: nextId++, name: "John Rey", course: "BSM" },
    { id: nextId++, name: "John Phillip", course: "BSCS" },
];

const getNextId = () => nextId++;

module.exports = {
    students,
    getNextId
};