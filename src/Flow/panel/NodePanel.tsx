import React from "react";
import {StartView} from "../nodes/Start";
import {GroovyScript} from "../utils/script";
import {NodeView} from "../nodes/Node";
import {OverView} from "../nodes/Over";
import {CirculateView} from "../nodes/Circulate";
import {NodeType} from "@codingapi/ui-framework";
import "./NodePanel.scss";
import {FlowContext} from "../domain/FlowContext";


export const NodePanel = () => {

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
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: '',
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
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: '',
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
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: '',
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
                titleGenerator: GroovyScript.defaultTitleGenerator,
                errTrigger: '',
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

