import { useNavigate } from "react-router-dom";
import './NewLayout.css'; // Nhập file CSS

function NewLayout() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="who">
        <div className="who2">
        <h1>Welcome to Finder Job Web</h1>
        <p>Choose your mission</p>

        {/* Nút chuyển đến Candidate Layout */}
        <div className="button-container">
          <button onClick={() => navigate("/home")}>Employee</button>

          {/* Nút chuyển đến Employer Layout */}
          <button onClick={() => navigate("/employer")}>Employer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLayout;
