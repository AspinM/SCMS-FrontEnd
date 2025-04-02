'use client'

import { Provider } from "react-redux";

import reduxStore from './Store';

export const Providers = (props) => {
    return <Provider store={reduxStore}>{props.children}</Provider>
}