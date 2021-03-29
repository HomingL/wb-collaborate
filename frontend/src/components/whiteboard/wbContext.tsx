
import React, { useState, useContext, createContext, useEffect, useCallback } from 'react'
import { fabric } from "fabric";
import { usePBContext } from './peerData';
import { useUpdateWhiteboardMutation } from '../../generated/apolloComponents';

export interface WBprops {
    penState?: boolean;
    setPenState?: (state : boolean) => void;
    canvas?: fabric.Canvas;
    setCanvas?: (canv: fabric.Canvas) => void;
    onCanvasChange?: (stringifiedCanv: string) => void;
    select?: fabric.Object[];
    setSelect?: (lst: fabric.Object[]) => void;
}

const WBContext = createContext<WBprops>({
    penState: true,
    canvas: undefined,
    select: [],
});

interface WBProviderProps {
    wid: string,
}

const WBProvider: React.FC<WBProviderProps> = ({ wid, children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [penState, setPenState] = useState<boolean>(true);
    const { peerBroadcast } = usePBContext();
    const [updateWhiteboardMutation] = useUpdateWhiteboardMutation({
        variables: {
            id: '',
            data: ''
        },
    });

    const onCanvasChange = useCallback((stringifiedCanv:string) => {
        if (peerBroadcast) peerBroadcast(JSON.stringify({ canvas: stringifiedCanv }));
        updateWhiteboardMutation({
            variables: {
                id: wid,
                data: stringifiedCanv
            },
        }).catch((err:any) => {
            console.log(err);
            throw new Error('Error cannot save canvas');
        });
    }, [peerBroadcast, wid]);
  
    const [select, setSelect] =  useState<fabric.Object[]>([]);

    useEffect( () =>{
        if (canvas) canvas.isDrawingMode = penState;
    }, [penState]);

    return (
        <WBContext.Provider value={{penState, setPenState, canvas, setCanvas, select, setSelect, onCanvasChange}}>
            {children}
        </WBContext.Provider>
    )
}

export const useWBContext = () => {
    return useContext(WBContext);
}

export  { WBContext, WBProvider}