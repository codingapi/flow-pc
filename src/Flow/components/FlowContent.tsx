import React, {useContext, useEffect} from "react";
import {ComponentBus, FlowFormViewProps} from "@codingapi/ui-framework";
import {FlowViewReactContext} from "../view";
import {useSelector} from "react-redux";
import {FlowReduxState} from "../store";
import {Tabs, TabsProps} from "antd";
import {FlowViewChartPropsKey, FlowViewOpinionPropsKey, FlowViewRecordPropsKey} from "@codingapi/ui-framework";
import DefaultFlowViewOpinionView from "../plugins/DefaultFlowViewOpinionView";
import DefaultFlowViewRecordView from "../plugins/DefaultFlowViewRecordView";
import DefaultFlowViewChartView from "../plugins/DefaultFlowViewChartView";

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

    const FlowViewOpinionView = ComponentBus.getInstance().getComponent(FlowViewOpinionPropsKey,DefaultFlowViewOpinionView)
    const FlowViewRecordView = ComponentBus.getInstance().getComponent(FlowViewRecordPropsKey,DefaultFlowViewRecordView)
    const FlowViewChartView = ComponentBus.getInstance().getComponent(FlowViewChartPropsKey,DefaultFlowViewChartView)

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

                    {opinionVisible && FlowViewOpinionView && (
                        <FlowViewOpinionView/>
                    )}
                </>
            )}

            {currentTab ==='record' && FlowViewRecordView && (
                <FlowViewRecordView/>
            )}

            {currentTab ==='chart' && FlowViewChartView && (
                <FlowViewChartView/>
            )}
        </div>
    )
}

