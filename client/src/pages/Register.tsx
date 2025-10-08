import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/images/trello-logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { addUser, fetchData } from "../slices/registerSlice";
import { showToastError, showToastSuccess } from "../utils/toast";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const { users } = useSelector((state: RootState) => state.users);
  const dispath = useDispatch<AppDispath>();
  const navigate = useNavigate();

  useEffect(() => {
    dispath(fetchData());
  }, [dispath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !username || !password) {
      showToastError("Dữ liệu không được để trống");
      setLoading(false);
      return;
    }
    if (!emailRegex.test(email)) {
      showToastError("Email không đúng định dạng");
      setLoading(false);
      return;
    }
    if (!passRegex.test(password)) {
      showToastError("Password không đúng định dạng");
      setLoading(false);
      return;
    }

    const checkEmail = users.some((user) => user.email === email);
    if (checkEmail) {
      showToastError("Email không được phép trùng");
      return;
    } else {
      const dateNow = new Date().toISOString();
      try {
        await dispath(
          addUser({ username, email, password, created_at: dateNow })
        ).unwrap();
        showToastSuccess("Đăng ký thành công");
        setEmail("");
        setUsername("");
        setPassword("");

        navigate("/login");
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="img-logo" />
      <p>Please sign up</p>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          className="ip-email"
          label="Email address"
          type="email"
          margin="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="ip-username"
          label="Username"
          type="text"
          margin="none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className="ip-pass"
          label="Password"
          type="password"
          margin="none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-p">
          Already have an account, <Link to="/login">click here !</Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </Box>

      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
    </div>
  );
}
