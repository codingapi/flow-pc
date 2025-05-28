import {RouteObject} from "react-router";
import FlowWorkPage from "@/pages/work";
import FlowRecordPage from "@/pages/record";
import WelcomePage from "@/pages/welcome";
import LeavePage from "@/pages/leave";
import Login from "@/pages/login";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <WelcomePage/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/work",
        element: <FlowWorkPage/>,
    },
    {
        path: "/record",
        element: <FlowRecordPage/>,
    },
    {
        path: "/leave",
        element: <LeavePage/>,
    },
]
