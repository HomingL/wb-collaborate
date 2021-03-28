
import React, { useState, useContext, createContext, useEffect } from 'react'
import { fabric } from "fabric";

export interface WBprops {
    penState?: boolean;
    setPenState?: (state : boolean) => void;
    canvas?: fabric.Canvas;
    setCanvas?: (canv: fabric.Canvas) => void;
    select?: fabric.Object[];
    setSelect?: (lst: fabric.Object[]) => void;
}

const WBContext = createContext<WBprops>({
    penState: true,
    canvas: undefined,
    select: [],
});

const WBProvider: React.FC = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [penState, setPenState] = useState<boolean>(true);
    const [select, setSelect] =  useState<fabric.Object[]>([]);

    useEffect( () =>{
        if (canvas) canvas.isDrawingMode = penState;
    }, [penState]);

    return (
        <WBContext.Provider value={{penState, setPenState, canvas, setCanvas, select, setSelect}}>
            {children}
        </WBContext.Provider>
    )
}

export const useWBContext = () => {
    return useContext(WBContext);
}

export  { WBContext, WBProvider}