import {Chip} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import {SidebarItemType} from "./sidebarf";
import TeamAvatar from "./team-avatar";


export const items = [
    {
        key: "home",
        href: "/dashboard",
        icon: "solar:home-2-linear",
        title: "Home",
    },
    {
        key: "resources",
        href: "/dashboard/resources",
        icon: "solar:book-minimalistic-linear",
        title: "Resources",
    },
    {
        key: "containers",
        href: "/dashboard/containers",
        icon: "solar:box-minimalistic-linear",
        title: "Containers",
    },
    {
        key: "settings",
        href: "/dashboard/settings",
        icon: "solar:settings-outline",
        title: "Settings",
    },
];