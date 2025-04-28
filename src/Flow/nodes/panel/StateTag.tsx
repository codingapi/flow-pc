import React from "react";
import {Tag} from "antd";
import {NodeState} from "@codingapi/ui-framework";

interface StateLabelProps {
    state:NodeState;
}

export const StateTag:React.FC<StateLabelProps> = (props)=>{

    const color = (state:NodeState) => {
        switch (state) {
            case "done":
                return "success";
            case "undone":
                return "processing";
            case "current":
                return "warning";
            default:
                return "default";
        }
    }

    const label = (state:NodeState) => {
        switch (state) {
            case "done":
                return "已执行";
            case "undone":
                return "未执行";
            case "current":
                return "当前节点";
            default:
                return "待执行";
        }
    }

    return (
        <Tag
            color={color(props.state)}
        >
            {label(props.state)}
        </Tag>
    )
}

