import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Stack
} from "@mui/material";

function FinancialAid() {
  const location = useLocation();
  const navigate = useNavigate();

  // ============================
  // SAFE STATE HANDLING
  // ============================
  const stored = JSON.parse(localStorage.getItem("aid-data") || "{}");

const state = location.state || stored;

const user = state.user || null;
const cart = state.cart?.items || [];
const baseAmount = state.cart?.totalAmount || 0; 

  const [form, setForm] = useState({
    singleMother: "",
    divorce: "",
    domesticViolence: "",
    incomeUnder75k: "",
    income: "",
    snap: ""
  });

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ============================
  // DISCOUNT ENGINE
  // ============================
  const calculateDiscount = () => {
    const income = Number(form.income || 0);

    const q1 = form.singleMother === "yes";
    const q2 = form.divorce === "yes";
    const q3 = form.domesticViolence === "yes";
    const q4 = form.incomeUnder75k === "yes";

    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // RULE 1: $0.01 per course
    if ((q1 || q2) && q4) {
      return {
        final: cart.length * 0.01,
        reason: "One Penny Per Class Eligible"
      };
    }

    // RULE 2: DV + single mother + not low income
    if (q1 && q3 && !q4) {
      return {
        final: cart.length * 0.01,
        reason: "Special Support Eligibility"
      };
    }

    // RULE 3: 75k–90k → 50% off
    if (income >= 75000 && income <= 90000) {
      return {
        final: total * 0.5,
        reason: "50% Income-Based Discount"
      };
    }

    // DEFAULT
    return {
      final: total,
      reason: "No Discount Applied"
    };
  };

  const result = calculateDiscount();

  // ============================
  // PROCEED TO PAYMENT
  // ============================
  const handleProceed = () => {

  const storedRaw = localStorage.getItem("checkout-data");
  const stored = storedRaw ? JSON.parse(storedRaw) : {};

  console.log("📦 BEFORE MERGE:", stored);

  const totalOriginal = stored.cart.items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const updatedPayload = {
    ...stored,

    cart: {
      ...stored.cart,
      items: stored.cart.items.map(item => {
        const itemTotal = item.price * (item.quantity || 1);

        const ratio = itemTotal / totalOriginal;

        return {
          ...item,
          finalPrice: Number((result.final * ratio).toFixed(2))
        };
      })
    },

    totalOriginalAmount: totalOriginal,
    finalTotal: result.final,
    discountReason: result.reason,
    aidApplied: true
  };

  console.log("🔥 AFTER MERGE:", updatedPayload);

  localStorage.setItem("checkout-data", JSON.stringify(updatedPayload));

  navigate("/payments");
};
  return (
    <Container sx={{ mt: 4, mb: 6 }}>

      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Financial Aid Application
      </Typography>

      {/* USER INFO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">
            Student: {user?.firstName || user?.username || "Guest"}
          </Typography>

          <Typography>
            Total Courses: {cart.length}
          </Typography>

          <Typography>
            Base Amount: ${baseAmount}
          </Typography>
        </CardContent>
      </Card>

      {/* FORM */}
      <Card sx={{ mb: 3 }}>
        <CardContent>

          <Stack spacing={2}>

            <TextField
              select
              label="Are you a single mother?"
              name="singleMother"
              value={form.singleMother}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <TextField
              select
              label="Undergoing divorce or separated?"
              name="divorce"
              value={form.divorce}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <TextField
              select
              label="Victim of domestic violence?"
              name="domesticViolence"
              value={form.domesticViolence}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <TextField
              select
              label="Income under $75,000?"
              name="incomeUnder75k"
              value={form.incomeUnder75k}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

            <TextField
              label="Annual Income"
              name="income"
              type="number"
              value={form.income}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Receiving SNAP/TANF?"
              name="snap"
              value={form.snap}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </TextField>

          </Stack>

        </CardContent>
      </Card>

      {/* RESULT */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">
            Discount Result
          </Typography>

          <Typography>
            Reason: {result.reason}
          </Typography>

          <Typography variant="h5" fontWeight="bold">
            Final Amount: ${result.final}
          </Typography>
        </CardContent>
      </Card>

      {/* BUTTON */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleProceed}
        sx={{ py: 1.5 }}
      >
        Proceed to Payment
      </Button>

    </Container>
  );
}

export default FinancialAid;