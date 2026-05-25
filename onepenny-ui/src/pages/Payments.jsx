import { useEffect, useState } from "react";
import { Container, Card, CardContent, Typography, Divider, Button, Stack } from "@mui/material";

function Payments() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkout-data") || "{}");
    console.log("💳 PAYMENT DATA LOADED:", stored);
    setData(stored);
  }, []);

  if (!data || !data.cart) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>No payment data found.</Typography>
      </Container>
    );
  }

  const { user, cart, finalTotal, aidApplied, discountReason } = data;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Payment
      </Typography>

      {/* USER INFO */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography fontWeight="bold">
            Student: {user?.firstName || user?.username}
          </Typography>

          <Typography>
            Username: {user?.username}
          </Typography>
        </CardContent>
      </Card>

      {/* CART SUMMARY */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Courses Selected</Typography>

          <Stack spacing={1} sx={{ mt: 2 }}>
            {cart.items.map(item => (
              <div key={item.id}>
                <Typography fontWeight="bold">
                  {item.name}
                </Typography>

                <Typography>
                  Qty: {item.quantity}
                </Typography>

                <Typography color="text.secondary">
                  ${item.price * item.quantity}
                </Typography>

                <Divider sx={{ my: 1 }} />
              </div>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* TOTAL */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography>
  Original Amount: ${data.totalOriginalAmount}
</Typography>
          <Typography>
            Aid Applied: {aidApplied ? "Yes" : "No"}
          </Typography>

          {discountReason && (
            <Typography>
              Reason: {discountReason}
            </Typography>
          )}

          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            Final Amount: ${finalTotal}
          </Typography>
        </CardContent>
      </Card>

      {/* PAYMENT OPTIONS */}
      <Card>
        <CardContent>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Choose Payment Method
          </Typography>

          <Stack spacing={2}>

            <Button variant="contained">
              Pay with Stripe (Credit/Debit Card)
            </Button>

            <Button variant="outlined">
              Pay with Zelle (Manual Transfer)
            </Button>

          </Stack>

        </CardContent>
      </Card>

    </Container>
  );
}

export default Payments;