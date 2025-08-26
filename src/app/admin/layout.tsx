/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
// import Sidebar from '@/components/adminLayout/sidebar';
// import AdminBreadcrumbs from '@/components/adminLayout/adminHeader';
// import { SessionProvider, useSession } from 'next-auth/react';
// import MediaUploader from '@/components/mediaUploader/mediaUploader';
// import { PrimeReactProvider } from 'primereact/api';
// import { auth } from '@/auth';
import { redirect } from "next/navigation";
// import { getOneUser } from '@/actions/user/getUser';
// import { SidebarProvider } from '@/components/adminLayout/SidebarProvider';
// import SidebarContentWrapper from '@/components/adminLayout/SidebarContentWrapper';
import { getAdminProfile, getProfileAction } from "@/services/auth.service";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Souk Admin",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const session = await getAdminProfile();

  //   console.log("Admin Layout -> session", session);
  //   if (session.success === false || !session.data) {
  //     redirect("/");
  //   }

  //   if (
  //     !session.data ||
  //     session.data?.type !== "ADMIN" ||
  //     !session.data.emailVerified
  //   ) {
  //     redirect("/login");
  //   }

  return (
    <div className={` flex `}>
      <div>{children}</div>
      <Toaster />
    </div>
  );
}
