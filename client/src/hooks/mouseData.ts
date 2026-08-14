

// anything about mouse pointer tracking 
import { useState, useEffect } from "react"; 

export default function useCursorLocation(){
    // https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/ 
    const [coord, setCoords] = useState({
        x: 0, 
        y: 0
    }); 

    useEffect(() => {
        const handleMovement = (ev: MouseEvent) =>{
            setCoords({
                x: ev.clientX, 
                y: ev.clientY
            })
        }
        window.addEventListener("mousemove", handleMovement);

        return () => 
            window.removeEventListener("mousemove", handleMovement);
    }, []);

  return coord; 
} 


























