import { DataRow } from "@olympusdao/component-library";
import { useSelector } from "react-redux";
import { formatNumber } from "src/helpers";
import { IPresaleSlice } from "src/store/slices/presale-slice";
import { IReduxState } from "src/store/slices/state.interface";

export const WhitelistTier = () => {
    const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);

    const props: PropsOf<typeof DataRow> = { title: "Your Whitelist Tier" };

    if (presale.wlTier) {
        props.balance = `Tier ${formatNumber(presale.wlTier, 0)}`;
    } else props.isLoading = true;

    return <DataRow {...props} />;
};

export const CurrentPayement = () => {
    const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);

    const props: PropsOf<typeof DataRow> = { title: "Current Payement" };

    if (presale.minAllocation) {
        props.balance = `${formatNumber(presale.currentPayment, 2)} CRO`;
    } else props.isLoading = true;

    return <DataRow {...props} />;
};


export const MinimumAllocation = () => {
    const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);

    const props: PropsOf<typeof DataRow> = { title: "Minimum allocation" };

    if (presale.minAllocation) {
        props.balance = `${formatNumber(presale.minAllocation, 1)} CRO`;
    } else props.isLoading = true;

    return <DataRow {...props} />;
};

export const MaximumAllocation = () => {
    const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);

    const props: PropsOf<typeof DataRow> = { title: "Maximum allocation" };

    if (presale.maxAllocation) {
        props.balance = `${formatNumber(presale.maxAllocation, 1)} CRO`;
    } else props.isLoading = true;

    return <DataRow {...props} />;
};

