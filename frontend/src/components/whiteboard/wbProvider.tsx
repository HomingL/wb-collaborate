
import { useState, useContext, createContext } from 'react'
import { fabric } from "fabric";

export interface WBprops {
    penState: string;
    setPenState: (state : string) => void;
    canvas: fabric.Canvas;
    setCanvas: (canv: fabric.Canvas) => void;
}

const WBContext = createContext<WBprops>({
    penState: "",
    setPenState: (state : string) => {},
    canvas: null,
    setCanvas: (canv: fabric.Canvas) => void
});

const WBProvider: React.FC = ({ children }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [penState, setPenState] = useState<string>("up");

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