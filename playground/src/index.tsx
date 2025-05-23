import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router";
import {createHashRouter} from "react-router-dom";
import {routes} from "@/config/routes";
import "@/config/register";
import {CSSUtils, ThemeConfig, ThemeProvider} from "@codingapi/ui-framework";
import {ConfigProvider} from "antd";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = {
    token:{
        contentFontSize:CSSUtils.getRootVariable('--content-font-size'),
        colorPrimary:CSSUtils.getRootVariable('--primary-color'),
    }
} as ThemeConfig;

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <ConfigProvider theme={theme}>
              <RouterProvider router={createHashRouter(routes)}/>
          </ConfigProvider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
