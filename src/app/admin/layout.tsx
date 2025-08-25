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
      Admin Here
      {/* <SessionProvider>
        <PrimeReactProvider>
          <SidebarProvider>
            <div>
              <div className={`fixed top-0 left-0 h-full z-40 `}>
                <Sidebar />
              </div>
              <SidebarContentWrapper>
                <div className="flex flex-col min-h-screen w-full">
                  <div className={`sticky top-0 z-30  `}>
                    <AdminBreadcrumbs />
                  </div>
                  <main className="flex-1  overflow-x-hidden">{children}</main>
                </div>
              </SidebarContentWrapper>
            </div>
          </SidebarProvider>
        </PrimeReactProvider>
        <Toaster />
      </SessionProvider> */}
    </div>
  );
}
