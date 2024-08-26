const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
    name: String,
    class: String,
    address: String,
    rollNumber: String,
    gender: String,
    batchYear: Number, // New field for batch year
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

app.get('/students', async (req, res) => {
    const { rollNumber } = req.query;
    if (rollNumber) {
        const student = await Student.findOne({ rollNumber });
        return res.send(student);
    } else {
        const students = await Student.find();
        return res.send(students);
    }
});

app.get('/students/statistics', async (req, res) => {
    const totalStudents = await Student.countDocuments();
    const studentsByGender = await Student.aggregate([
        { $group: { _id: "$gender", count: { $sum: 1 } } }
    ]);
    const studentsByBatchYear = await Student.aggregate([
        { $group: { _id: "$batchYear", count: { $sum: 1 } } },
        { $sort: { _id: 1 } } // Sort by batch year
    ]);

    res.send({ totalStudents, studentsByGender, studentsByBatchYear });
});

app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.send(student);
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
});

app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: 'Student deleted' });
});

app.get('/students/report', async (req, res) => {
    const count = await Student.countDocuments();
    res.send({ count });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
