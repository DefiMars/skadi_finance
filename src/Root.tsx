/* eslint-disable global-require */
import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "src/store/store";
import App from "./App";
import { Web3ContextProvider } from "./hooks/web3Context";
import { ReactQueryProvider } from "./lib/react-query";


const Root: FC = () => {
  return (
    <Web3ContextProvider>
      <ReactQueryProvider>
        <Provider store={store}>
            <BrowserRouter basename={"/#"}>
              <App />
            </BrowserRouter>
        </Provider>
      </ReactQueryProvider>
    </Web3ContextProvider>
  );
};

export default Root;
