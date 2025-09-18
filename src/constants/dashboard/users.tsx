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
    { key: 'joinedAt', label: 'تاريخ الانضمام' },
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
    { image: "/users/user-1.jpg", name: 'احمد العتيبي', email: 'khaled@example.com', phone: '+966 500 123 456', role: 'مدير التسويق', joinedAt: '2023-01-15', status: 'نشط', },
    { image: "/users/user-2.webp", name: 'عبدالله الشهري', email: 'abdullah@example.com', phone: '+966 511 987 654', role: 'مساعد إداري', joinedAt: '2022-09-03', status: 'قيد المراجعة', },
    { image: "/users/user-3.jpg", name: 'سامي القحطاني', email: 'sami.qahtani@realestatepro.com', phone: '+966 533 222 111', role: 'خبير عقاري أول', joinedAt: '2021-06-27', status: 'موقوف', },
    { image: "/users/user-4.jpg", name: 'راكان الزهراني', email: 'rakan.zahrani@agency.com', phone: '+966 544 888 777', role: 'منسق مشاريع وتسويق رقمي', joinedAt: '2024-02-10', status: 'نشط', },
    { image: "/users/user-5.jpg", name: 'نورة السبيعي', email: 'noura.s@example.com', phone: '+966 512 345 678', role: 'محللة بيانات', joinedAt: '2023-07-21', status: 'نشط', },
    { image: "/users/user-6.jpg", name: 'فهد المطيري', email: 'fahad.mutairi@consultinghub.com', phone: '+966 533 876 543', role: 'مستشار تطوير أعمال', joinedAt: '2022-11-30', status: 'قيد المراجعة', },
    { image: "/users/user-7.jpg", name: 'هند القحطاني', email: 'hind.qahtani@agency.com', phone: '+966 544 321 987', role: 'مديرة مشاريع', joinedAt: '2021-04-18', status: 'موقوف', },
    { image: "/users/user-8.jpg", name: 'ماجد الحربي', email: 'majid.harbi@realestatepro.com', phone: '+966 500 654 321', role: 'خبير تسويق عقاري', joinedAt: '2023-12-05', status: 'نشط', },
    { image: "/users/user-9.jpg", name: 'سارة الزامل', email: 'sara.zamel@example.com', phone: '+966 511 789 456', role: 'منسقة علاقات عامة', joinedAt: '2022-05-14', status: 'قيد المراجعة', },
    { image: "/users/user-10.jpg", name: 'ليلى العتيبي', email: 'layla@example.com', phone: '+966 500 111 222', role: 'مديرة تسويق', joinedAt: '2023-03-12', status: 'نشط', },
    { image: "/users/user-11.jpg", name: 'خالد السالم', email: 'khaled.salem@example.com', phone: '+966 511 333 444', role: 'محلل بيانات', joinedAt: '2022-08-19', status: 'قيد المراجعة', },
    { image: "/users/user-10.jpg", name: 'ليلى العتيبي', email: 'layla.otaibi@example.com', phone: '+966 500 111 222', role: 'مديرة تسويق', joinedAt: '2023-03-12', status: 'نشط', },
    { image: "/users/user-11.jpg", name: 'خالد السالم', email: 'khaled.salem@example.com', phone: '+966 511 333 444', role: 'محلل بيانات', joinedAt: '2022-08-19', status: 'قيد المراجعة', },
    { image: "/users/user-12.jpg", name: 'مشاعل القحطاني', email: 'mashael.qahtani@agency.com', phone: '+966 533 444 555', role: 'منسقة محتوى رقمي', joinedAt: '2021-12-01', status: 'موقوف', },
    { image: "/users/user-13.jpg", name: 'تركي العبدالله', email: 'turki.abdullah@realestatepro.com', phone: '+966 544 666 777', role: 'خبير تطوير أعمال', joinedAt: '2023-06-15', status: 'نشط', },
    { image: "/users/user-14.jpg", name: 'ريم السبيعي', email: 'reem.s@example.com', phone: '+966 512 999 888', role: 'محللة نظم معلومات', joinedAt: '2022-03-27', status: 'قيد المراجعة', },
    { image: "/users/user-15.jpg", name: 'سعود الزهراني', email: 'saud.zahrani@consultinghub.com', phone: '+966 533 777 666', role: 'مستشار تسويق رقمي', joinedAt: '2021-09-10', status: 'موقوف', },
    { image: "/users/user-16.jpg", name: 'جواهر المطيري', email: 'jawaher.mutairi@agency.com', phone: '+966 544 123 456', role: 'مديرة علاقات عامة', joinedAt: '2023-11-05', status: 'نشط', },
    { image: "/users/user-17.jpg", name: 'بدر الحربي', email: 'bader.harbi@realestatepro.com', phone: '+966 500 654 987', role: 'خبير تسويق رقاري', joinedAt: '2022-07-22', status: 'قيد المراجعة', },


];

