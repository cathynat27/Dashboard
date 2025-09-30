import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faCog,
  faUsers,
  faUser,
  faHeartbeat,
  faUserMd,
  faVial,
  faClipboardList,
  faSyringe,
  faBaby,
  faStethoscope,
  faHospital,
} from "@fortawesome/free-solid-svg-icons";
import { FiSettings } from "react-icons/fi";

const initMenu = [
  {
    label: "Dashboard",
    path: "/",
    icon: faTachometer,
  },

  { label: "Records" },

  {
    label: "NASF CHPs",
    path: "/nafschpactivity",
    icon: faUserMd,
  },

  {
    label: "Overall CHP Activity",
    path: "/chpactivity",
    icon: faUserMd,
  },

  {
    label: "SIMPRINTS 2025",
    path: "/simprints",
    icon: faUsers,
  },

  {
    label: "MITYANA PROJECT",
    path: "/mityana",
    icon: faHospital,
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
    icon: faVial,
  },
  {
    label: "Renal Screenings",
    path: "/screening",
    icon: faClipboardList,
  },
  {
    label: "Renal Monitoring",
    path: "/monitoring",
    icon: faHeartbeat,
  },
  {
    label: "Vaccinations",
    path: "/vaccination",
    icon: faSyringe,
  },
  {
    label: "Diagnoses",
    path: "/diagnosis",
    icon: faStethoscope,
  },
  {
    label: "Antenatals",
    path: "/antenantal",
    icon: faBaby,
  },
 

  {
    label: "All Patients",
    path: "/table",
    icon: faUsers,
  },
  // {
  //   label: "Reports",
  //   path: "/form",
  //   icon: faWindows,
  // },
  // {
  //   label: "Register",
  // },
  // {
  //   label: "Login",
  //   path: "/auth/login",
  //   icon: faLock,
  // },
  // {
  //   label: "Register",
  //   path: "/auth/register",
  //   icon: faNoteSticky,
  // },
  // {
  //   label: "Settings",
  //   path: "/form",
  //   icon: faCog,
  // },
];

export default initMenu;
