import OtpInput from '@/components/shared/OtpInput';
import TextInput from '@/components/shared/TextInput';

export default function OtpForm({ otpSent, otpCooldown, otp, setOtp, email, handleSendOtp }: any) {
    return !otpSent ? (
        <div className="col-span-12">
            <button
                type="submit"
                onClick={handleSendOtp}
                disabled={otpCooldown}
                className={`w-full py-3 px-6 rounded-full font-semibold transition ${otpCooldown
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary/90'
                    }`}
            >
                إرسال رمز التحقق
            </button>
        </div>
    ) : (
        <>
            <OtpInput value={otp} onChange={setOtp} />
            <div className="col-span-12 text-sm text-[var(--neutral-600)]">
                تم إرسال رمز التحقق إلى بريدك الإلكتروني{' '}
                <span className="font-semibold text-primary">{email}</span>. الرجاء إدخال الرمز للمتابعة.
            </div>
            <div className="col-span-12">
                <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition"
                >
                    متابعة
                </button>
            </div>
        </>
    );
}
