import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {FlowReduxState} from "../store";
import {FlowViewReactContext} from "../view";
import {Button, Result} from "antd";

export const FlowResult = () => {
    const result = useSelector((state: FlowReduxState) => state.flow.result);

    const flowViewReactContext = useContext(FlowViewReactContext);

    return (
        <Result
            status={result?.state}
            title={result?.title}
        >
            <div className={"flow-result-content"}>
                {result && result.items && result.items.map((item:any) => {
                    return (
                        <div className={"flow-result-content-item"}>
                            <div className={"flow-result-content-item-label"}>{item.label}:</div>
                            <div className={"flow-result-content-item-value"}>{item.value}</div>
                        </div>
                    )
                })}

                <div className={"flow-result-content-footer"}>
                    <Button
                        className={"flow-result-content-button"}
                        block={true}
                        onClick={() => {
                            flowViewReactContext?.flowStateContext?.clearResult();
                        }}
                    >关闭页面</Button>
                </div>
            </div>
        </Result>
    )
}

