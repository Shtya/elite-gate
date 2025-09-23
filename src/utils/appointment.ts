import { PropertyType } from "@/types/property";


export const getDefaultProjectpath = (type?: PropertyType) => {
    switch (type) {
        case 'apartment':
            return '/main/projects/defaults/default-project-house.svg';
        case 'villa':
            return '/main/projects/defaults/default-project-Villa.svg';
        case 'office':
            return '/main/projects/defaults/default-project-Land.svg';
        default:
            return '/main/projects/defaults/default-project-house.svg';
    }
};
