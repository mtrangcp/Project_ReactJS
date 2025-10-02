import { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
} from "@mui/material";
import Toastify from "toastify-js";
import logo from "../assets/images/trello-logo.png";
import "../css/login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      Toastify({
        text: "Vui lòng nhập đầy đủ Email và Password",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#dc3545",
      }).showToast();
      setLoading(false);
      return;
    }

    setTimeout(() => {
      Toastify({
        text: "Đăng nhập thành công!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#28a745",
      }).showToast();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="img-logo" />
      <p>Please sign in</p>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          className="ip-email"
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="ip-pass"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControlLabel
          className="div-chb"
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label="Remember me"
        />

        <div className="form-p">
          Don't have an account, <a href="/register">click here !</a>
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Box>

      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
    </div>
  );
}
