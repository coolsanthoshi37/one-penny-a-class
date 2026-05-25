const BASE_URL = "https://localhost:7263/api";



export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/Students`);
  return res.json();
};

export const getMyStudent = async (username) => {
  const res = await fetch(`${BASE_URL}/Students/me?username=${username}`);
  return res.json();
};

export const createStudent = async (student) => {
  const res = await fetch(`${BASE_URL}/Students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!res.ok) {
    throw new Error("Failed to create student");
  }

  return res.json();
};

export const updateStudent = async (id, student) => {
  const res = await fetch(`${BASE_URL}/Students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!res.ok) {
    throw new Error("Failed to update student");
  }

  return res.json();
};

export const deleteStudent = async (id) => {
  const res = await fetch(`${BASE_URL}/Students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
};

export const getStudentCount = async () => {
  const res = await fetch(`${BASE_URL}/Students`);
  const data = await res.json();
  return data.length;
};