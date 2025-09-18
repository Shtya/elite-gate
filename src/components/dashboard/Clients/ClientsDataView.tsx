'use client';
import DataView from '@/components/shared/DateViewTable/DataView';
import { FaCheck, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import useClients from '@/hooks/dashboard/client/useClients';
import { columns, filters, sortConfig } from '@/constants/dashboard/client/contants';
import { ClientRow } from '@/types/dashboard/client';



export default function ClientsDataView() {
    const getRows = useClients();

    return (
        <DataView<ClientRow>
            columns={columns}
            filters={filters}
            sortConfig={sortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={(row) => {
                const isSuspended = row.status === 'suspended';

                return [
                    {
                        label: 'عرض التفاصيل',
                        type: 'primary',
                        icon: <FaPencilAlt />,
                        link: `/clients/${row.id}`,
                    },
                    {
                        label: isSuspended ? 'تفعيل الحساب' : 'تعليق الحساب',
                        type: isSuspended ? 'primary' : 'delete',
                        icon: isSuspended ? <FaCheck /> : <FaRegTrashAlt />,
                        child: (
                            <div>
                                {isSuspended
                                    ? `Activate client ${row.id}`
                                    : `Suspend client ${row.id}`}
                            </div>
                        ),
                    },
                ];
            }}
        />
    );
}