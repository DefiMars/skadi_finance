import { Metric } from "@olympusdao/component-library";
import { useSelector } from "react-redux";
import { formatNumber } from "src/helpers";
import { IAccountSlice } from "src/store/slices/account-slice";
import { IAppSlice } from "src/store/slices/app-slice";
import { IReduxState } from "src/store/slices/state.interface";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const RebaseAPY: React.FC<AbstractedMetricProps> = props => {
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const _props: MetricProps = {
        ...props,
        label: "APY",
    };

    if (app.rebaseAPY) _props.metric = formatNumber(app.rebaseAPY * 100, 1) + "%";
    else _props.isLoading = true;

    return <Metric {..._props} />;
};

export const UserBalance: React.FC<AbstractedMetricProps> = props => {
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    const _props: MetricProps = {
        ...props,
        label: "Your SKADI Balance",
    };

    if (account.balances.rebase) _props.metric = formatNumber(Number(account.balances.rebase), 2) + " SKADI";
    else _props.isLoading = true;

    return <Metric {..._props} />;
};

export const DailyROI: React.FC<AbstractedMetricProps> = props => {
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    const _props: MetricProps = {
        ...props,
        label: "Daily Earning",
    };

    if (account.balances.rebase && app.oneDayRate) {
        const dailyWin = Number(account.balances.rebase) * app.oneDayRate;
        _props.metric = formatNumber(dailyWin, 2) + " SKADI";
    } else _props.isLoading = true;

    return <Metric {..._props} />;
};