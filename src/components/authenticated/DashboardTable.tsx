import { Link } from "react-router-dom";
import { AlertType, DashboardTableRef, Reservation } from "../../types";
import { forwardRef, useImperativeHandle, useState } from "react";
import EllipsisMenu from "./EllipsisMenu";
import {
  LuCircleX,
  LuNotebookPen,
  LuRefreshCw,
  LuRotateCw,
  LuChevronDown,
} from "react-icons/lu";
import devices from "../../devices_dummy.json";

type Props = {
  reservations: Reservation[];
  showAlert?: (type: AlertType, message: React.ReactNode) => void;
};

const DashboardTable = forwardRef<DashboardTableRef, Props>(
  ({ reservations, showAlert }, ref) => {
    const [tableRefreshKey, setTableRefreshKey] = useState(0);

    useImperativeHandle(ref, () => ({
      refresh() {
        setTableRefreshKey((prevKey) => prevKey + 1);
      },
    }));

    const releaseDeviceReservation = (reservation: Reservation) => {
      if (!reservation) return;
      const reservations: Reservation[] = JSON.parse(
        localStorage.getItem("reservations") ?? "[]"
      );
      if (!reservations.length) return;
      const updatedReservations = reservations.filter(
        (res) => res.reservation_id !== reservation.reservation_id
      );
      const device = devices.find(
        (device) => device.id === reservation.device_id
      );
      if (device) device.available += 1;
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    };

    const handleRelease = (reservation: Reservation) => {
      if (!reservation) return;
      releaseDeviceReservation(reservation);
      showAlert && showAlert("success", "Reservation successfully released");
    };

    const getRemainingTime = (
      reservationTime: string,
      durationInHours: number
    ): string => {
      const reservationDate = new Date(reservationTime);
      const endTime: Date = new Date(
        reservationDate.getTime() + durationInHours * 60 * 60 * 1000
      );
      const currentDate: Date = new Date();
      const differenceInMs: number = endTime.getTime() - currentDate.getTime();
      if (differenceInMs <= 0) {
        return "--:--";
      }
      const hours: number = Math.floor(differenceInMs / (1000 * 60 * 60));
      const minutes: number = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const formattedHours: string = String(hours).padStart(2, "0");
      const formattedMinutes: string = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}`;
    };

    return (
      <table key={tableRefreshKey} className="bg-white">
        <thead>
          <tr className="[&>th]:px-4 last:[&>th]:px-1 border-b-2 border-b-cyan-900 [&>th]:text-nowrap [&>th]:font-semibold [&>th]:bg-cyan-800 [&>th]:text-white [&>th]:py-2 [&>th]:border-cyan-900 [&>th]:text-start [&>th]:border-x-2">
            <th>
              <span className="cursor-not-allowed flex justify-between gap-x-2 items-center">
                Device Type <LuChevronDown size={16} />
              </span>
            </th>
            <th>
              <span className="cursor-not-allowed flex justify-between gap-x-2 items-center">
                Qt Version <LuChevronDown size={16} />
              </span>
            </th>
            <th>Start time</th>
            <th>Duration</th>
            <th>Time remaining</th>
            <th>
              <span className="cursor-not-allowed flex justify-between gap-x-2 items-center">
                Status <LuChevronDown size={16} />
              </span>
            </th>
            <th>
              <EllipsisMenu buttons={[]} disabled />
            </th>
          </tr>
        </thead>

        <tbody>
          {reservations?.length > 0 ? (
            reservations.map((res, index) => {
              const remainingTime = getRemainingTime(
                res.reservation_time,
                res.reservation_duration
              );
              const expired = remainingTime === "--:--";

              return (
                <tr
                  className="[&>td]:border-x-2 [&>td]:border-b [&>td]:text-nowrap [&>td]:border-neutral-100"
                  key={res.device_id}
                >
                  <td className="py-2 px-4">
                    <Link
                      to={`/devices/reservation/edit/${res.reservation_id}`}
                      className="text-cyan-900 font-semibold"
                    >
                      {res.device_type}
                    </Link>
                  </td>

                  <td className="py-2 px-4">
                    <span
                      id={`reservation${index}Version`}
                      className="bg-cyan-800 text-white px-1.5 py-0.5 rounded-sm mr-1"
                    >
                      {res.device_version}
                    </span>
                  </td>

                  <td className="py-2 px-4">
                    {new Date(res.reservation_time).toLocaleString()}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {`${res.reservation_duration} ${
                      res.reservation_duration === 1 ? "Hour" : "Hours"
                    }`}
                  </td>

                  <td className="py-2 px-4 border-b">{remainingTime}</td>

                  <td className="py-2 px-4 border-b">
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        expired
                          ? "bg-red-200 text-red-800"
                          : "text-green-800 bg-green-200"
                      }`}
                    >
                      {expired ? "Expired" : "Ready"}
                    </span>
                  </td>

                  <td className="py-2 px-1 border-b">
                    <EllipsisMenu
                      baseID={`ellipsisButton${index}`}
                      buttons={[
                        <button
                          id={`ellipsisButton${index}Refresh`}
                          onClick={() => null}
                          className="flex items-center gap-x-2 opacity-50 pointer-events-none"
                        >
                          <LuRotateCw size={16} /> Refresh
                        </button>,
                        <button
                          id={`ellipsisButton${index}Reboot`}
                          onClick={() => null}
                          className="flex items-center gap-x-2 opacity-50 pointer-events-none"
                        >
                          <LuRefreshCw size={16} />
                          Reboot
                        </button>,
                        <button
                          id={`ellipsisButton${index}Release`}
                          onClick={() => handleRelease(res)}
                          className="flex items-center gap-x-2"
                        >
                          <LuCircleX size={16} />
                          Release
                        </button>,
                        <Link
                          id={`ellipsisButton${index}Edit`}
                          to={`/devices/reservation/edit/${res.reservation_id}`}
                          className="flex items-center gap-x-2"
                        >
                          <LuNotebookPen size={16} />
                          Edit
                        </Link>,
                      ]}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-2">
              <td
                colSpan={5}
                className="py-12 text-center text-md text-black/50"
              >
                <p id="noReservationsText">No Reservations yet!</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
);

export default DashboardTable;
