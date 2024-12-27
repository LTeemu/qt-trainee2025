import { useEffect, useState } from "react";
import Dropdown from "../general/Dropdown";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import RadioButtonGroup from "../general/RadioButtonGroup";
import devices from "../../devices_dummy.json";
import {
  AlertState,
  AlertType,
  Reservation,
  ReserveFormState,
} from "../../types";
import Alert from "../general/Alert";

const radioOptions = ["Select Qt version", "Upload your custom Qt version"];

type Props = {};

export default function ReservationEdit({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const reservation = (
    JSON.parse(localStorage.getItem("reservations") || "[]") as Reservation[]
  ).find((res) => res.reservation_id === id);
  const device = devices.find((d) => d.id === reservation?.device_id);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [versionDropOpen, setVersionDropOpen] = useState(false);
  const [durationDropOpen, setDurationDropOpen] = useState(false);

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
    if (!device) navigate("/devices");
  }, [device, navigate]);

  const [formState, setFormState] = useState<ReserveFormState>({
    qtversion: reservation?.device_version ?? (device?.versions[0] as string),
    duration: reservation?.reservation_duration ?? 1,
    reason: reservation?.reservation_reason ?? "",
  });

  const handleRadioChange = (index: number) => {
    setSelectedRadio(index);
    setDurationDropOpen(false);
    setVersionDropOpen(false);
  };

  const editReservation = (
    reservationID: string,
    formState: ReserveFormState
  ) => {
    const reservations = JSON.parse(
      localStorage.getItem("reservations") || "[]"
    ) as Reservation[];

    const reservationIndex = reservations.findIndex(
      (res) => res.reservation_id === reservationID
    );
    if (reservationIndex === -1) return;

    reservations[reservationIndex] = {
      ...reservations[reservationIndex],
      device_version: formState.qtversion,
      reservation_time: new Date().toISOString(),
      reservation_duration: formState.duration,
      reservation_reason: formState.reason,
    };

    localStorage.setItem("reservations", JSON.stringify(reservations));
  };

  const handleEdit = () => {
    if (!id) return;

    if (formState.duration === 0 || formState.qtversion === "") {
      showAlert("error", "Qt version and time duration are required!");
      return;
    }

    editReservation(id, formState);
    navigate("/dashboard", {
      state: {
        message: "Device reservation edited successfully!",
        type: "success",
      },
    });
  };

  if (!device || !reservation) return null;

  return (
    <div>
      <h1 className="text-4xl">Reservation Edit</h1>

      <span className="mt-2 font-semibold flex items-center gap-x-2">
        <Link to="/devices">Devices</Link>
        <FaChevronRight size={12} />
        <span className="text-cyan-800">Reservation edit</span>
      </span>

      <p className="font-semibold mt-3 mb-1 text-xl">
        Reserve Device: {reservation.device_type}
      </p>

      <p>
        Please select your device and Qt version. Once you confirm the
        reservation, the device will begin preparing the necessary installations
        and granting access.
      </p>

      {alert.isVisible && (
        <Alert type={alert.type} message={alert.message} onClose={hideAlert} />
      )}

      <Link
        to="#nowhere"
        className="flex mt-2 mb-4 items-center gap-x-1 text-cyan-800 font-semibold"
      >
        Explore more <FaChevronRight size={12} />
      </Link>

      <div className="grid bg-gray-100 border-2 p-4 md:px-8 rounded-md">
        <p className="font-semibold text-xl mb-2">Reservation</p>

        <RadioButtonGroup
          options={radioOptions}
          onChange={handleRadioChange}
          containerClassName="flex flex-col lg:flex-row [&>*]:w-1/2"
        />

        <div className="flex flex-col lg:flex-row gap-x-2 mt-2">
          <Dropdown
            baseID="customQtVersionDropdown"
            options={device.versions}
            defaultValue={reservation.device_version}
            isOpen={versionDropOpen}
            setOpenStateFunc={setVersionDropOpen}
            onOptionChange={(value) =>
              setFormState((prevState) => ({ ...prevState, qtversion: value }))
            }
            placeholder="Custom Qt version"
            containerClassName={`w-full lg:w-1/2 ${
              selectedRadio === 0
                ? ""
                : "opacity-50 contrast-50 pointer-events-none"
            }`}
          />

          <span
            className={`w-full px-4 mt-2 lg:mt-0 py-1 lg:w-1/2 h-full 
          overflow-clip flex items-center justify-between 
          bg-white border-2 rounded-md border-gray-300 ${
            selectedRadio === 1
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
          Select time duration{" "}
          {selectedRadio === 0 && <span className="text-red-700"> *</span>}
        </p>

        <Dropdown
          baseID="durationDropdown"
          options={Array.from(
            { length: 24 },
            (_, i) => `${i + 1} ${i === 0 ? "Hour" : "Hours"}`
          )}
          defaultValue={`${reservation.reservation_duration} ${
            reservation.reservation_duration === 1 ? "Hour" : "Hours"
          }`}
          isOpen={durationDropOpen}
          setOpenStateFunc={setDurationDropOpen}
          onOptionChange={(value) =>
            setFormState((prevState) => ({
              ...prevState,
              duration: parseInt(value),
            }))
          }
          placeholder="Duration"
          containerClassName="pr-1 w-full lg:w-1/2"
        />

        <p className="mt-2">Reason for reservation</p>

        <textarea
          id="reasonTextbox"
          defaultValue={formState.reason}
          onChange={(e) =>
            setFormState((prevState) => ({
              ...prevState,
              reason: e.target.value,
            }))
          }
          className="bg-white border-2 h-24 rounded-md min-h-24 max-h-[600px] py-1 px-2"
        />

        <p className="mt-1 text-xs opacity-60">
          Reservation will start right now if the device is available!
        </p>

        <button
          id="editReservationButton"
          //disabled={device?.available <= 0}
          className="bg-cyan-800 rounded-md text-nowrap px-4 mt-3 w-min text-white disabled:opacity-25 p-1"
          onClick={handleEdit}
        >
          Edit
        </button>

        {/* <p>{JSON.stringify(formState)}</p> */}
      </div>
    </div>
  );
}
