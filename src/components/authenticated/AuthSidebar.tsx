import { PiStackBold, PiQuestionBold } from "react-icons/pi";
import { BiGridAlt, BiNotepad } from "react-icons/bi";
import { RiSettings3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function AuthSidebar({}: Props) {
  const path = useLocation().pathname;

  const handleLogout = () => {
    localStorage.removeItem("logged_user");
    window.location.href = "/login";
  };

  return (
    <nav className="min-w-56 sm:h-auto p-5 border-2 flex flex-col justify-between mr-0 sm:mr-12 border-gray-200 bg-gray-100 rounded-md">
      <ul className="[&>li]:gap-x-4 [&>span]:gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:font-semibold grid gap-y-3">
        <li className={path === "/dashboard" ? "text-cyan-900" : ""}>
          <BiGridAlt size={24} />
          <Link id="dashboardLink" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className={path.startsWith("/devices") ? "text-cyan-900" : ""}>
          <PiStackBold size={24} />
          <Link id="devicesLink" to="/devices">
            Devices
          </Link>
        </li>

        <span
          className={`flex ${
            path.startsWith("/devices/reservation/create")
              ? "text-cyan-900"
              : "hidden"
          }`}
        >
          <PiStackBold size={24} className="invisible" />
          Reserve a device
        </span>

        <span
          className={`flex ${
            path.startsWith("/devices/reservation/edit")
              ? "text-cyan-900"
              : "hidden"
          }`}
        >
          <PiStackBold size={24} className="invisible" />
          Edit reservation
        </span>

        <li className={path === "/usagelogs" ? "text-cyan-900" : ""}>
          <BiNotepad size={24} />
          <Link id="usagelogsLink" to="/usagelogs">
            Usage logs
          </Link>
        </li>

        <li className={path === "/settings" ? "text-cyan-900" : ""}>
          <RiSettings3Line size={24} />
          <Link id="settingsLink" to="/settings">
            Settings
          </Link>
        </li>
      </ul>

      <ul className="gap-y-3 grid mt-8 sm:mt-0">
        <li className="gap-x-4 flex items-center font-semibold">
          <PiQuestionBold size={24} />
          <Link to="#">Support Center</Link>
        </li>

        <li>
          <button
            id="logoutButton"
            className="h-min gap-x-4 flex items-center font-semibold"
            onClick={handleLogout}
          >
            <RiLogoutBoxRLine size={24} />
            <span>Log out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
