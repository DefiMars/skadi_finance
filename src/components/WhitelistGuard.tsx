import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { IPresaleSlice } from "src/store/slices/presale-slice";
import { IReduxState } from "src/store/slices/state.interface";

export const WhitelistGuard: React.FC<{ message: string }> = props => {
  const presale = useSelector<IReduxState, IPresaleSlice>(state => state.presale);

  if (presale.wlTier === 0)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6">{props.message}</Typography>
        </Box>
      </Box>
    );

  return <>{props.children}</>;
};
