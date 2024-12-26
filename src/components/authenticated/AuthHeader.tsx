import QTLogo from "../general/QTLogo";
import { BiSolidUser } from "react-icons/bi";
import colors from "tailwindcss/colors";

type Props = {};

export default function Header({}: Props) {
  const loggedUser = localStorage.getItem("logged_user");

  return (
    <header className="sm:flex-row flex-col justify-between py-3 px-4 flex shadow-[0px_3px_3px_0px_#1a202c22]">
      <QTLogo />

      {loggedUser && (
        <span
          id="usernameDisplay"
          className="flex items-center gap-x-2 font-bold"
        >
          <BiSolidUser
            size={28}
            style={{
              backgroundColor: colors.gray[300],
              padding: 4,
              borderRadius: 14,
            }}
          />
          {loggedUser}
        </span>
      )}
    </header>
  );
}
