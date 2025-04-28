import React, {useContext, useEffect} from "react";
import {FlowFormViewProps} from "@codingapi/ui-framework";
import {FlowViewReactContext} from "../view";
import {useSelector} from "react-redux";
import {FlowReduxState} from "../store/FlowSlice";
import {Divider, Tabs, TabsProps} from "antd";
import {FlowFormOpinion} from "./FlowFormOpinion";
import {FlowHistory} from "./FlowHistory";
import {FlowOpinion} from "./FlowOpinion";
import {FlowChart} from "./FlowChart";
import {FlowHistoryLine} from "./FlowHistoryLine";

export const FlowContent = () => {
    const flowViewReactContext = useContext(FlowViewReactContext);

    const flowRecordContext = flowViewReactContext?.flowRecordContext;
    const formInstance = flowViewReactContext?.formInstance;

    const FlowFormView = flowRecordContext?.getFlowFormView() as React.ComponentType<FlowFormViewProps>;

    const formParams = flowRecordContext?.getFlowFormParams();

    const opinionVisible = useSelector((state: FlowReduxState) => state.flow.opinionVisible);
    const dataVersion = useSelector((state: FlowReduxState) => state.flow.dataVersion);
    const contentHiddenVisible = useSelector((state: FlowReduxState) => state.flow.contentHiddenVisible);
    const [currentTab, setCurrentTab] = React.useState('detail');

    useEffect(() => {
        if (!flowRecordContext?.isEditable()) {
            setTimeout(() => {
                formInstance?.disableAll();
            }, 100);
        }
    }, []);

    const style = contentHiddenVisible ? {"display": "none"} : {};

    const items = [
        {
            label: '流程详情',
            key: 'detail'
        },
        {
            label: '流程记录',
            key: 'record'
        },
        {
            label: '流程图',
            key: 'chart'
        }
    ] as TabsProps['items'];

    return (
        <div className={"flow-view-content"} style={style}>
            <Tabs
                items={items}
                activeKey={currentTab}
                onChange={(value) => {
                    setCurrentTab(value)
                }}/>

            {currentTab ==='detail' && (
                <>
                    {formInstance && (
                        <FlowFormView
                            data={formParams}
                            form={formInstance}
                            dataVersion={dataVersion}
                        />
                    )}

                    {opinionVisible && (
                        <FlowFormOpinion/>
                    )}
                </>
            )}

            {currentTab ==='record' && (
                <>
                    <FlowHistory/>
                    <Divider>审批记录</Divider>
                    <FlowOpinion/>
                </>
            )}

            {currentTab ==='chart' && (
                <>
                    <FlowChart/>
                    <Divider>流转历史</Divider>
                    <FlowHistoryLine/>
                </>
            )}
        </div>
    )
}

