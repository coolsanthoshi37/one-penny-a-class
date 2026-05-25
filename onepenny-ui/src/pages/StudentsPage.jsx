import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";

import StudentList from "../components/StudentList";
import { useAuth } from "../context/AuthContext";

import {
  getStudents,
  getMyStudent,
  updateStudent,
  deleteStudent
} from "../api/studentApi";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

function StudentsPage() {

  console.log("🔥 StudentsPage rendered");

  // ✅ Hook is INSIDE component
  const { user } = useAuth();

  console.log("👤 USER:", user);

  const [students, setStudents] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // ==============================
  // LOAD STUDENTS
  // ==============================
  const loadStudents = async () => {
  if (!user) return;

  console.log("USER:", user);

  try {
    if (user.role === "Admin") {
      console.log("Calling getStudents()");
      const data = await getStudents();
      setStudents(data);
    } else {
      console.log("Calling getMyStudent()");
      const data = await getMyStudent(user.username);
      setStudents(data ? [data] : []);
    }
  } catch (err) {
    console.error("Failed loading students:", err);
  }
};

  // ==============================
  // EFFECT
  // ==============================
useEffect(() => {
  loadStudents();
}, [user]);

  // ==============================
  // EDIT HANDLERS
  // ==============================
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    await updateStudent(selectedStudent.id ?? selectedStudent.studentId, selectedStudent);

    setEditOpen(false);
    setSelectedStudent(null);

    await loadStudents();
  };

  // ==============================
  // DELETE (placeholder)
  // ==============================
  const handleDelete = async (id) => {
  try {
    console.log("🗑️ Deleting student with id:", id);

    await deleteStudent(id);

    console.log("✅ Deleted successfully");

    await loadStudents(); // refresh table
  } catch (err) {
    console.error("❌ Delete failed:", err);
  }
};
  console.log("📦 STUDENTS STATE:", students);

  return (
    <Container>
      <Typography variant="h4" sx={{ marginTop: 3 }}>
        One Penny A Class - Students
      </Typography>

      {/* TABLE */}
      <StudentList
        students={students}
        onEdit={handleEdit}        
        onDelete={handleDelete}
      />

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            fullWidth
            value={selectedStudent?.firstName || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            fullWidth
            value={selectedStudent?.lastName || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Age"
            name="age"
            fullWidth
            value={selectedStudent?.age || ""}
            onChange={handleEditChange}
          />

          <TextField
            margin="dense"
            label="Grade"
            name="grade"
            fullWidth
            value={selectedStudent?.grade || ""}
            onChange={handleEditChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default StudentsPage;