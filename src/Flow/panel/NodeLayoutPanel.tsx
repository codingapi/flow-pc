import React from "react";
import {StartView} from "../nodes";
import {GroovyScript} from "../utils";
import {NodeView} from "../nodes";
import {OverView} from "../nodes";
import {CirculateView} from "../nodes";
import {NodeType} from "@codingapi/ui-framework";
import "./NodeLayoutPanel.scss";
import {FlowContext} from "../domain";


export const NodeLayoutPanel = () => {

    const flowContext = FlowContext.getInstance();

    const items = [
        {
            type: 'start-node',
            view: <StartView name={"开始节点"}/>,
            properties: {
                name: '开始节点',
                code: 'start',
                type: 'START',
                view: 'default',
                operatorMatcher: GroovyScript.anyOperatorMatcher,
                editable: true,
                mergeable:false,
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: GroovyScript.defaultErrTrigger,
                approvalType: 'UN_SIGN',
                timeout: 0
            }
        },
        {
            type: 'node-node',
            view: <NodeView name={"流程节点"}/>,
            properties: {
                name: '流程节点',
                code: 'flow',
                type: 'APPROVAL',
                view: 'default',
                operatorMatcher: GroovyScript.anyOperatorMatcher,
                editable: true,
                mergeable:false,
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: GroovyScript.defaultErrTrigger,
                approvalType: 'SIGN',
                timeout: 0
            }
        },
        {
            type: 'over-node',
            view: <OverView name={"结束节点"}/>,
            properties: {
                name: '结束节点',
                code: 'over',
                type: 'OVER',
                view: 'default',
                operatorMatcher: GroovyScript.creatorOperatorMatcher,
                editable: true,
                mergeable:false,
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: GroovyScript.defaultErrTrigger,
                approvalType: 'UN_SIGN',
                timeout: 0
            }
        },
        {
            type: 'circulate-node',
            view: <CirculateView name={"抄送节点"}/>,
            properties: {
                name: '抄送节点',
                code: 'circulate',
                type: 'CIRCULATE',
                view: 'default',
                operatorMatcher: GroovyScript.creatorOperatorMatcher,
                editable: true,
                mergeable:false,
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: GroovyScript.defaultErrTrigger,
                approvalType: 'CIRCULATE',
                timeout: 0
            }
        }
    ];

    return (
        <div className={"flow-panel-nodes"}>
            <h3 className={"flow-panel-nodes-title"}>流程节点</h3>
            <div className={"flow-panel-nodes-content"}>
                {items && items.map((item)=>{
                    return (
                        <div className={"flow-panel-nodes-content-item"}
                             onMouseDown={()=>{
                                 flowContext.getFlowPanelContext()?.addNode(item.type as NodeType,item.properties);
                             }}
                        >
                            {item.view}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

