/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
// import Sidebar from '@/components/adminLayout/sidebar';
// import AdminBreadcrumbs from '@/components/adminLayout/adminHeader';
// import { SessionProvider, useSession } from 'next-auth/react';
// import MediaUploader from '@/components/mediaUploader/mediaUploader';
// import { PrimeReactProvider } from 'primereact/api';
// import { auth } from '@/auth';
// import { getOneUser } from '@/actions/user/getUser';
// import { SidebarProvider } from '@/components/adminLayout/SidebarProvider';
// import SidebarContentWrapper from '@/components/adminLayout/SidebarContentWrapper';
import { Toaster } from "react-hot-toast";
import { UserAppSidebar } from "./(auth)/_components/user-sidebar";

export const metadata: Metadata = {
  title: "Hungry V",
  description:
    "Smart & Easy Food Ordering System. Ease your dinning experience with us",
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
    <div className="w-screen ">
      {/* <div className="border border-blue-400 w-fit">
        <AdminSideBar></AdminSideBar>
      </div> */}
      {/* <SidebarProvider> */}

      <main className="w-full">
        <div className="border w-full px-4">
          <UserAppSidebar />
        </div>
        <div className="border w-full p-4">{children}</div>
      </main>
      {/* </SidebarProvider> */}
      <Toaster />
    </div>
  );
}
