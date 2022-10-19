import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.defaultTheme.primaryHoverColor};

  padding: 0 3rem;
  width: 100%;
  height: 300px;
`;

const FooterContainer = styled.div`
  // background-color: red;
  width: 100%;
  display: flex;
  height: 220px;
  padding-top: 3rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 0;

  &:first-child {
    // background-color: pink;
  }
  &:nth-child(2) {
    background-color: purple;
  }
  &:nth-child(3) {
    background-color: orange;
  }
  &:nth-child(4) {
    background-color: green;
  }
  &:last-child {
    background-color: blue;
  }
`;

const FooterListItem = styled.li`
  list-style: none;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterList>
          <FooterListItem>
            <img src="images/logo-white.svg" alt="footer-logo" />
          </FooterListItem>
        </FooterList>
        <FooterList>2</FooterList>
        <FooterList>3</FooterList>
        <FooterList>4</FooterList>
        <FooterList>5</FooterList>
      </FooterContainer>
      <div>2</div>
    </FooterWrapper>
  );
};

export default Footer;
