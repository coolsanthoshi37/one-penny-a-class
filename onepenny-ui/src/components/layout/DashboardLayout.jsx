import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";

import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 240;

function DashboardLayout() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>

      {/* TOP NAVBAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201 }}
      >
        <Toolbar>
          <Typography variant="h6">
            One Penny A Class
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar />

        <List>

          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton component={Link} to="/about">
            <ListItemText primary="About" />
          </ListItemButton>

          {/*STUDENT ONLY */}
          {user?.role != "Admin" && (
          <ListItemButton component={Link} to="/dashboard">
          <ListItemText primary="My Dashboard" />
          </ListItemButton>)}

          <ListItemButton component={Link} to="/courses">
            <ListItemText primary="Courses" />
          </ListItemButton>

          <ListItemButton component={Link} to="/payments">
            <ListItemText primary="Payments" />
          </ListItemButton>

          <ListItemButton component={Link} to="/aid">
            <ListItemText primary="Financial Aid" />
          </ListItemButton>

          {/* ADMIN ONLY */}
          {user?.role === "Admin" && (
            <ListItemButton component={Link} to="/students">
              <ListItemText primary="Students" />
            </ListItemButton>
          )}

        </List>
      </Drawer>

      {/* PAGE CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

    </Box>
  );
}

export default DashboardLayout;