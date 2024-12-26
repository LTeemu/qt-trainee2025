import { Link } from "react-router-dom";
import { DashboardTableRef, Reservation } from "../../types";
import { forwardRef, useImperativeHandle, useState } from "react";
import EllipsisMenu from "./EllipsisMenu";
import {
  LuCircleX,
  LuNotebookPen,
  LuRefreshCw,
  LuRotateCw,
  LuChevronDown,
} from "react-icons/lu";

type Props = {
  reservations: Reservation[];
};

const DashboardTable = forwardRef<DashboardTableRef, Props>(
  ({ reservations }, ref) => {
    const [tableRefreshKey, setTableRefreshKey] = useState(0);

    useImperativeHandle(ref, () => ({
      refresh() {
        setTableRefreshKey((prevKey) => prevKey + 1);
      },
    }));

    const getRemainingTime = (
      reservationTime: string,
      durationInHours: number
    ) => {
      const reservationDate = new Date(reservationTime);
      const endTime = new Date(
        reservationDate.getTime() + durationInHours * 60 * 60 * 1000
      );
      const currentDate = new Date();
      const differenceInMs = endTime - currentDate;
      if (differenceInMs <= 0) {
        return "--:--";
      }
      const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (differenceInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      return `${formattedHours}:${formattedMinutes}`;
    };

    return (
      <table key={tableRefreshKey} className="bg-white">
        <thead>
          <tr className="[&>th]:px-4 last:[&>th]:px-1 border-b-2 border-b-cyan-900 [&>th]:text-nowrap [&>th]:font-semibold [&>th]:bg-cyan-800 [&>th]:text-white [&>th]:py-2 [&>th]:border-cyan-900 [&>th]:text-start [&>th]:border-x-2">
            <th>
              <span className="flex justify-between gap-x-2 items-center">
                Device Type <LuChevronDown size={16} />
              </span>
            </th>
            <th>
              <span className="flex justify-between gap-x-2 items-center">
                Qt Version <LuChevronDown size={16} />
              </span>
            </th>
            <th>Start time</th>
            <th>Duration</th>
            <th>Time remaining</th>
            <th className="">
              <span className="flex justify-between gap-x-2 items-center">
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
                      to={`/devices/reservation/edit/${res.device_id}`}
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
                    {res.reservation_duration + " Hours"}
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
                          className="flex items-center gap-x-2"
                        >
                          <LuRotateCw size={16} /> Refresh
                        </button>,
                        <button
                          id={`ellipsisButton${index}Reboot`}
                          onClick={() => null}
                          className="flex items-center gap-x-2"
                        >
                          <LuRefreshCw size={16} />
                          Reboot
                        </button>,
                        <button
                          id={`ellipsisButton${index}Release`}
                          onClick={() => null}
                          className="flex items-center gap-x-2"
                        >
                          <LuCircleX size={16} />
                          Release
                        </button>,
                        <Link
                          id={`ellipsisButton${index}Edit`}
                          to={`/devices/reservation/edit/${res.device_id}`}
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
