import { AppointmentType } from "@/types/dashboard/appointment";

export const getDefaultProjectpath = (type?: AppointmentType) => {
    switch (type) {
        case 'شقة':
            return '/main/projects/defaults/default-project-house.svg';
        case 'فيلا':
            return '/main/projects/defaults/default-project-Villa.svg';
        case 'أرض':
            return '/main/projects/defaults/default-project-Land.svg';
        default:
            return '/main/projects/defaults/default-project-house.svg';
    }
};
