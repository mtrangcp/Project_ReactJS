import { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
} from "@mui/material";
import Toastify from "toastify-js";
import logo from "../assets/images/trello-logo.png";
import removeCircle from "../assets/icons/remove_circle.png";
import closeToast from "../assets/icons/close-toast.png";
import checkCircle from "../assets/icons/check_circle.png";

import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { fetchData } from "../slices/registerSlice";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const KEY_LOCAL = "tokenIdLogin";

  const { users } = useSelector((state: RootState) => state.users);
  const dispath = useDispatch<AppDispath>();
  const navigate = useNavigate();

  useEffect(() => {
    dispath(fetchData());
  }, [dispath]);

  useEffect(() => {
    const tokenIdLocal = localStorage.getItem(KEY_LOCAL);
    const shown = sessionStorage.getItem("toastShown");

    if (tokenIdLocal && !shown) {
      showToastSeccess("Bạn đã đăng nhập");
      setLoading(true);
      sessionStorage.setItem("toastShown", "true");
      navigate("/dashboard");
    }
  }, []);

  const showToastError = (msg: string) => {
    const htmlToastError = `
        <div class="toast-error">
          <div class="err-top">
            <div class="left">
              <img src=${removeCircle} alt="img" />
              <h4>Error</h4>
            </div>
  
            <img src=${closeToast} alt="" id="close-toast-error" />
          </div>
  
          <div class="err-bottom">
            ${msg}
          </div>
        </div>
    `;

    Toastify({
      text: htmlToastError,
      className: "custom-error-toast",
      duration: 2000,
      gravity: "top",
      position: "left",
      close: false,
      escapeMarkup: false,
      style: {
        background: "transparent",
        boxShadow: "none",
      },
    }).showToast();
  };

  const showToastSeccess = (msg: string) => {
    const htmlToastSeccess = `
        <div class="toast-success">
          <img src=${checkCircle} alt="img" />
          <p>${msg}</p>
        </div>
    `;

    Toastify({
      text: htmlToastSeccess,
      className: "custom-error-toast",
      duration: 2000,
      gravity: "top",
      position: "left",
      close: false,
      escapeMarkup: false,
      style: {
        background: "transparent",
        boxShadow: "none",
      },
    }).showToast();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToastError("Dữ liệu không được để trống");
      setLoading(false);
      return;
    }

    const checkUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (checkUser) {
      showToastSeccess("Đăng nhập thành công");
      setLoading(true);

      localStorage.setItem(KEY_LOCAL, checkUser.id);
      navigate("/dashboard");
    } else {
      showToastError(`Email hoặc mật khẩu không đúng
        Đăng nhập thất bại`);
    }
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
          Don't have an account, <Link to="/register">click here !</Link>
        </div>

        <Button type="submit" variant="contained" className="btn-primary">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </Box>

      <div className="form-p fter">&copy; 2025 - Rikkei Education</div>
    </div>
  );
}
