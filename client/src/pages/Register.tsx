import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Toastify from "toastify-js";
import logo from "../assets/images/trello-logo.png";
import "../css/Register.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          className="ip-username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className="ip-pass"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="form-p">
          Already have an account, <a href="/register">click here !</a>
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
