import { Metric } from "@olympusdao/component-library";
import { formatCurrency } from "src/helpers";
import { usePresalePayement } from "./hooks/usePresalePayements";

type MetricProps = PropsOf<typeof Metric>;
type AbstractedMetricProps = Omit<MetricProps, "metric" | "label" | "tooltip" | "isLoading">;

export const HardCap: React.FC<AbstractedMetricProps> = props => {
  const { data: presalePayement } = usePresalePayement();

  const _props: MetricProps = {
    ...props,
    label: "Hardcap",
  };

  if (presalePayement) _props.metric = `${formatCurrency(260000)}`;
  else _props.isLoading = true;

  return <Metric {...props} />;
};


export const PresalePayement: React.FC<AbstractedMetricProps> = props => {
  const { data: presalePayement } = usePresalePayement();

  const _props: MetricProps = {
    ...props,
    label: "Current Payement",
  };
  if (presalePayement) _props.metric = `${presalePayement} CRO`;
  else _props.isLoading = true;

  return <Metric {...props} />;
};

export const SoftCap: React.FC<AbstractedMetricProps> = props => {
  const { data: presalePayement } = usePresalePayement();

  const _props: MetricProps = {
    ...props,
    label: "Softcap",
  };

  if (presalePayement) _props.metric = `${formatCurrency(95000)}`;
  else _props.isLoading = true;

  return <Metric {...props} />;
};


