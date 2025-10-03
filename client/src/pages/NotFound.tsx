import { Result, Button, Typography } from "antd"; // Import từ Ant Design
import { HomeOutlined } from "@ant-design/icons"; // Icon từ Ant Design
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng

const { Title, Text } = Typography;

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Result
        status="404"
        title={
          <Title level={2} style={{ marginBottom: 0 }}>
            404
          </Title>
        }
        subTitle={
          <Text style={{ fontSize: "1.2em" }}>
            Xin lỗi, trang bạn truy cập không tồn tại.
          </Text>
        }
        extra={
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            size="middle"
          >
            Về Trang Chủ
          </Button>
        }
      />
      <div style={{ marginTop: "20px", color: "#888" }}>
        <Text>&copy; - Rikkei Education</Text>
      </div>
    </div>
  );
};
