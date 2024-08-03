export interface SubNavLink {
    subHref: string;
    subKey: string;
    subLabel: string;
}

export interface NavLink {
    href: string;
    key: string;
    label: string;
    subNav?: SubNavLink[]
}

export interface IconLink {
    href: string;
    icon: string;
}

export interface FooterAboutProps {
    title: string;
    description: string;
    social: string;
}

export interface DeveloperTeamProps {
    title: string;
    email: string;
}

export interface PateraStoreProps {
    title: string;
    address: string;
    contact: string;
}
