import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function StudentList({ students = [], onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Student List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>First Name</b></TableCell>
            <TableCell><b>Last Name</b></TableCell>
            <TableCell><b>Age</b></TableCell>
            <TableCell><b>Grade</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.grade}</TableCell>

              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onEdit?.(student)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
  color="error"
  onClick={() => {
    console.log("🔥 DELETE CLICKED:", student.id);
    alert("Delete clicked: " + student.id);
    console.log("🔥 onDelete prop:", onDelete);
    onDelete?.(student.id);
  }}
>
  <DeleteIcon />
</IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentList;