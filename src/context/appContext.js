import React, { createContext, useState } from 'react';

export const WebContext = createContext();

export const WebProvider = ({ children }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleFunctionLoginModal = () => {
        setIsLoginModalOpen(prevState => !prevState);
    };

    return (
        <WebContext.Provider value={{
            isLoginModalOpen,
            handleFunctionLoginModal,
        }}>
            {children}
        </WebContext.Provider>
    );
};