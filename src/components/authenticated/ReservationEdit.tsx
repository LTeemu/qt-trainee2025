import { useEffect, useState } from "react";
import Dropdown from "../general/Dropdown";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import RadioButtonGroup from "../general/RadioButtonGroup";
import devices from "../../devices_dummy.json";

const radioOptions = ["Select Qt version", "Upload your custom Qt version"];

type Props = {};

export default function ReservationEdit({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const device = devices.find((device) => device.id === parseInt(id));
  const [selectedRadio, setSelectedRadio] = useState(radioOptions[0]);
  const [versionDropOpen, setVersionDropOpen] = useState(false);
  const [durationDropOpen, setDurationDropOpen] = useState(false);

  useEffect(() => {
    if (!device) navigate("/devices");
  }, [device, navigate]);

  const handleRadioChange = (option: string) => {
    setSelectedRadio(option);
    setDurationDropOpen(false);
    setVersionDropOpen(false);
  };

  const handleEdit = () => {
    if (!device) return;
    // Dummy reservation logic
    if (device.available > 0) {
      device.available -= 1;
      let reservedIds = JSON.parse(localStorage.getItem("reserved_ids")) || [];
      reservedIds.push(device.id);
      localStorage.setItem("reserved_ids", JSON.stringify(reservedIds));
      alert("Device reserved successfully!");
      navigate("/devices");
    } else {
      alert("No devices available for reservation.");
    }
  };

  if (!device) return null;

  return (
    <div>
      <h1 className="text-4xl">Reservation Edit</h1>

      <span className="mt-2 font-semibold flex items-center gap-x-2">
        <Link to="/devices">Devices</Link>
        <FaChevronRight size={12} />
        <span className="text-cyan-800">Reservation edit</span>
      </span>

      <p className="font-semibold mt-3 mb-1 text-xl">
        Reserve Device: {device.type}
      </p>

      <p>
        Please select your device and Qt version. Once you confirm the
        reservation, the device will begin preparing the necessary installations
        and granting access.
      </p>

      <Link
        to="#nowhere"
        className="flex my-2 items-center gap-x-1 text-cyan-800 font-semibold"
      >
        Explore more <FaChevronRight size={12} />
      </Link>

      <div className="grid bg-gray-200 p-4 rounded-md">
        <p className="font-semibold text-lg mb-1">Reservation</p>

        <RadioButtonGroup
          options={radioOptions}
          onChange={handleRadioChange}
          containerClassName="flex flex-col lg:flex-row [&>*]:w-1/2"
        />

        <div className="flex flex-col lg:flex-row gap-x-2 mt-2">
          <Dropdown
            options={device.versions}
            isOpen={versionDropOpen}
            setStateFunc={setVersionDropOpen}
            placeholder="Custom Qt version"
            containerClassName={`w-full lg:w-1/2 ${
              selectedRadio === radioOptions[0]
                ? ""
                : "opacity-50 contrast-50 pointer-events-none"
            }`}
          />

          <span
            className={`w-full px-4 mt-2 lg:mt-0 py-1 lg:w-1/2 h-full 
          overflow-clip flex items-center justify-between 
          bg-white border-2 rounded-md border-gray-300 ${
            selectedRadio === radioOptions[1]
              ? ""
              : "opacity-50 contrast-50 pointer-events-none"
          }`}
          >
            <span className="whitespace-pre-wrap text-nowrap">
              Drag & drop file or{" "}
              <span className="text-cyan-800 font-semibold underline cursor-not-allowed">
                browse
              </span>
            </span>

            <IoCloudUploadOutline
              size={20}
              className="ml-2 min-w-[20px] aspect-square"
            />
          </span>
        </div>

        <p className="mt-2 mb-1">
          Select time duration <span className="text-red-700">*</span>
        </p>

        <Dropdown
          options={Array.from({ length: 24 }, (_, i) => `${i + 1} Hour`)}
          isOpen={durationDropOpen}
          setStateFunc={setDurationDropOpen}
          placeholder="Duration"
          containerClassName="pr-1 w-full lg:w-1/2"
        />

        <p className="mt-2">Reason for reservation</p>

        <textarea className="bg-white border-2 h-24 rounded-md min-h-24 max-h-[600px] py-1 px-2"></textarea>

        <p className="mt-1 text-xs opacity-60">
          Reservation will start right now if the device is available!
        </p>

        <button
          disabled={device?.available <= 0}
          className="bg-cyan-800 rounded-md text-nowrap px-4 mt-3 w-min text-white disabled:opacity-25 p-1"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
