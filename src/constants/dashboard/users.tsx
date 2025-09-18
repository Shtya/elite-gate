import { TableColumn, TableRow } from "@/types/components/Table";



export const columns: TableColumn[] = [
    {
        key: 'image',
        label: 'الصورة',
        cell: (val: any) => (
            <img
                src={val}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
            />
        ),
    },
    { key: 'name', label: 'الاسم' },
    { key: 'email', label: 'البريد الإلكتروني' },
    { key: 'phone', label: 'رقم الهاتف' },
    { key: 'role', label: 'الدور الوظيفي' },
    { key: 'joined', label: 'تاريخ الانضمام' },
    {
        key: 'status',
        label: 'الحالة',
        cell: (val: any) => {
            const statusStyles: Record<string, string> = {
                'نشط': 'bg-[#EBFBF2] text-[var(--secondary-500)]',
                'قيد المراجعة': 'bg-[#FFF9ED] text-[#9C742B]',
                'موقوف': 'bg-[#FFF0F0] text-[#BE6464]',
            };
            return (
                <span className={`${statusStyles[val]} px-3 py-1 rounded-full text-sm`}>
                    {val}
                </span>
            );
        },
    },
];
export const rows: TableRow[] = [
    {
        image: "/users/user-1.jpg",
        name: 'خالد العتيبي',
        email: 'khaled@example.com',
        phone: '+966 500 123 456',
        role: 'مدير التسويق',
        joined: '2023-01-15',
        status: 'نشط',
    },
    {
        image: "/users/user-2.webp",
        name: 'عبدالله الشهري',
        email: 'abdullah@example.com',
        phone: '+966 511 987 654',
        role: 'مساعد إداري',
        joined: '2022-09-03',
        status: 'قيد المراجعة',
    },
    {
        image: "/users/user-3.jpg",
        name: 'سامي القحطاني',
        email: 'sami.qahtani@realestatepro.com',
        phone: '+966 533 222 111',
        role: 'خبير عقاري أول',
        joined: '2021-06-27',
        status: 'موقوف',
    },
    {
        image: "/users/user-4.jpg",
        name: 'راكان الزهراني',
        email: 'rakan.zahrani@agency.com',
        phone: '+966 544 888 777',
        role: 'منسق مشاريع وتسويق رقمي',
        joined: '2024-02-10',
        status: 'نشط',
    },
];

