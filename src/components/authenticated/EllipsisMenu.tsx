import { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

type Props = {
  buttons: React.ReactNode[];
  disabled?: boolean;
  baseID?: string;
};

export default function EllipsisMenu(props: Props) {
  const { buttons, disabled, baseID } = props;
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (dropdownRef.current) {
      const computedStyle = window.getComputedStyle(dropdownRef.current);
      const padding =
        parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight);
      const border =
        parseFloat(computedStyle.borderLeftWidth) +
        parseFloat(computedStyle.borderRightWidth);

      setMaxWidth(dropdownRef.current.scrollWidth + padding + border);
    }
  }, [buttons]);

  return (
    <div className="relative">
      <button
        id={baseID}
        ref={buttonRef}
        onClick={toggleDropdown}
        disabled={disabled || false}
        className="block"
      >
        <IoEllipsisVertical size={22} color={isOpen ? "#00FF00" : "black"} />
      </button>

      <div
        ref={dropdownRef}
        className={`absolute border-2 shadow-[0px_3px_3px_0px_#00000055] right-full transition-all text-black overflow-hidden duration-200 bg-white rounded-md top-1/2 -translate-y-1/2 flex ${
          isOpen ? "opacity-1" : "opacity-0"
        }`}
        style={{
          maxWidth: isOpen ? `${maxWidth}px` : "0",
        }}
      >
        {buttons.map((button, index) => (
          <div
            key={index}
            className="px-2 shadow-md first:border-l-0 border-l-2 border-gray-200"
          >
            {button}
          </div>
        ))}
      </div>
    </div>
  );
}
