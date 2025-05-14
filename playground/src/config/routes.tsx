import {RouteObject} from "react-router";
import FlowWorkPage from "@/pages/work";
import FlowRecordPage from "@/pages/record";
import WelcomePage from "@/pages/welcome";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <WelcomePage/>,
    },
    {
        path: "/work",
        element: <FlowWorkPage/>,
    },
    {
        path: "/record",
        element: <FlowRecordPage/>,
    },
]