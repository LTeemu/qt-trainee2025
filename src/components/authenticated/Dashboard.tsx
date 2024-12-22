import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchInput from "../general/SearchInput";
import { MdOutlineRefresh } from "react-icons/md";
import devices from "../../devices_dummy.json";
import DashboardTable from "./DashboardTable";
import Alert from "../general/Alert";
import { AlertState, AlertType } from "../../types";

type Props = {};

export default function Dashboard({}: Props) {
  const [reservedIds, setReservedIds] = useState<Number[]>([]);
  const [infoHidden, setInfoHidden] = useState<boolean>(false);

  const location = useLocation();
  const [alert, setAlert] = useState<AlertState>({
    type: "error",
    message: "",
    isVisible: false,
  });

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message, isVisible: true });
  };

  const hideAlert = () => {
    setAlert((prevState) => ({ ...prevState, isVisible: false }));
  };

  useEffect(() => {
    const message = location.state?.message;
    const type = location.state?.type || "error";
    if (message) {
      showAlert(type, message);
    }
  }, [location]);

  useEffect(() => {
    const storedIds = localStorage.getItem("reserved_ids");
    if (storedIds) {
      const ids = JSON.parse(storedIds);
      setReservedIds(ids);
    }
  }, []);

  return (
    <div className="grid h-min max-h-full w-full">
      <h1 className="text-4xl">Dashboard</h1>

      <p className="my-3">
        The dashboard shows all your current device reservations. To view
        connection instructions or manage your reservation, click on the device
        name or the desired row.
      </p>

      {alert.isVisible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={hideAlert}
          containerClassName="my-3"
        />
      )}

      <div className="flex justify-between">
        <p className="text-xl font-semibold">Reservations</p>

        <Link
          to="/devices"
          className="bg-cyan-800 text-white py-2 px-4 rounded-md"
        >
          Reserve a device
        </Link>
      </div>

      <div className="flex gap-x-2 my-2">
        <SearchInput />

        <button className="bg-white rounded-md border-gray-200 border-2 flex gap-x-2 items-center px-2">
          <MdOutlineRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col max-w-full overflow-x-auto">
        <DashboardTable
          devices={devices.filter((device) => reservedIds.includes(device.id))}
        />
      </div>

      {!infoHidden && (
        <Alert
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
          onClose={() => setInfoHidden(true)}
          containerClassName="mt-4"
        />
      )}
    </div>
  );
}
