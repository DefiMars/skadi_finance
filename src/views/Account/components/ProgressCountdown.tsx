import React from "react";
import styled from "styled-components";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useSelector } from "react-redux";
import { IAppSlice } from "src/store/slices/app-slice";
import { IReduxState } from "src/store/slices/state.interface";

interface ProgressCountdownProps {
  base: Date;
  hideBar?: boolean;
  description: string;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ base, hideBar, description }) => {
  const app = useSelector<IReduxState, IAppSlice>(state => state.app);
  const deadline = new Date(app.nextRebase * 1000);

  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {h.padStart(2, "0")}:{m.padStart(2, "0")}:{s.padStart(2, "0")}
      </StyledCountdown>
    );
  };
  return (
    // <Card>
    <StyledCardContentInner>
      <StyledDesc>{description}</StyledDesc>
      <Countdown key={new Date().getTime()} date={deadline} renderer={countdownRenderer} />
    </StyledCardContentInner>
    // </Card>
  );
};

const StyledDesc = styled.h6`
  font-size: 1rem;
  font-family: Square;
  font-weight: 500;
  color: #676b74;
  margin: 0 0 0 0;
  line-height: 1.6;
  direction: inherit;
`;

const StyledCountdown = styled.h5`
  font-size: 1.3118rem;
  font-family: Square;
  font-weight: bold;
  margin: 0 0 0 0;
  line-height: 1.334;
  letter-spacing: 0.4px;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ProgressCountdown;
