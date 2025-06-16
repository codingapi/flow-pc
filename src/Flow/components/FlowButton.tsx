import React, {useContext} from "react";
import {FlowViewReactContext} from "../view";
import {useSelector} from "react-redux";
import {FlowReduxState} from "../store";
import {Button} from "antd";

interface FlowHeaderProps{
    setVisible:(visible:boolean)=>void;
}

export const FlowButton:React.FC<FlowHeaderProps> = (props) => {
    const flowViewReactContext = useContext(FlowViewReactContext);

    const flowRecordContext = flowViewReactContext?.flowRecordContext;

    const flowButtonClickContext = flowViewReactContext?.flowButtonClickContext;

    const buttons = flowRecordContext?.getFlowButtons()||[];
    const requestLoading = useSelector((state: FlowReduxState) => state.flow.requestLoading);
    const contentHiddenVisible = useSelector((state: FlowReduxState) => state.flow.contentHiddenVisible);

    const style = contentHiddenVisible ? {"display":"none"} : {};

    if(flowRecordContext?.isWithdraw()){
        return (
            <div className={"flow-buttons-content"} style={style}>
                <Button
                    color={"default"}
                    className={"flow-buttons-item"}
                    onClick={() => {
                        flowButtonClickContext?.handlerRecall();
                    }}
                >
                   撤回
                </Button>

                <Button
                    color={"default"}
                    className={"flow-buttons-item"}
                    onClick={() => {
                        props.setVisible(false);
                    }}
                >
                    关闭
                </Button>
            </div>
        )
    }

    if(flowRecordContext?.isEditable()){
        return (
            <div className={"flow-buttons-content"} style={style}>
                {buttons.map((item:any) => {
                    const style = item.style && JSON.parse(item.style) || {};
                    return (
                        <Button
                            loading={requestLoading}
                            key={item.id}
                            className={"flow-buttons-item"}
                            style={{
                                ...style
                            }}
                            onClick={() => {
                                flowButtonClickContext?.handlerClick(item);
                            }}
                        >{item.name}</Button>
                    )
                })}

                <Button
                    color={"default"}
                    className={"flow-buttons-item"}
                    onClick={() => {
                        props.setVisible(false);
                    }}
                >
                    关闭
                </Button>

            </div>
        )
    }else {
        return (
            <div className={"flow-buttons-content"} style={style}>
                <Button
                    loading={requestLoading}
                    style={{
                        marginLeft:'15%',
                        marginRight:'15%'
                    }}
                    className={"flow-buttons-item"}
                    onClick={() => {
                        props.setVisible(false);
                    }}
                >关闭</Button>
            </div>
        )
    }
}

