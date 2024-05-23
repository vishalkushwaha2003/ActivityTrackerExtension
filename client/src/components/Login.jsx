import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    
    <div className="text-[#9b9b9a]">
      <div>Login</div>

      <div className="mx-4 mt-8">
        <form>
          <TextField
            className=" bg-[rgba(47,47,47,255)]"
            id="outlined-basic"
            fullWidth
            label="Email"
            variant="outlined"
          />
          <TextField
            className=" bg-[rgba(47,47,47,255)]"
            sx={{ input: { color: "#9b9b9a" } }}
            id="outlined-basic"
            fullWidth
            label="Password"
            variant="outlined"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
