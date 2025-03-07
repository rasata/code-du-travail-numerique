import {
  Accordion as RootAccordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from "@maxgfr/react-accessible-accordion";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { fadeIn } from "../../../keyframes.js";
import {
  animations,
  box,
  breakpoints,
  fonts,
  spacings,
} from "../../../theme.js";
import { VerticalArrow } from "../VerticalArrow";

export const Accordion = RootAccordion;
export const Item = styled(({ ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { index, isLast, ...cleanAccordionItemProps } = props;
  return <AccordionItem {...cleanAccordionItemProps} />;
})`
  ${({ index, theme }) =>
    index > 0 &&
    css`
      border-top: ${box.border(theme.border)};
    `}
`;

export const ItemPanel = styled(AccordionItemPanel)`
  padding: ${spacings.base};
  animation: ${fadeIn} ${animations.transitionTiming} ease-in;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.small} 0;
  }
`;

export const ItemButton = ({ children, disableStyles = false }) => (
  <StyledAccordionItemButton>
    <VerticalArrow aria-hidden="true" />
    <ButtonText disableStyles={disableStyles}>{children}</ButtonText>
  </StyledAccordionItemButton>
);

ItemButton.propTypes = {
  children: PropTypes.node.isRequired,
  disableStyles: PropTypes.bool,
};

const StyledAccordionItemButton = styled(AccordionItemButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus,
  &:focus-within,
  &[aria-expanded="true"] {
    color: ${({ theme }) => theme.paragraph};
  }
`;

// eslint-disable-next-line no-unused-vars
const ButtonText = styled(({ disableStyles, ...props }) => <div {...props} />)`
  margin: ${spacings.medium} 0 ${spacings.medium} ${spacings.small};
  color: ${({ theme }) => theme.title};
  ${({ disableStyles }) =>
    !disableStyles &&
    `
      font-weight: 600;
      font-size: ${fonts.sizes.headings.small};
  `}
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
