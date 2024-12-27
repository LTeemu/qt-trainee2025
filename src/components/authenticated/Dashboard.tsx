import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "../general/SearchInput";
import { MdOutlineRefresh } from "react-icons/md";
import DashboardTable from "./DashboardTable";
import Alert from "../general/Alert";
import {
  AlertState,
  AlertType,
  DashboardTableRef,
  Reservation,
} from "../../types";

type Props = {};

export default function Dashboard({}: Props) {
  const location = useLocation();
  const reservations: Reservation[] = JSON.parse(
    localStorage.getItem("reservations") ?? "[]"
  );
  const [searchWord, setSearchWord] = useState("");
  const [alert, setAlert] = useState<AlertState>({
    type: "error",
    message: "",
    isVisible: false,
  });
  const tableRef = useRef<DashboardTableRef>(null);
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState<boolean>(false);
  const [gettingStartedVisible, setGettingStartedVisible] =
    useState<boolean>(isFirstTimeLogin);

  const handleRefresh = () => {
    if (tableRef.current) {
      tableRef.current.refresh();
    }
  };

  const showAlert = (type: AlertType, message: React.ReactNode) => {
    setAlert({ type, message, isVisible: true });
  };

  const hideAlert = () => {
    setAlert((prevState) => ({ ...prevState, isVisible: false }));
  };

  useEffect(() => {
    const firstTime = localStorage.getItem("first-time-login");

    if (!firstTime) {
      setIsFirstTimeLogin(true);
      setGettingStartedVisible(true);
      localStorage.setItem("first-time-login", "false");
    }
  }, []);

  useEffect(() => {
    const message = location.state?.message;
    const type = location.state?.type || "error";
    if (message) {
      showAlert(type, message);
    }
  }, [location]);

  return (
    <div className="grid h-min max-h-full w-full">
      <h1 id="dashboardHeading" className="text-4xl">
        {isFirstTimeLogin ? "Welcome" : "Dashboard"}
      </h1>

      <p className="my-3">
        {isFirstTimeLogin
          ? "Welcome to the Qt Hardware Cloud App! Here's a quick guide to help you get started: Explore available devices, reserve them for your projects, and manage your reservations easily, follow the instructions to get connected and start working."
          : "The dashboard shows all your current device reservations. To view connection instructions or manage your reservation, click on the device name or the desired row."}
      </p>

      {alert.isVisible && (
        <Alert
          id="dashboardTopAlert"
          type={alert.type}
          message={alert.message}
          onClose={hideAlert}
          containerClassName="my-3"
        />
      )}

      <div className="flex justify-between">
        <p className="text-xl font-semibold">Reservations</p>

        <Link
          id="reserveDeviceLink"
          to="/devices"
          className="bg-cyan-800 text-white py-2 px-4 rounded-md"
        >
          Reserve a device
        </Link>
      </div>

      <div className="flex gap-x-2 my-2">
        <SearchInput onChange={(e) => setSearchWord(e.target.value)} />

        <button
          id="refreshButton"
          onClick={handleRefresh}
          className="bg-white rounded-md border-gray-200 border-2 flex gap-x-2 items-center px-2"
        >
          <MdOutlineRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col max-w-full overflow-x-auto">
        <DashboardTable
          ref={tableRef}
          reservations={reservations.filter((res) =>
            res.device_type.toLowerCase().includes(searchWord)
          )}
          showAlert={showAlert}
        />
      </div>

      {gettingStartedVisible && (
        <Alert
          id="gettingStartedAlert"
          type="info"
          title="Getting started"
          message={
            <p className="gap-y-3 grid">
              <span>
                To get started with reserving a device, simply navigate to the
                "Devices" section from the left-hand menu. Here, you'll see a
                list of available devices sorted by type. Select the device type
                you're interested in, and then click on the specific device you
                want to reserve. If the device is available, click the "Reserve
                device" button. Once reserved, you'll be provided with
                connection details and options to manage your reservation.
              </span>

              <Link to="/devices" className="text-cyan-800 font-semibold">
                Go to devices and create reservation
              </Link>
            </p>
          }
          onClose={() => setGettingStartedVisible(false)}
          containerClassName="mt-4"
        />
      )}
    </div>
  );
}
