import PrimaryButton from "@/components/shared/Button";
import TextInput from "@/components/shared/TextInput";
import Link from "next/link";


export default function PasswordForm() {
    return (
        <>
            <TextInput
                id="password"
                name="password"
                label="كلمة المرور"
                placeholder="أدخل كلمة المرور"
                type="password"
            />
            <div className="col-span-12 flex justify-between items-center text-sm text-[var(--neutral-600)]">
                <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-primary" />
                    تذكرني
                </label>
                <Link href="/forgot-password" className="text-primary font-semibold underline">
                    نسيت كلمة المرور؟
                </Link>
            </div>
            <div className="col-span-12">
                <PrimaryButton
                    type="submit"
                    className="w-full py-3 px-6 rounded-full bg-primary text-white hover:bg-primary/90 font-semibold transition"
                >
                    تسجيل الدخول
                </PrimaryButton>

            </div>
        </>
    );
}