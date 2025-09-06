import { createContext, useState } from 'react';

export const Context = createContext({
	itemsSelected: [],
	setItemsSelected: () => {},
});

export default function ContextProvider({ children }) {
	const [itemsSelected, setItemsSelected] = useState([]);
	let value = { itemsSelected, setItemsSelected };

	return <Context.Provider value={value}>{children}</Context.Provider>;
}
