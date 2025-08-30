import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.css";
import ContextProvider from "./store/store"
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ContextProvider>
		<App />
		</ContextProvider>
	</React.StrictMode>
);
