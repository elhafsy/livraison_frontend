// hooks/useWebSocket.ts
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
// Action pour mettre à jour le store

const useWebSocket = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Créer une nouvelle instance SockJS pour se connecter
    const sock = new SockJS("http://localhost:8080/ws"); // URL de ton serveur WebSocket
    const client = new Client({
      webSocketFactory: () => sock,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        // S'abonner à la queue des messages pour cet utilisateur
        client.subscribe(`/queue/messages-${userId}`, (msg) => {
            console.log(msg);
            
          const message = JSON.parse(msg.body);
          console.log(message);
          
         // dispatch(setNewMessage(message)); // Ajouter un nouveau message dans le store via RTK Query
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate(); // Fermer la connexion WebSocket lorsque le composant est démonté
    };
  }, [dispatch, userId]); // Recharger à chaque changement d'userId

  return null; // Pas besoin de retourner quoi que ce soit
};

export default useWebSocket;
