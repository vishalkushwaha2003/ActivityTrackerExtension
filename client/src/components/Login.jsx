import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import axios from "axios";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // const submitHandler = async () => {
  //   const email = emailRef.current.value;
  //   const password = passwordRef.current.value;

  //   const data = {
  //     email,
  //     password,
  //   };
  // };

  return (
    <div className="text-[#cdcdcb]">
      <div className="flex justify-center text-xl mt-4">
        <h1>Login</h1>
      </div>

      <div className="mx-4 mt-6 ">
        <form className="flex flex-col items-center">
          <TextField
            className="rounded-md"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={emailRef}
            InputLabelProps={{
              style: { color: "#9b9b9a", fontSize: "0.8rem" },
            }}
            InputProps={{
              style: {
                color: "#9b9b9a",
                fontSize: "0.8rem",
                padding: "-6px",
              },
            }}
            sx={{
              width: "90%", // Decreased width
              backgroundColor: "rgba(25, 25, 25, 255)",
              borderRadius: "4px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9b9b9a",
                },
                "&:hover fieldset": {
                  borderColor: "#9b9b9a",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9b9b9a",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9b9b9a",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9b9b9a",
              },
            }}
          />
          <TextField
            className="rounded-md"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            inputRef={passwordRef}
            InputLabelProps={{
              style: { color: "#9b9b9a", fontSize: "0.8rem" },
            }}
            InputProps={{
              style: { color: "#9b9b9a", fontSize: "0.8rem", padding: "-6px" },
            }}
            sx={{
              width: "90%", // Decreased width
              backgroundColor: "rgba(25, 25, 25, 255)",
              borderRadius: "4px",
              marginTop: "20px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#9b9b9a",
                },
                "&:hover fieldset": {
                  borderColor: "#9b9b9a",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9b9b9a",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9b9b9a",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#9b9b9a",
              },
            }}
          />
          <Button
            // onClick={submitHandler}
            variant="outlined"
            sx={{
              marginTop: "20px",
              width: "90%",
              backgroundColor: "rgba(25, 25, 25, 255)",
              color: "#9b9b9a",
              borderColor: "#9b9b9a",
              "&:hover": {
                backgroundColor: "rgba(22, 22, 22, 255)", // Slightly lighter shade for hover effect
                borderColor: "#9b9b9a",
              },
            }}
          >
            Submit
          </Button>
        </form>

        <div className="mt-4 text-center hover:cursor-pointer">
          <h2>New User? Sign Up</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
