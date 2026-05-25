import { useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Stack
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

import CloseIcon from "@mui/icons-material/Close";

// IMPORT YOUR IMAGES
// put these inside src/assets/

import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";

function About() {

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const images = [pic1, pic2, pic3];

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>

      {/* HERO SECTION */}
      <Card
        sx={{
          borderRadius: 4,
          mb: 4,
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Grid container spacing={4} alignItems="center">

            {/* PROFILE IMAGE */}
            <Grid item xs={12} md={4}>

              <Box
                component="img"
                src={pic1}
                alt="Founder"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  objectFit: "cover",
                  maxHeight: 400
                }}
              />

            </Grid>

            {/* ABOUT TEXT */}
            <Grid item xs={12} md={8}>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                About Us
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 2
                }}
              >
                As a single mother, I experienced firsthand how difficult
                it was to find affordable, high-quality educational support
                for my child.

                <br /><br />

                That experience inspired the creation of
                <b> One Penny A Class</b> —
                a community-driven educational initiative focused on making
                math education accessible for every student through a
                flexible sliding-scale model.

                <br /><br />

                Our mission is to help students build confidence,
                academic success, and long-term opportunity regardless
                of financial circumstances.
              </Typography>

            </Grid>

          </Grid>

        </CardContent>
      </Card>

      {/* SUCCESS STORIES */}
      <Card
        sx={{
          borderRadius: 4,
          mb: 4,
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Success Stories
          </Typography>

          <Stack spacing={3}>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                AP Calculus Success
              </Typography>

              <Typography>
                Students who struggled with confidence in mathematics
                successfully completed AP Calculus AB/BC and improved
                their test performance significantly.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                SAT Workshop Improvements
              </Typography>

              <Typography>
                Through focused SAT Math workshops, students improved
                problem-solving strategies and increased their scores
                with consistent guided practice.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold">
                Supportive Learning Environment
              </Typography>

              <Typography>
                Families consistently share that students feel more
                confident, supported, and motivated after joining our
                classes and summer programs.
              </Typography>
            </Box>

          </Stack>

        </CardContent>
      </Card>

      {/* GALLERY */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 3
        }}
      >
        <CardContent sx={{ p: 4 }}>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Picture Gallery
          </Typography>

          <Grid container spacing={3}>

            {images.map((img, index) => (
              <Grid item xs={12} md={4} key={index}>

                <Box
                  component="img"
                  src={img}
                  alt={`Gallery ${index}`}
                  onClick={() => handleOpen(img)}
                  sx={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.02)"
                    }
                  }}
                />

              </Grid>
            ))}

          </Grid>

        </CardContent>
      </Card>

      {/* IMAGE DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
      >

        <DialogContent sx={{ p: 1, position: "relative" }}>

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "white"
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={selectedImage}
            alt="Preview"
            sx={{
              width: "100%",
              borderRadius: 2
            }}
          />

        </DialogContent>

      </Dialog>

     

<Card
  sx={{
    borderRadius: 4,
    mt: 4,
    boxShadow: 3
  }}
>
  <CardContent sx={{ p: 4 }}>

    <Typography
      variant="h4"
      fontWeight="bold"
      sx={{ mb: 3 }}
    >
      Contact Us
    </Typography>

    <Stack spacing={3}>

      {/* EMAIL */}
      <Stack direction="row" spacing={2} alignItems="center">

        <EmailIcon color="primary" />

        <Typography variant="body1">
          onepennyaclass@gmail.com
        </Typography>

      </Stack>

      {/* FACEBOOK */}
      <Stack direction="row" spacing={2} alignItems="center">

        <FacebookIcon
          sx={{ color: "#1877F2" }}
        />

        <Typography variant="body1">
          @OnePennyAClass
        </Typography>

      </Stack>

      {/* TWITTER / X */}
      <Stack direction="row" spacing={2} alignItems="center">

        <XIcon />

        <Typography variant="body1">
          @OnePennyClass
        </Typography>

      </Stack>

    </Stack>

  </CardContent>
</Card>

    </Container>
  );
}

export default About;