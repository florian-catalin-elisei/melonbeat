import {
  ChartBarSquareIcon,
  GlobeAsiaAustraliaIcon,
  HomeIcon,
  UserGroupIcon,
  ArrowUpOnSquareIcon,
  MusicalNoteIcon,
  PlusCircleIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";

export const links = [
  {
    icon: HomeIcon,
    name: "Discover",
    to: "/",
  },
  {
    icon: GlobeAsiaAustraliaIcon,
    name: "Around You",
    to: "/aroundyou",
  },
  {
    icon: UserGroupIcon,
    name: "Top Artists",
    to: "/topartists",
  },
  {
    icon: ChartBarSquareIcon,
    name: "Top Charts",
    to: "/topcharts",
  },
  {
    icon: ArrowUpOnSquareIcon,
    name: "Upload Songs",
    to: "/uploadsongs",
  },
  {
    icon: MusicalNoteIcon,
    name: "My Music",
    to: "/mymusic",
  },
  {
    icon: PlusCircleIcon,
    name: "Create Playlist",
    to: "/createplaylist",
  },
  {
    icon: Square2StackIcon,
    name: "My Playlists",
    to: "/myplaylists",
  },
];
