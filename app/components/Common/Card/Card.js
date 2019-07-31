import React from 'react';
import { useTheme } from '@material-ui/styles';

const Card = props => {
  const theme = useTheme();
  return (
    <div style={props.style} css={`
    display: block;
    width: 100%;
    height: 200px;
    background: var(--shade9);
    color: var(--shade0);
    border-radius: 4px;
    flex-grow: 1;
  `}>
      <div css={`
        width: 100%;
        border-radius: 4px;
        background: ${theme.palette.primary.main};
        height: 33px;
        line-height: 33px;
        text-align: center;
      `}>{props.title || 'Hello'}</div>
      <div css={`padding: 10px;`}>{props.children}</div>
    </div>
  );
};

export default Card;
