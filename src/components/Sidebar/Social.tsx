import { Link } from "@material-ui/core";
import { Icon } from "@olympusdao/component-library";
import React from "react";

const Social: React.FC = () => (
  <div className="social-row">
    <Link href="https://mayflowerfinance.gitbook.io/mayflower-finance1/" target="_blank">
      <Icon name="github" />
    </Link>
    <Link href="https://medium.com/@mayflowerfinance1" target="_blank">
      <Icon name="medium" />
    </Link>
    <Link href="https://twitter.com/MayFFinance" target="_blank">
      <Icon name="twitter" />
    </Link>
    <Link href="https://discord.gg/auSZB3nv3e" target="_blank">
      <Icon name="discord" />
    </Link>
  </div>
);

export default Social;
