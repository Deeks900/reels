import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useContext, useState } from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Login.css";
import reelLogo from "../Asset/image1.png";
import imgUrl from "../Asset/image2.png";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../Asset/image3.jpg";
import img2 from "../Asset/image4.jpg";
import img3 from "../Asset/image5.jpg";
import img4 from "../Asset/image6.jpg";
import img5 from "../Asset/image7.jpg";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const store = useContext(AuthContext);
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      height: "7vh",
      marginTop: "2%",
    },
    text2: {
      textAlign: "center",
    },
  });
  console.log("Hi there from Login");
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
  };
  return (
    <div className="loginWrapper">
      <div className="imgLogin">
        <img className="imgMobile" src={imgUrl} alt="logo" />
      </div>
      <div className="car">
        <CarouselProvider
          visibleSlides={1}
          hasMasterSpinner
          isPlaying={true}
          infinite={true}
          dragEnabled={false}
          touchEnabled={false}
          naturalSlideWidth={100}
          naturalSlideHeight={140}
          totalSlides={5}
        >
          <Slider>
            <Slide index={0}>
              <Image src={img2} />
            </Slide>
            <Slide index={1}>
              <Image src={img1} />
            </Slide>
            <Slide index={2}>
              <Image src={img3} />
            </Slide>
            <Slide index={3}>
              <Image src={img4} />
            </Slide>
            <Slide index={4}>
              <Image src={img5} />
            </Slide>
          </Slider>
        </CarouselProvider>
      </div>
      <div className="loginCard">
        <Card variant="outlined">
          <CardContent>
            <div className="reelProImage">
              <img src={reelLogo} alt="logo" />
            </div>
            <Typography className={classes.text1} variant="subtitle1">
              Sign up to see photos and videos from your friends.
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              className={classes.text2}
              color="primary"
              variant="subtitle1"
            >
              ForgetPassword ?
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              margin="dense"
              size="small"
              fullWidth
              color="secondary"
              onClick={handleClick}
              disabled={loading}
            >
              Login
            </Button>
          </CardActions>
        </Card>

        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Don't have an account ?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign Up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
