import { useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="forbidden">
      <h1>403</h1>
      <h2>Uh oh, Có vẻ như bạn đã lạc vào vùng đất cấm</h2>
      <button onClick={() => navigate("/")} className="btn mt-3">
        Quay lại ngay
      </button>
    </div>
  );
}
