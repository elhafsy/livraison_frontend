// socketService.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const createWebSocketConnection = (url, onConnectCallback) => {
    const socket = new SockJS(url);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => console.log(str),
        onConnect: onConnectCallback,
        onStompError: (frame) => console.error("Erreur STOMP:", frame),
    });

    stompClient.activate();

    return stompClient;
};

export const closeWebSocketConnection = (stompClient) => {
    if (stompClient && stompClient.connected) {
        stompClient.deactivate();
    }
};