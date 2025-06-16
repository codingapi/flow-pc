import React from "react";
import {FlowHistory} from "./views/FlowHistory";
import {FlowOpinion} from "./views/FlowOpinion";
import {Divider} from "antd";
import {FlowViewRecordProps} from "@codingapi/ui-framework";

const DefaultFlowViewRecordView: React.FC<FlowViewRecordProps> = (props) => {

    return (
        <>
            <FlowHistory/>
            <Divider>审批记录</Divider>
            <FlowOpinion/>
        </>
    )
}

export default DefaultFlowViewRecordView;
