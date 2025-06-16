import React from "react";
import {FlowHistoryLine} from "./views/FlowHistoryLine";
import {FlowChart} from "./views/FlowChart";
import {Divider} from "antd";
import {FlowViewChartProps} from "@codingapi/ui-framework";

const DefaultFlowViewRecordView: React.FC<FlowViewChartProps> = () => {

    return (
        <>
            <FlowChart/>
            <Divider>流转历史</Divider>
            <FlowHistoryLine/>
        </>
    )
}

export default DefaultFlowViewRecordView;
