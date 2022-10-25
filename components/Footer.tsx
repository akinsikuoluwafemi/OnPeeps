import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.defaultTheme.primaryHoverColor};
  padding: 1rem 3rem;
  width: 100%;
  min-height: 320px;
  margin-top: 15rem;

  @media (max-width: 768px) {
    margin-top: 10rem;
  }

  .hr {
    width: 80%;
    margin: auto;
    color: #d2d7e4;
    opacity: 0.6;
  }

  .copy {
    color: #fff;
    text-align: center;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  }
`;

const FooterContainer = styled.div`
  // background-color: red;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 220px;
  padding-top: 3rem;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &:first-child {
    // background-color: pink;
    flex: 1 1 0;
  }
  &:nth-child(2) {
    // background-color: purple;
    flex: 3 1 0;
    justify-content: space-around;
    align-items: flex-start;
    display: flex;
  }

  &:last-child {
    // background-color: blue;
    flex: 1 1 0;
    gap: 1rem;
  }

  & > .icons {
    background-color: #8d9bbc;
    gap: 1rem;
    border-radius: 10px;
    padding: 0.5rem;
    width: 40px;
  }
`;

const FooterListItem = styled.li`
  list-style: none;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  flex-direction: column;

  & > a {
    cursor: pointer;
  }

  a.header {
    font-weight: 500;
    text-transform: uppercase;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 1.5rem;
  }

  a.list-item {
    margin-bottom: 0.5rem;
  }
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

        <FooterList className="list-item-center">
          <FooterListItem>
            <a className="header">Fundraise for</a>
            <a className="list-item">Medical</a>
            <a className="list-item">Emergency</a>
            <a className="list-item">Education</a>
          </FooterListItem>
          <FooterListItem>
            <a className="header">Learn More</a>
            <a className="list-item">How OnPeeps Works</a>
            <a className="list-item">Why OnPeeps</a>
            <a className="list-item">Pricing</a>
          </FooterListItem>

          <FooterListItem>
            <a className="header">Resources</a>
            <a className="list-item">Blog</a>
            <a className="list-item">Careers</a>
            <a className="list-item">About</a>
          </FooterListItem>
        </FooterList>

        <FooterList>
          <img className="icons" src="images/icons/fb.svg" alt="facebook" />
          <img className="icons" src="images/icons/insta.svg" alt="instagram" />
          <img className="icons" src="images/icons/twitter.svg" alt="twitter" />
        </FooterList>
      </FooterContainer>
      <div>
        <hr className="hr" />
        <p className="copy">
          &copy; {new Date(Date.now()).getFullYear()} OnPeeps. All rights
          reserved.
        </p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
