import AddAppointmentForm from "@/components/dashboard/appointments/AddAppointmentForm";
import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import Link from "next/link";
import { BiGroup } from "react-icons/bi";


export default function AddAppointmentPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['المواعيد', 'إضافة موعد جديد']}>
                <Link className="btn-primary" href="/dashboard/appointments">
                    <BiGroup /> عرض جميع المواعيد
                </Link>
            </DashboardHeaderTitle>

            <AddAppointmentForm />
        </div>
    );
}