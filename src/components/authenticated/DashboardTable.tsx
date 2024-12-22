import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const DashboardTable = ({ devices }) => {
  const [reservedIds, setReservedIds] = useState<Number[]>([]);

  useEffect(() => {
    const storedIds = localStorage.getItem("reserved_ids");
    if (storedIds) {
      const ids = JSON.parse(storedIds);
      setReservedIds(ids);
    }
  }, []);

  return (
    <table className="bg-white">
      <thead>
        <tr className="[&>th]:px-4 [&>th]:text-nowrap [&>th]:font-semibold [&>th]:bg-cyan-800 [&>th]:text-white [&>th]:py-2 [&>th]:border-cyan-900 [&>th]:text-start [&>th]:border-x-2">
          <th>Device Type</th>
          <th className="w-full">Qt Version</th>
          <th>Start time</th>
          <th>Duration</th>
          <th>Time remaining</th>
          <th>Status</th>
          <th>
            <FaEllipsisV size={16} />
          </th>
        </tr>
      </thead>

      <tbody>
        {devices?.length > 0 ? (
          devices.map((device) => {
            //const isReserved = reservedIds.includes(device.id);

            return (
              <tr
                className="[&>td]:border-x-2 [&>td]:border-b [&>td]:text-nowrap [&>td]:border-neutral-100"
                key={device.id}
              >
                <td className="py-2 px-4">
                  <Link
                    to={`/devices/reservation/edit/${device.id}`}
                    className="text-cyan-900 font-semibold"
                  >
                    {device.type}
                  </Link>
                </td>

                <td className="py-2 px-4">
                  {device.versions.map((version) => (
                    <span
                      key={version}
                      className="bg-cyan-800 text-white px-1.5 py-0.5 rounded-sm mr-1"
                    >
                      {version}
                    </span>
                  ))}
                </td>

                <td className="py-2 px-4">{Date.now().toLocaleString()}</td>

                <td className="py-2 px-4 border-b">2 hours</td>

                <td className="py-2 px-4 border-b">01:25</td>

                <td className="py-2 px-4 border-b">
                  <span
                    className={`rounded-full flex px-2 py-0.5
                    ${
                      device.available === 0
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    Ready
                  </span>
                </td>

                <td className="py-2 px-4 border-b">
                  <FaEllipsisV size={16} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="border-2">
            <td colSpan={5} className="py-12 text-center text-md text-black/50">
              <p>No Reservations yet!</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DashboardTable;
