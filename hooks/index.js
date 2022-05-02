import { useState, useEffect } from "react";

export function useLazyEffect(callback, dependencyArray) {
    const [isMount, setIsMount] = useState(false);

    useEffect(() => {
        if (!isMount) {
            setIsMount(true);
            return;
        }

        callback();
    }, dependencyArray);
}