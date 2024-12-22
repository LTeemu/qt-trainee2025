import { IoMdClose } from "react-icons/io";
import { AlertProps } from "../../types";

export default function Alert({
  type,
  message,
  onClose,
  containerClassName,
  title,
}: AlertProps) {
  const alertStyles = {
    success: {
      bgColor: "bg-green-200",
      textColor: "text-green-800",
      defaultTitle: "Success!",
    },
    error: {
      bgColor: "bg-red-200",
      textColor: "text-red-800",
      defaultTitle: "Error!",
    },
    info: {
      bgColor: "bg-gray-200",
      textColor: "text-gray-800",
      defaultTitle: "Info",
    },
  };

  const { bgColor, textColor, defaultTitle } = alertStyles[type];

  return (
    <div
      className={`${bgColor} ${textColor} ${containerClassName} px-6 py-3 rounded-md mt-2`}
    >
      <div className="flex justify-between mb-3">
        <span className="font-semibold text-xl">{title || defaultTitle}</span>
        <button onClick={onClose}>
          <IoMdClose size={28} />
        </button>
      </div>
      <span>{message}</span>
    </div>
  );
}
