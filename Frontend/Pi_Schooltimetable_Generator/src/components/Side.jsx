import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function Side(){
    return(
        <Sidebar>
            <Sidebar.Items >
                <Sidebar.ItemGroup  className="bg-[#f1f1f1] border-r-[0.1rem] border-solid border-[rgb(167,115,222)] flex flex-col h-screen absolute left-0 top-0 ali items-center justify-center p-5">
                    <Sidebar.Item href="/Sections">
                        Sections
                    </Sidebar.Item>
                    <Sidebar.Item href="/Subjects">
                        Subjects
                    </Sidebar.Item>
                    <Sidebar.Item href="/Teachers">
                        Teachers
                    </Sidebar.Item>
                    <Sidebar.Item href="#" >
                        Invite
                    </Sidebar.Item>
                    <Sidebar.Item href="#" >
                        Schedules
                    </Sidebar.Item>
                    <Sidebar.Item href="#" >
                        Generate
                    </Sidebar.Item>
                    <Sidebar.Item href="#" >
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}