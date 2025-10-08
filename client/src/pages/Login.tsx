import { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
} from "@mui/material";
import logo from "../assets/images/trello-logo.png";
import { showToastError } from "../utils/toast";
import { showToastSuccess } from "../utils/toast";
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
      showToastSuccess("Bạn đã đăng nhập");
      setLoading(true);
      sessionStorage.setItem("toastShown", "true");
      navigate("/dashboard");
    }
  }, []);

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
      showToastSuccess("Đăng nhập thành công");
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
