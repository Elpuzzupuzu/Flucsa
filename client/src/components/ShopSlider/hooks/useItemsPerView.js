import { useState, useEffect } from 'react';

const useItemsPerView = () => {
    const [itemsPerView, setItemsPerView] = useState(4);

    useEffect(() => {
        const calculateItems = () => {
            // Lógica de Media Queries
            if (window.innerWidth < 640) setItemsPerView(1); 
            else if (window.innerWidth < 768) setItemsPerView(2);
            else if (window.innerWidth < 1024) setItemsPerView(3);
            else setItemsPerView(6);
        };

        calculateItems();
        window.addEventListener('resize', calculateItems);
        return () => window.removeEventListener('resize', calculateItems);
    }, []);

    return itemsPerView;
};

export default useItemsPerView;