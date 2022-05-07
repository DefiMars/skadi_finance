import { Metric } from "@olympusdao/component-library";
import moment from "moment";
import { useSelector } from "react-redux";
import { formatCurrency } from "src/helpers";
import { IAppSlice } from "src/store/slices/app-slice";
import { IReduxState } from "src/store/slices/state.interface";
import ProgressCountdown from "../ProgressCountdown";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const MarketCap: React.FC<AbstractedMetricProps> = props => {
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);

  const _props: MetricProps = {
    ...props,
    label: "Market Cap",
  };

  if (app.marketCap) _props.metric = formatCurrency(app.marketCap, 2);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const RebasePrice: React.FC<AbstractedMetricProps> = props => {
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);

  const _props: MetricProps = {
    ...props,
    label: "SKADI Price",
  };

  if (app.marketPrice) _props.metric = formatCurrency(app.marketPrice, 5);
  else _props.isLoading = true;

  return <Metric {..._props} />;
};

export const RebaseCountdown: React.FC<AbstractedMetricProps> = props => {
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);

  const _props: MetricProps = {
    ...props,
    label: "Next Epoch",
  };

  if (app.marketPrice) _props.metric = <ProgressCountdown base={moment().toDate()} hideBar={true} description="" />;
  else _props.isLoading = true;

  return <Metric {..._props} />;
};