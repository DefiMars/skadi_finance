import { Link } from "@material-ui/core";
import { Icon } from "@olympusdao/component-library";
import React from "react";

const Social: React.FC = () => (
  <div className="social-row">
    <Link href="https://github.com/skadi-finance" target="_blank">
      <Icon name="github" />
    </Link>
    <Link href="https://medium.com/@skadifinanceavax" target="_blank">
      <Icon name="medium" />
    </Link>
    <Link href="https://twitter.com/Skadi_Finance" target="_blank">
      <Icon name="twitter" />
    </Link>
    <Link href="https://discord.gg/5z8ng8Yyjy" target="_blank">
      <Icon name="discord" />
    </Link>
  </div>
);

export default Social;
