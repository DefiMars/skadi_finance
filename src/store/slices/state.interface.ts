import { IAccountSlice } from "./account-slice";
import { IAppSlice } from "./app-slice";
import { MessagesState } from "./messages-slice";
import { IPendingTxn } from "./pending-txns-slice";
import { IPresaleSlice } from "./presale-slice";

export interface IReduxState {
  pendingTransactions: IPendingTxn[];
  account: IAccountSlice;
  app: IAppSlice;
  presale: IPresaleSlice;
  messages: MessagesState;
}
