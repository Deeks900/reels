import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "./Signup.css";
import reelLogo from "../Asset/image1.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "../Firebase";

export default function Signup() {
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      height: "7vh",
      marginTop: "2%",
    },
  });

  console.log("Hi! there from signUp");
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleClick = async () => {
    //Checking if user has uploaded his profile Pic
    if (file == null) {
      setError("Please upload your profile picture");
      //Removing the alert after 3 sec
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      setError("");
      setLoading(true);
      let userObj = await signup(email, password);
      let uid = userObj.user.uid;
      //Creating a ref pointer to make the storage Bucket
      const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
      uploadTask.on("state changed", fn1, fn2, fn3);
      function fn1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} done`);
      }
      function fn2(error) {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 3000);
        setLoading(false);
        return;
      }
      function fn3() {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullname: name,
            profileUrl: url,
            createdAt: database.getTimeStamp(),
          });
        });
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  return (
    <div className="signUpWrapper">
      <div className="signUpCard">
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              fullWidth
              margin="dense"
              color="secondary"
              startIcon={<PhotoCamera />}
              component="label"
            >
              Upload your profile image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </Button>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              margin="dense"
              size="small"
              fullWidth
              color="secondary"
              disabled={loading}
              onClick={handleClick}
            >
              Sign Up
            </Button>
          </CardActions>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              By signing up you agree to our Terms and Conditions and Cookies
              Policy.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Having an account ?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
