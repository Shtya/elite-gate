'use client';

import Card from '@/components/shared/Card';
import FilePreviewItem from '@/components/shared/Forms/FilePreviewItem';
import { InterestRequestFull } from '@/types/dashboard/interest-requests';

type Props = {
    request: InterestRequestFull;
};

export default function AttachmentsCard({ request }: Props) {
    return (
        <Card title="المرفقات">
            {request.attachments.length > 0 ? <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {request.attachments.map((file, idx) => (
                    <FilePreviewItem
                        key={idx}
                        file={file}
                        idx={idx}
                        allowMultiple
                        allowPrimary={false}
                    />
                ))}</div> :
                <div className="w-full text-sm text-gray-500 italic min-h-[140px] flex justify-center items-center">
                    لا توجد مرفقات
                </div>
            }
        </Card>
    );
}
