import { createContext } from "react";

export const Context = createContext({})

export default function ContextProvider({ children }) {

    let value = {}

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}