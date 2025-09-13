import ContactSection from "@/components/main/contactUs/ContactSection";
import HelpSection from "@/components/main/contactUs/HelpSection";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "اتصل بنا",
};


export default function ContactUs() {

  return (
    <>
      <HelpSection />
      <ContactSection />
    </>
  );
}
