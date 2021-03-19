
import React, { useState, useContext, createContext, useEffect } from 'react'
import { fabric } from "fabric";

export interface WBprops {
    penState?: boolean;
    setPenState?: (state : boolean) => void;
    canvas?: fabric.Canvas;
    setCanvas?: (canv: fabric.Canvas) => void;
}

const WBContext = createContext<WBprops>({
    penState: true,
    // setPenState: (state : boolean) => {},
    canvas: undefined,
    // setCanvas: (canv: fabric.Canvas) => {}
});

const WBProvider: React.FC = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [penState, setPenState] = useState<boolean>(true);

    useEffect( () =>{
        if (canvas)
            canvas.isDrawingMode = false;
    }, [penState]);

    return (
        <WBContext.Provider value={{penState, setPenState, canvas, setCanvas}}>
            {children}
        </WBContext.Provider>
    )
}

export const useWBContext = () => {
    return useContext(WBContext);
}

export  { WBContext, WBProvider}