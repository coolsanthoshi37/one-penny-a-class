import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Box,
  Paper,
  TextField
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { useAuth } from "../context/AuthContext";

function Courses() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [cart, setCart] = useState([]);

  // =====================================
  // COURSES
  // =====================================
  const courses = [
    { id: 1, name: "Algebra 1 - monthly", price: 500, description: "Foundational algebra concepts" },
    { id: 2, name: "Algebra 2 - monthly", price: 500, description: "Advanced algebra preparation" },
    { id: 3, name: "AP Pre-Calculus - monthly", price: 600, description: "College-level pre-calculus" },
    { id: 4, name: "Honors Pre-Calculus - monthly", price: 500, description: "Advanced honors preparation" },
    { id: 5, name: "AP Calculus AB - monthly", price: 600, description: "AP Calculus AB preparation" },
    { id: 6, name: "AP Calculus BC - monthly", price: 500, description: "Advanced AP Calculus BC" },
    { id: 7, name: "SAT Prep - monthly", price: 350, description: "SAT preparation workshops" },
    { id: 8, name: "SAT Practice Test Sessions (12)", price: 3000, description: "12 full SAT practice sessions" },
    { id: 9, name: "Summer Workshop - Algebra", price: 750, description: "Summer algebra intensive" },
    { id: 10, name: "Summer Workshop - Geometry", price: 750, description: "Summer geometry intensive" },
    { id: 11, name: "Summer Workshop - SAT", price: 750, description: "Summer SAT preparation" },
    { id: 12, name: "Summer Workshop - AP Prep", price: 750, description: "Summer AP preparation" },
    { id: 13, name: "Individual Tutoring", price: 120, description: "$120 per hour" },
    { id: 14, name: "Geometry - monthly", price: 500, description: "Geometry course" }
  ];

  // =====================================
  // ADD TO CART
  // =====================================
  const addToCart = (course) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === course.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          ...course,
          quantity: 1,
          notes: ""
        }
      ];
    });
  };

  // =====================================
  // REMOVE FROM CART
  // =====================================
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id));
  };

  // =====================================
  // UPDATE CART FIELD (quantity / notes safe helper)
  // =====================================
  const updateCartItem = (id, field, value) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  // =====================================
  // TOTAL
  // =====================================
  const totalAmount = cart.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);

  // Enrollment before Payment
  const enrollCourses = async () => {

  const enrollmentPayload = {
    username: user?.username,
    courses: cart.map(item => ({
      courseId: item.id,
      courseName: item.name,
      quantity: item.quantity || 1,
      priceAtPurchase: item.price,

  finalPrice: item.finalPrice ?? item.price  // 🔥 ADD THIS
    }))
  };

  console.log("🚀 ENROLLMENT PAYLOAD:", enrollmentPayload);

  const response = await fetch(
    "https://localhost:7263/api/enrollment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(enrollmentPayload)
    }
  );

  if (!response.ok) {
    throw new Error("Enrollment failed");
  }

  const result = await response.json();

  console.log("✅ ENROLLMENT SUCCESS:", result);

  return result;
};

  // =====================================
  // PAYMENT NAVIGATION (FINANCIAL AID READY)
  // =====================================
 const goToPaymentDirect = async () => {

  try {

    await enrollCourses(); // 🔥 shared logic

    const paymentPayload = {
      user: {
        username: user?.username,
        firstName: user?.firstName
      },
      cart: {
        items: cart,
        totalAmount,
        totalItems: cart.length
      },
      aidApplied: false,
      totalOriginalAmount: totalAmount,   // 🔥 ADD THIS

  finalTotal: totalAmount 
     
    };

    localStorage.setItem(
      "checkout-data",
      JSON.stringify(paymentPayload)
    );

    navigate("/payments");

  } catch (error) {
    console.error("❌ ENROLLMENT ERROR:", error);
  }
};

const goToAid = async () => {

  try {

    await enrollCourses(); // 🔥 SAME ENROLLMENT CALL

    const payload = {
      user: {
        username: user?.username,
        firstName: user?.firstName
      },
      cart: {
        items: cart,
        totalAmount,
        totalItems: cart.length
      }
    };

    localStorage.setItem("checkout-data", JSON.stringify(payload));

    navigate("/aid");

  } catch (error) {
    console.error("❌ ENROLLMENT ERROR:", error);
  }
};
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>

      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>

        <Typography variant="h4" fontWeight="bold">
          Courses
        </Typography>

        <Typography sx={{ color: 'white' }}>
  &nbsp;&nbsp;&nbsp;&nbsp;
</Typography>

        <Paper elevation={3} sx={{ px: 3, py: 1.5, borderRadius: 3 }}>
          <Typography fontWeight="bold">
            Welcome {user?.username}
          </Typography>
        </Paper>

      </Stack>

      <Grid container spacing={4}>

        {/* LEFT SIDE COURSES */}
        <Grid item xs={12} md={8}>

          <Grid container spacing={3} alignItems="stretch">

            {courses.map(course => {

              const cartItem = cart.find(c => c.id === course.id);

              return (
                <Grid item xs={12} md={6} key={course.id}>

                  <Card sx={{
                    height: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    boxShadow: 3
                  }}>

                    <CardContent sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%"
                    }}>

                      <Typography variant="h6" fontWeight="bold" sx={{ minHeight: 60 }}>
                        {course.name}
                      </Typography>

                      <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                        ${course.price}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2, minHeight: 50 }}>
                        {course.description}
                      </Typography>

                      {/* QUANTITY */}
                      <TextField
                        label={course.name.includes("Tutoring") ? "Hours" : "Quantity"}
                        type="number"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={cartItem?.quantity || ""}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          updateCartItem(course.id, "quantity", value);
                        }}
                      />

                      {/* NOTES */}
                      <TextField
                        label="Notes To Business"
                        multiline
                        rows={2}
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={cartItem?.notes || ""}
                        onChange={(e) => {
                          updateCartItem(course.id, "notes", e.target.value);
                        }}
                      />

                      <Box sx={{ mt: "auto" }}>

                        {!cartItem ? (

                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => addToCart(course)}
                            sx={{ borderRadius: 2, textTransform: "none" }}
                          >
                            Add To Cart
                          </Button>

                        ) : (

                          <Button
                            fullWidth
                            color="error"
                            variant="outlined"
                            startIcon={<RemoveShoppingCartIcon />}
                            onClick={() => removeFromCart(course.id)}
                            sx={{ borderRadius: 2, textTransform: "none" }}
                          >
                            Remove
                          </Button>

                        )}

                      </Box>

                    </CardContent>
                  </Card>

                </Grid>
              );
            })}

          </Grid>
        </Grid>

        {/* RIGHT CART */}
        <Grid item xs={12} md={4}>

          <Card sx={{ borderRadius: 4, position: "sticky", top: 20, boxShadow: 4 }}>

            <CardContent>

              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Cart Summary
              </Typography>

              {cart.length === 0 ? (
                <Typography>No courses selected.</Typography>
              ) : (
                <Stack spacing={2}>
                  {cart.map(course => (
                    <Box key={course.id}>
                      <Typography fontWeight="bold">{course.name}</Typography>
                      <Typography>Qty: {course.quantity}</Typography>

                      {course.notes && (
                        <Typography variant="body2" color="text.secondary">
                          Notes: {course.notes}
                        </Typography>
                      )}

                      <Typography color="primary" fontWeight="bold">
                        ${course.price * course.quantity}
                      </Typography>

                      <Divider sx={{ mt: 1 }} />
                    </Box>
                  ))}
                </Stack>
              )}

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6">
                  Total Courses: {cart.length}
                </Typography>

                <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
                  Total: ${totalAmount}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="text"
                sx={{ mt: 3, textTransform: "none" }}
               onClick={goToAid}
              >
                Request Financial Aid
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, py: 1.5, borderRadius: 3, textTransform: "none" }}
                disabled={cart.length === 0}
                onClick={goToPaymentDirect}
              >
                Proceed To Payment
              </Button>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Container>
  );
}

export default Courses;