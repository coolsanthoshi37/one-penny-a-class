import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";

import { TablePagination } from "@mui/material";

import { getStudents, getMyStudent, createStudent, deleteStudent, updateStudent } from "../api/studentApi";

import StudentList from "../components/StudentList";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [createOpen, setCreateOpen] = useState(false);
const [newStudent, setNewStudent] = useState({
  firstName: "",
  lastName: "",
  age: "",
  grade: ""
});

const [editOpen, setEditOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

 const { user } = useAuth();

useEffect(() => {
  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let data;

      if (user.role === "Admin") {
        console.log("Home → calling getStudents()");
        data = await getStudents();
      } else {
        console.log("Home → calling getMyStudent()");
        data = await getMyStudent(user.username);
      }

      console.log("Students loaded:", data);

      setStudents(Array.isArray(data) ? data : [data]);

    } catch (err) {
      console.error("Failed to load students:", err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [user]);

const handleCreateChange = (e) => {
  setNewStudent({
    ...newStudent,
    [e.target.name]: e.target.value
  });
};

const handleCreate = async () => {
  try {
    await createStudent(newStudent);

    setCreateOpen(false);

    setNewStudent({
      firstName: "",
      lastName: "",
      age: "",
      grade: ""
    });

    window.location.reload(); // simple refresh for now
  } catch (err) {
    console.error("Create failed:", err);
  }
};

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
  try {
    await updateStudent(selectedStudent.id, selectedStudent);

    setEditOpen(false);
    setSelectedStudent(null);

    window.location.reload(); // simple refresh (we can improve later)
  } catch (err) {
    console.error("Update failed:", err);
  }
};

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
    <Container maxWidth="lg" sx={{ mt: 4 }}>

    {/* HEADER */}
    <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
      Dashboard Overview
    </Typography>

    {/* TOP METRICS ROW */}
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>

      <Card sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Total Students
          </Typography>

          <Typography variant="h3" fontWeight="bold">
            {loading ? "..." : students.length}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Active Courses
          </Typography>

          <Typography variant="h3" fontWeight="bold">
            8
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Payments
          </Typography>

          <Typography variant="h3" fontWeight="bold">
            $12,400
          </Typography>
        </CardContent>
      </Card>

    </Stack>

    {/* TABLE SECTION */}
<Card sx={{ borderRadius: 3 }}>
  <CardContent sx={{ px: 3, py: 2 }}>

    {/* HEADER BAR */}
    <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="center"
  sx={{
    mb: 2,
    width: "100%"
  }}
>

      {/* LEFT TITLE */}
      <Typography variant="h6" fontWeight="bold">
        Students
      </Typography>

     <Typography sx={{ color: "white" }}>
  &nbsp;&nbsp;&nbsp;
</Typography>

      {/* RIGHT ACTION */}
      <Button
        variant="contained"
        onClick={() => setCreateOpen(true)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 2
        }}
      >
        + Add Student
      </Button>

    </Stack>

    {/* TABLE */}
    <StudentList
  students={students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
<TablePagination
  component="div"
  count={students.length}
  page={page}
  onPageChange={(event, newPage) => setPage(newPage)}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={(e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }}
  rowsPerPageOptions={[5, 10, 25]}
 />

  </CardContent>
</Card>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
  <DialogTitle>Create Student</DialogTitle>

  <DialogContent>
    <TextField
      margin="dense"
      label="First Name"
      name="firstName"
      fullWidth
      value={newStudent.firstName}
      onChange={handleCreateChange}
    />

    <TextField
      margin="dense"
      label="Last Name"
      name="lastName"
      fullWidth
      value={newStudent.lastName}
      onChange={handleCreateChange}
    />

    <TextField
      margin="dense"
      label="Age"
      name="age"
      fullWidth
      value={newStudent.age}
      onChange={handleCreateChange}
    />

    <TextField
      margin="dense"
      label="Grade"
      name="grade"
      fullWidth
      value={newStudent.grade}
      onChange={handleCreateChange}
    />
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setCreateOpen(false)}>
      Cancel
    </Button>

    <Button variant="contained" onClick={handleCreate}>
      Create
    </Button>
  </DialogActions>
</Dialog>

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

export default Home;