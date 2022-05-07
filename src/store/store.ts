import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./slices/account-slice";
import appReducer from "./slices/app-slice";
import messagesReducer from "./slices/messages-slice";
import presaleReducer from "./slices/presale-slice";
import pendingTransactionsReducer from "./slices/pending-txns-slice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    presale: presaleReducer,
    pendingTransactions: pendingTransactionsReducer,
    messages: messagesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
