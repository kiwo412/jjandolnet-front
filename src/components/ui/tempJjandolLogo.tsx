import { useNavigate } from "react-router-dom";

export default function TempJjandolLogo() {
  const navigate = useNavigate();

  const handleIndex = () => {
    navigate("/");
  };

  return (
    <>
      <strong
        onClick={handleIndex}
        className="text-3xl font-bold text-orange-600 mb-3 tracking-tight cursor-pointer"
      >
        JJandol Net
      </strong>
    </>
  );
}
