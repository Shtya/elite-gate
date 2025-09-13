

export type NavItem = {
    name: string;
    href?: string;
    children?: NavItem[];
};

export type Property = {
    id: string;
    imageLink: string;
    type: string;
    title: string;
    link: string;
    rooms?: string;
    beds?: string;
    area?: string;

};
