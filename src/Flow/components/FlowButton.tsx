import React, {useContext} from "react";
import {FlowViewReactContext} from "../view";
import {useSelector} from "react-redux";
import {FlowReduxState} from "../store";
import {Button, Popconfirm} from "antd";

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

    const dangerTypes = ['REMOVE', 'VOIDED'];

    if(flowRecordContext?.isFlowManager()){
        if(!buttons.find(item=> item.id === 'back')) {
            buttons.push({
                id: 'back',
                name: '退回流程',
                type: 'BACK',
            } as any);
        }
        if(!buttons.find(item=> item.id === 'voided')) {
            buttons.push({
                id: 'voided',
                name: '作废流程',
                type: 'VOIDED',
            } as any);
        }
    }

    if(flowRecordContext?.isWithdraw()){
        return (
            <div className={"flow-buttons-content"} style={style}>

                <Popconfirm
                    title={"确认要撤回流程吗？"}
                    onConfirm={()=>{
                        flowButtonClickContext?.handlerRecall();
                    }}
                >
                    <Button
                        loading={requestLoading}
                        color={"default"}
                        className={"flow-buttons-item"}
                    >
                        撤回
                    </Button>
                </Popconfirm>

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
                    if(dangerTypes.includes(item.type)) {
                        return (
                            <Popconfirm
                                key={item.id}
                                title={`确认要执行 ${item.name} 操作吗？`}
                                onConfirm={() => {
                                    flowButtonClickContext?.handlerClick(item);
                                }}
                            >
                                <Button
                                    loading={requestLoading}
                                    className={"flow-buttons-item"}
                                    style={{
                                        ...style
                                    }}
                                >{item.name}</Button>
                            </Popconfirm>
                        )
                    }else {
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
                    }
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

