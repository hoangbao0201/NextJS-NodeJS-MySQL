import { useEffect, useRef } from "react"

const useClickOutSide = ( node : any, handler: Function ) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler])

    useEffect(() => {
        const handleClickOutside = (e : any) => {

            if(!node.current) {
                return;
            }
            if(node.current.contains(e.target)) {
                return;
            }
            if(handlerRef.current) {
                handlerRef.current();
            }
        }

        return () => {
            document.addEventListener("mousedown", handleClickOutside);
        }
    }, [node])
}

export default useClickOutSide;
