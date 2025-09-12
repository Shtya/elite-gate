import MainFooter from "@/components/shared/Footer/MainFooter";
import MainHeader from "@/components/shared/Header/MainHeader";
import TopContactBar from "@/components/shared/Header/TopContactBar";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <TopContactBar />
            <MainHeader />
            <main className="flex-1 ">{children}</main>
            <MainFooter />
        </>
    );
}