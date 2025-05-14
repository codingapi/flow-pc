import React from 'react';
import {Button, Space} from "antd";
import {useNavigate} from "react-router";


const WelcomePage = () => {

    const navigate = useNavigate();

   return (
       <div style={{
           textAlign:'center'
       }}>
           <div style={{
               margin:50
           }}>
               Flow-pc Playground
           </div>
           <Space>
               <Button onClick={()=>{
                   navigate('/work')
               }}>go work</Button>
               <Button onClick={()=>{
                   navigate('/record')
               }}>go record</Button>
           </Space>
       </div>
    );
}

export default WelcomePage;
