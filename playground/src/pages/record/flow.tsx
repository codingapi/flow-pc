import React from "react";
import {FlowModelView} from "@codingapi/flow-pc";
import {flowViews} from "@/config/flows";

const FlowRecordPage = () => {

    const [flowViewVisible, setFlowViewVisible] = React.useState(false);
    const currentId = '1'

    return (
        <div>
            <FlowModelView
                visible={flowViewVisible}
                setVisible={setFlowViewVisible}
                id={currentId}
                view={flowViews}
            />
        </div>
    );
};

export default FlowRecordPage;
