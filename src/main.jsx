import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import CreateGlobalStyle from "./styles/globalstyles";

ReactDom.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
		<CreateGlobalStyle />
	</React.StrictMode>,
);
