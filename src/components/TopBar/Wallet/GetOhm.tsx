import { Fade, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FC } from "react";

const useStyles = makeStyles<Theme>(() => ({
  title: {
    lineHeight: "24px",
    fontWeight: 600,
    marginBottom: "12px",
    marginTop: "30px",
  },
}));

/**
 * Component for Displaying GetOhm
 */
const GetOhm: FC = () => {
  return (
    <Fade in={true}>
      <p>nebe</p>
    </Fade>
  );
};

export default GetOhm;
