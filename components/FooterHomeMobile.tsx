import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background-color: ${({ theme }) => theme.defaultTheme.primaryHoverColor};
  min-height: 400px;
  width: 100%;
  padding: 3rem;
  margin-top: 15rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 562px) {
    padding: 3rem 2rem;
    margin-top: 10rem;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > .icons {
    background-color: #8d9bbc;
    gap: 1rem;
    border-radius: 10px;
    padding: 0.5rem;
    margin-right: 1rem;
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
  margin-bottom: 2rem;

  & > .onpeeps-logo {
    width: 200px;
    height: auto;
    margin-left: -1.5rem;
  }

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

const FooterHomeMobile = () => {
  return (
    <Section>
      <FooterList>
        <FooterListItem>
          <img
            className="onpeeps-logo"
            src="images/logo-white.svg"
            alt="footer-logo"
          />
        </FooterListItem>
      </FooterList>

      <FooterList>
        <FooterListItem>
          <a className="header">Learn More</a>
          <a className="list-item">How OnPeeps Works</a>
          <a className="list-item">Why OnPeeps</a>
          <a className="list-item">Pricing</a>
        </FooterListItem>
      </FooterList>

      <FooterList>
        <FooterListItem>
          <a className="header">Fundraise for</a>
          <a className="list-item">Medical</a>
          <a className="list-item">Emergency</a>
          <a className="list-item">Education</a>
        </FooterListItem>
      </FooterList>

      <FooterList>
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
    </Section>
  );
};

export default FooterHomeMobile;
