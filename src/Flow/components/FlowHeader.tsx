import React, {useContext} from "react";
import {FlowButton} from "./FlowButton";
import {FlowViewReactContext} from "../view";

interface FlowHeaderProps{
    setVisible:(visible:boolean)=>void;
}

// 流程详情header头信息
export const FlowHeader:React.FC<FlowHeaderProps> = (props)=>{
    const flowViewReactContext = useContext(FlowViewReactContext);
    const flowRecordContext =  flowViewReactContext?.flowRecordContext;
    const currentNode = flowRecordContext?.getCurrentNode();

    return (
        <div className={"flow-header"}>
            <div className={"flow-header-left"}>
                {currentNode && currentNode.name}
            </div>
            <div className={"flow-header-right"}>
                <FlowButton setVisible={props.setVisible}/>
            </div>
        </div>
    )
}

