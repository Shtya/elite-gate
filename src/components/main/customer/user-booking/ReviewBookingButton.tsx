'use client';

import { useState } from 'react';
import BookingFormPopup from './BookingFormPopup';

interface ReviewBookingButtonProps {
    bookingId: string;
}

export default function ReviewBookingButton({ bookingId }: ReviewBookingButtonProps) {
    const [showReviewForm, setShowReviewForm] = useState(false);

    return (
        <div className="text-end">
            <button
                onClick={() => setShowReviewForm(true)}
                className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition"
            >
                إضافة مراجعة
            </button>

            <BookingFormPopup
                bookingId={bookingId}
                open={showReviewForm}
                onClose={() => setShowReviewForm(false)}
            />
        </div>
    );
}
