import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {State} from "./State";
import MessageHandler from './MessageHandler';
import { useCurrentUser } from '../../modules/selector/UiSelector';

function getWebsocketUrl(): string {
    const url = process.env.API_URL;
    const protocol = url.substring(0, url.indexOf('://'));
    const rawUrl = url.substring(protocol.length + 3);
    if(protocol === 'https') {
        return 'wss://' + rawUrl;
    }
    return 'ws://' + rawUrl;
}

export const WebsocketContext = createContext({});
export const ContextProvider = ({reducer, initialState, children, path}) => {
    const currentUser = useCurrentUser();

    return <WebsocketContext.Provider value={useReducer(reducer, initialState)}>
        <MessageHandler url={getWebsocketUrl() + path + '/' + (currentUser?.frameApiKey || '')}/>
        {children}
    </WebsocketContext.Provider>;
}

export default ContextProvider;

export const useStateValue = (): [State, Dispatch<{}>] => useContext(WebsocketContext) as  [State, Dispatch<{}>];