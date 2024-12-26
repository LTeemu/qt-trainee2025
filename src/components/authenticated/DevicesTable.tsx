import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { LuChevronDown } from "react-icons/lu";
import { Device } from "../../types";

type Props = {
  devices: Device[];
};

const DevicesTable = ({ devices }: Props) => {
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
        <tr className="[&>th]:px-4 border-b-2 border-b-cyan-900 [&>th]:text-nowrap [&>th]:font-semibold [&>th]:bg-cyan-800 [&>th]:text-white [&>th]:py-2 [&>th]:border-cyan-900 [&>th]:text-start [&>th]:border-x-2">
          <th>Device Type</th>
          <th className="w-full">
            <span className="flex justify-between gap-x-2 items-center">
              Qt Version <LuChevronDown size={16} />
            </span>
          </th>

          <th>
            <span className="flex justify-between gap-x-2 items-center">
              Availability <LuChevronDown size={16} />
            </span>
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {devices?.length > 0 ? (
          devices.map((device, index) => {
            const cantReserve =
              reservedIds.includes(device.id) || device.available <= 0;

            return (
              <tr
                className="[&>td]:border-x-2 [&>td]:border-b [&>td]:text-nowrap [&>td]:border-neutral-100"
                key={device.id}
              >
                <td className="py-2 px-4">
                  <Link
                    id={`reserveDevice${device.id}`}
                    to={`/devices/reservation/create/${device.id}`}
                    className={`text-cyan-900 font-semibold ${
                      cantReserve ? "pointer-events-none opacity-50" : ""
                    }`}
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
                <td className="py-2 px-4">
                  <span
                    id={`device${index}AvailabilityText`}
                    className={`rounded-full px-2 py-0.5
                    ${
                      device.available === 0
                        ? "bg-red-200 text-red-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {device.available} / {device.count} Available
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/devices/reservation/create/${device.id}`}
                    className={`flex items-center gap-x-2 text-cyan-900 font-semibold ${
                      cantReserve ? "pointer-events-none opacity-50" : ""
                    }`}
                  >
                    {reservedIds.includes(device.id) ? (
                      <span>Reserved</span>
                    ) : (
                      <div className="flex gap-x-2 items-center">
                        <span>Reserve</span>
                        <FaChevronRight size={16} />
                      </div>
                    )}
                  </Link>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="border-2">
            <td colSpan={5} className="py-12 text-center text-md text-black/50">
              <p>No Devices yet!</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DevicesTable;
