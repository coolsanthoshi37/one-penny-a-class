import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
  const res = await fetch("https://localhost:7263/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Invalid login");
    return;
  }

  const isAdmin = username.toLowerCase() === "admin";

  setUser({
  username: data.username,
  role: data.role
});

console.log("LOGIN USER:", data);

  navigate("/");
};

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;