

export type NavItem = {
    name: string;
    href?: string;
    children?: NavItem[];
};

export type Property = {
    imageLink: string;
    type: string;
    title: string;
    link: string;
    rooms?: string;
    beds?: string;
    area?: string;

};
