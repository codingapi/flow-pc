import React, {useEffect, useRef} from "react";
import '@logicflow/core/es/index.css';
import '@logicflow/extension/lib/style/index.css';
import {LogicFlow} from "@logicflow/core";
import {DndPanel, Menu, MiniMap, Snapshot} from "@logicflow/extension";
import {StartNodeConfig} from "./nodes";
import {NodeNodeConfig} from "./nodes";
import {OverNodeConfig} from "./nodes";
import {CirculateNodeConfig} from "./nodes";
import {ControlLayoutPanel} from "./panel";
import {NodeLayoutPanel} from "./panel";
import {EdgeType, ThemeConfig, ThemeProvider, ThemeProviderContext} from "@codingapi/ui-framework";

import "./index.scss";
import {FlowPanelContext} from "./domain";
import {FlowContext} from "./domain";
import {ConfigProvider} from "antd";

export interface FlowActionType {
    getData: () => any;
}

export interface FlowProps {
    data?: LogicFlow.GraphConfigData;
    actionRef?: React.Ref<any>;
    edgeType?: EdgeType;
}

export const Flow: React.FC<FlowProps> = (props) => {

    // 流程图背景颜色
    const FLOW_BACKGROUND_COLOR = '#f3f5f8';
    // 流程图的边颜色
    const FLOW_EDGE_COLOR = '#8f94e3';
    // 流程图的边宽度
    const FLOW_EDGE_STROKE_WIDTH = 1;

    const themeContext = React.useContext(ThemeProviderContext);
    const theme = themeContext?.getTheme() || {} as ThemeConfig;

    const container = useRef<HTMLDivElement>(null);
    const lfRef = useRef<LogicFlow>(null);
    const edgeType = props.edgeType || 'polyline';

    const flowPanelContext = new FlowPanelContext(lfRef);
    FlowContext.getInstance().setFlowPanelContext(flowPanelContext);

    if (props.actionRef) {
        React.useImperativeHandle(props.actionRef, () => ({
            getData: () => {
                return flowPanelContext.getGraphData();
            }
        }), [props]);
    }

    const data = props?.data || {};

    useEffect(() => {
        const SilentConfig = {
            isSilentMode: false,
            stopScrollGraph: true,
            stopMoveGraph: true,
            stopZoomGraph: true,
            edgeTextEdit: false,
        };

        //@ts-ignore
        lfRef.current = new LogicFlow({
            //@ts-ignore
            container: container.current,
            ...SilentConfig,
            background: {
                backgroundColor: FLOW_BACKGROUND_COLOR
            },
            plugins: [Menu, DndPanel, MiniMap, Snapshot],
            grid: false,
            keyboard: {
                enabled: true,
                shortcuts: [
                    {
                        keys: ['ctrl + v', 'cmd + v'],
                        callback: (e) => {
                            flowPanelContext.copyNode();
                        }
                    },

                ]
            },
            edgeType: edgeType,
        });

        lfRef.current.setTheme({
            bezier: {
                stroke: FLOW_EDGE_COLOR,
                strokeWidth: FLOW_EDGE_STROKE_WIDTH,
            },
            polyline: {
                stroke: FLOW_EDGE_COLOR,
                strokeWidth: FLOW_EDGE_STROKE_WIDTH,
            },
            line: {
                stroke: FLOW_EDGE_COLOR,
                strokeWidth: FLOW_EDGE_STROKE_WIDTH,
            },
            edgeText:{
                textWidth: 100,
                overflowMode: "default",
                fontSize: 12,
                background: {
                    fill: FLOW_BACKGROUND_COLOR,
                },
            }
        });

        flowPanelContext.register(StartNodeConfig);
        flowPanelContext.register(NodeNodeConfig);
        flowPanelContext.register(OverNodeConfig);
        flowPanelContext.register(CirculateNodeConfig);
        flowPanelContext.render(data);

        lfRef.current.on('node:add', (data) => {
            console.log('node:add', data);
        });

    }, []);

    return (
       <ThemeProvider theme={theme}>
           <ConfigProvider theme={theme}>
               <div className="flow-design">
                   <NodeLayoutPanel/>
                   <ControlLayoutPanel/>

                   <div className={"flow-view"} ref={container}/>
               </div>
           </ConfigProvider>
       </ThemeProvider>
    )
};


