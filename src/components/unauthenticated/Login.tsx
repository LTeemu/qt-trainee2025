import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../general/Alert";
import { AlertState, AlertType } from "../../types";

type Props = {};

export default function Login({}: Props) {
  const [username, setUsername] = useState("dummyuser");
  const [password, setPassword] = useState("dummypass");
  const [alert, setAlert] = useState<AlertState>({
    type: "error",
    message: "",
    isVisible: false,
  });

  const [localStorageData, setLocalStorageData] = useState(
    JSON.stringify(localStorage, null, 2)
  );

  const clearLocalStorage = () => {
    localStorage.clear();
    setLocalStorageData(JSON.stringify(localStorage, null, 2));
  };

  const showAlert = (type: AlertType, message: React.ReactNode) => {
    setAlert({ type, message, isVisible: true });
  };

  const hideAlert = () => {
    setAlert((prevState) => ({ ...prevState, isVisible: false }));
  };

  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    hideAlert();
    if (username === "dummyuser" && password === "dummypass") {
      localStorage.setItem("logged_user", username);
      navigate("/dashboard");
    } else {
      localStorage.removeItem("logged_user");
      showAlert(
        "error",
        <p>
          Invalid credentials, try{" "}
          <span className="text-green-600">dummyuser</span> &{" "}
          <span className="text-green-600">dummypass</span>
        </p>
      );
    }
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden w-full p-4 flex flex-col relative items-center justify-center">
      <div className="w-2/3 h-1/3">
        {alert.isVisible && (
          <Alert
            id="loginAlert"
            type={alert.type}
            message={alert.message}
            onClose={hideAlert}
            containerClassName="mb-4"
          />
        )}

        <form onSubmit={handleLogin} className="grid gap-y-2">
          <input
            id="usernameInput"
            type="text"
            placeholder="Username (dummyuser)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 rounded-sm py-1 px-2"
          />

          <input
            id="passwordInput"
            type="password"
            placeholder="Password (dummypass)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 rounded-sm py-1 px-2"
          />

          <button
            id="loginButton"
            type="submit"
            className="border-2 mt-2 bg-slate-600 text-white font-semibold p-1.5"
          >
            Login
          </button>
        </form>

        <p className="mt-4 mb-1">Local Storage</p>
        <p className="border-2 py-1 px-2 h-2/3 overflow-auto">
          {localStorageData}
        </p>

        <button
          id="clearStorageButton"
          onClick={clearLocalStorage}
          className="border-2 w-min mt-2 bg-orange-700 text-white font-semibold p-1.5"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
