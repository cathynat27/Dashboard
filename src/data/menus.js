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

  { label: "Services" },
  // {
  //   label: "Renal Monitorings",
  //   path: "/monitoring",
  //   icon: faUser,
  // },

  {
    label: "Renal Functional Tests",
    path: "/renal",
    icon: faUsers,
  },
  // {
  //   label: "Renal Screenings",
  //   path: "/screening",
  //   icon: faWindows,
  // },
  {
    label: "Vaccinations",
    path: "/vaccination",
    icon: faUser,
  },
  {
    label: "Diagnoses",
    path: "/table",
    icon: faUser,
  },
  {
    label: "Antenatals",
    path: "/table",
    icon: faUser,
  },
  { label: "Reports" },

  {
    label: "CHP Activity",
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
