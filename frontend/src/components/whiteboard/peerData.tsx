import { io } from "socket.io-client";
import Peer from "simple-peer";
import React, { useContext, createContext, useEffect, useRef, useCallback, useState } from "react";

export const PBContext = createContext<{peerBroadcast?: (data: string) => void, peerData?: any}>({});

export const usePBContext = () => {
    return useContext(PBContext);
}

interface PeerConnecionProps {
    wid: string,
    children: React.ReactNode,
}

const PeerConnecion: React.FC<PeerConnecionProps> = ({ children, wid }) => {

    const roomId = wid;
    const token = "abc";
    const selfSocketId = useRef<string>('');
    const allSocketIds = useRef<string[]>([]);
    const peerConnections = useRef<{[socketId:string]:any}>({});
    const socket = useRef<any>();
    
    useEffect(() => {
        // connect the server by passing in auth token and roomId
        if (!wid) return ()=>{return};
        socket.current = io(process.env.NEXT_PUBLIC_BACK_END_SOCKET!, {
            auth: {
                token: token
            },
            query: {
                "roomId": roomId
            },
            reconnectionAttempts: 10
        });
        
        // receive self socket id when connected to the server
        socket.current.on('init', (data:{selfId:string, allUserIds:string[]}) => {
            selfSocketId.current = data.selfId;
            allSocketIds.current = data.allUserIds;
            connectPeers();
        });
        
        // keep all connected user id updated and establish simple-peer connection to them
        socket.current.on('allUserIds', (users:string[]) => {
            allSocketIds.current = (users);
            peerCleanup();
        });

        // signal the data passed by peer
        socket.current.on('hello', (data:{initiatorId:string, signalData:any}) => {
            signal(data.initiatorId, data.signalData);
        });
        
        // clean up effect when unmounting
        return (() => {
            if (socket.current)
               socket.current.disconnect();
            return;
        });
        
    },[wid]);
    
    function callPeer(id:string) {
        console.log("all ids:", allSocketIds.current);
        console.log(selfSocketId.current, "is calling peers:", id);
        // return if connect to self or already connected
        if (id === selfSocketId.current || peerConnections.current[id]) return;
        const peer = new Peer({
            initiator: true,
            trickle: false
        });

        peer.on('signal', (signalData:any) => {
            socket.current.emit("notifyPeers", { to: id, signalData: signalData, from: selfSocketId.current })
        })
        peer.on('error', (err:Error) => {
            callPeer(id);
        });
        peer.on('data', (data:string) => {
            onPeerData(data);
        });
        
        // finalize connection if connection accepted
        socket.current.on('accepted', (data:any) => {
            if (data.targetId === id) {
                try {
                    peer.signal(data.signalData);
                    peerConnections.current[id] = peer;
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    function peerCleanup() {
        // destroy p2p connection to disconnected user
        Object.keys(peerConnections.current).forEach(id => {
            if (!allSocketIds.current.includes(id)) {
                peerConnections.current[id].destroy();
                delete peerConnections.current[id];
            }
        });
    }

    function connectPeers() {
        peerCleanup();
        // establish new p2p connection
        allSocketIds.current.forEach(id => {if (id !== selfSocketId.current) callPeer(id)});
    }
    
    function signal(initiator:string, initiatorData:any) {

        const peer = new Peer({
            initiator: false,
            trickle: false
        });
        peer.on('signal', (signalData:any) => {
            socket.current.emit("acceptConn", { signalData: signalData, to: initiator })
        });
        peer.on('error', (err:Error) => {
            console.error(err);
        });
        peer.on('data', (data:string) => {
            onPeerData(data);
        });
        peer.signal(initiatorData);
        peerConnections.current[initiator] = peer;
    }

    const peerBroadcast = useCallback((data:string) => {
        Object.values(peerConnections.current).forEach(peer => {
            try {
                peer.send(data);
            } catch (err) {
                peerCleanup();
            }
        });
    }, []);

    const [peerData, setPeerData] = useState<string>('');
    
    // define this function to send data
    function onPeerData(data:string) {
        setPeerData(data.toString());
    }

    return (
        <PBContext.Provider value={{peerBroadcast, peerData}}>
            {children}
        </PBContext.Provider>
    );
}

export default PeerConnecion;