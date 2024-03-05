import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faCog,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FiSettings } from "react-icons/fi";

const initMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },

  { label: "Reports" },

  {
    label: "Community Health Provider",
    path: "/table",
    icon: faUser,
  },

  {
    label: "Patients",
    path: "/table",
    icon: faUsers,
  },
  {
    label: "Reports",
    path: "/form",
    icon: faWindows,
  },

  {
    label: "Register",
  },
  {
    label: "Login",
    path: "/auth/login",
    icon: faLock,
  },
  {
    label: "Register",
    path: "/auth/register",
    icon: faNoteSticky,
  },
  {
    label: "Settings",
    path: "/form",
    icon: faCog,
  },
];

export default initMenu;
