// import {
//   Box,
//   Calendar,
//   Home,
//   Inbox,
//   Search,
//   Settings,
//   Upload,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import Link from "next/link";

// // Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "/admin",
//     icon: Home,
//   },
//   {
//     title: "Manage Products",
//     url: "/admin/product-management",
//     icon: Box,
//   },
//   {
//     title: "Media",
//     url: "/admin",
//     icon: Upload,
//   },
// ];

// export function UserAppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import React from "react";

export const UserAppSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-0" variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
