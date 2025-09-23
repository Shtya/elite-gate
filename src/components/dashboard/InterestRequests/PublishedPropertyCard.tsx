'use client';

import Card from '@/components/shared/Card';
import InfoCell from '@/components/shared/InfoCell';
import { projectTypeColors } from '@/constants/dashboard/property.tsx/constants';
import { MiniProject, propertyTypeLabels } from '@/types/property';
import { getDefaultProjectpath } from '@/utils/appointment';


type Props = {
    publishedProperty: MiniProject;
};

export default function PublishedPropertyCard({ publishedProperty }: Props) {
    const imageSrc =
        typeof publishedProperty.image === 'string' && publishedProperty.image.trim() !== ''
            ? publishedProperty.image
            : getDefaultProjectpath(publishedProperty.type);

    return (
        <Card title="العقار المنشور">
            <InfoCell
                image={imageSrc}
                title={publishedProperty.title}
                href={`/projects/${publishedProperty.id}`}
                subtitle={propertyTypeLabels[publishedProperty.type]}
                imageRounded="lg"
                subtitleClass={projectTypeColors[publishedProperty.type]}
            />
        </Card>
    );
}
