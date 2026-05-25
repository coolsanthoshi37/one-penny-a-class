import { useEffect, useState } from "react";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Divider,
  Stack
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {

    const getDashboard = async () => {

      try {

        const response = await fetch(
          `https://localhost:7263/api/dashboard/${user?.username}`
        );

        const data = await response.json();

        console.log("📦 DASHBOARD DATA:", data);

        setDashboardData(data);

      } catch (error) {

        console.error("❌ DASHBOARD ERROR:", error);

      }
    };

    if (user?.username) {
      getDashboard();
    }

  }, [user]);

  if (!dashboardData) {
    return <Typography>Loading Dashboard...</Typography>;
  }

  const totalCourses = dashboardData.courses.length;

  const totalSpent = dashboardData.courses.reduce((sum, c) => {
    return sum + (c.priceAtPurchase * c.quantity);
  }, 0);

  return (

    <Box>

      {/* HEADER */}

     <Box
  sx={{
    mb: 5,
    p: 4,
    borderRadius: 4,
    background:
      "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
    color: "white",
    maxWidth: 700,
    mx: "auto",
    textAlign: "center",
    boxShadow: 5
  }}
>

        <Typography variant="h3" fontWeight="bold">

          Welcome {dashboardData.student.firstName}

        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>

          Your student learning dashboard

        </Typography>

      </Box>

      {/* SUMMARY CARDS */}

      <Grid container spacing={3} sx={{ mb: 4 }} alignItems="stretch">

        <Grid item xs={12} md={4} sx={{ display: "flex" }}>

          <Card
  sx={{
    borderRadius: 4,
    boxShadow: 4,
    width:250,
    height: "100%",
    display: "flex",
    alignItems: "center"
  }}
>

            <CardContent sx={{ width: "100%" }}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography color="text.secondary">
                    Courses Enrolled
                  </Typography>

                  <Typography variant="h3" fontWeight="bold">
                    {totalCourses}
                  </Typography>

                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
  <SchoolIcon sx={{ fontSize: 50 }} />
</Box>

               

              </Stack>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

          <Card
  sx={{
    borderRadius: 4,
    boxShadow: 4,
    width: 300,
    height: "100%",
    display: "flex",
    alignItems: "center"
  }}
>

            <CardContent sx={{ width: "100%" }}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography color="text.secondary">
                    Total Invested
                  </Typography>

                  <Typography variant="h3" fontWeight="bold">
                    ${totalSpent}
                  </Typography>

                </Box>                

               <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
  <PaymentsIcon sx={{ fontSize: 50 }} />
</Box>

              </Stack>

            </CardContent>

          </Card>

        </Grid>

        <Grid item xs={12} md={4}>

         <Card
  sx={{
    borderRadius: 4,
    boxShadow: 4,
    width: 270,
    height: "100%",
    display: "flex",
    alignItems: "center"
  }}
>

            <CardContent sx={{ width: "100%" }}>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Box>

                  <Typography color="text.secondary">
                    Student Status
                  </Typography>

                  <Chip
                    label="ACTIVE"
                    color="success"
                    sx={{ mt: 1 }}
                  />

                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
   <MenuBookIcon sx={{ fontSize: 50 }} />
</Box>

              

              </Stack>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

      {/* STUDENT INFO + COURSES */}

      <Grid container spacing={3}>

        {/* STUDENT INFO */}

        <Grid item xs={12} md={4}>

          <Card
            sx={{
              borderRadius: 4,
              height: "100%",
              width: 250,
              boxShadow: 4
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Student Information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>

                <Box>
                  <Typography color="text.secondary">
                    First Name
                  </Typography>

                  <Typography fontWeight="bold">
                    {dashboardData.student.firstName}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary">
                    Last Name
                  </Typography>

                  <Typography fontWeight="bold">
                    {dashboardData.student.lastName}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary">
                    Grade
                  </Typography>

                  <Typography fontWeight="bold">
                    {dashboardData.student.grade}
                  </Typography>
                </Box>

                <Box>
                  <Typography color="text.secondary">
                    Age
                  </Typography>

                  <Typography fontWeight="bold">
                    {dashboardData.student.age}
                  </Typography>
                </Box>

              </Stack>

            </CardContent>

          </Card>

        </Grid>

        {/* COURSES */}

        <Grid item xs={12} md={12}>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              width: 300
            }}
          >

            <CardContent>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                Enrolled Courses
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>

                {dashboardData.courses.map(course => (

                  <Card
                    key={course.courseId}
                    variant="outlined"
                    sx={{
                      borderRadius: 3
                    }}
                  >

                    <CardContent>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >

                        <Box>

                          <Typography
                            variant="h6"
                            fontWeight="bold"
                          >
                            {course.courseName}
                          </Typography>

                          <Typography color="text.secondary">
                            Quantity: {course.quantity}
                          </Typography>

                        </Box>

                        <Chip
  label={`$${course.finalPrice ?? course.priceAtPurchase}`}
  color="primary"
/>

                      </Stack>

                    </CardContent>

                  </Card>

                ))}

              </Stack>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>
  );
}

export default Dashboard;