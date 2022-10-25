import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: auto;
  background-color: #fff;
  display: flex;
  position: relative;

  @media (min-width: 2000px) {
    min-height: auto;
  }

  .map-mockup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    @media (max-width: 1100px) {
      width: 300px;
  }
`;

const LeftView = styled.div`
  padding: 3rem;
  width: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: red;

  img {
    max-width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.defaultTheme.primaryColorDefaultShadow};

    @media (max-width: 1100px) {
      height: auto;
    }
  }
`;
const RightView = styled.div`
  width: 50%;
  padding-right: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) =>
    theme.defaultTheme.secondaryTextColorActive};
`;

const RightViewTextWrapper = styled.div`
  // background: pink;
  height: auto;
  width: 550px;
  margin-left: 10rem;
  position: relative;

  align-items: center;
  color: ${({ theme }) => theme.defaultTheme.primaryTextColor};

  .one {
    font-size: 34px;
    padding-top: 7rem;
    line-height: 43.2px;
    // background: teal;
    @media (max-width: 1100px) {
      padding-top: 0;
    }
  }
  .two {
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
    line-height: 43.2px;
    font-size: 22px;
    padding-top: 2rem;
    padding-bottom: 8rem;
    // background: red;

    @media (max-width: 1100px) {
      padding-bottom: 4rem;
    }
  }
  .three {
    font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
    line-height: 24px;
    padding-top: 5rem;
    text-align: center;

    @media (max-width: 1100px) {
      padding-top: 0;
    }
  }
`;

const HomeMapMockup = () => {
  return (
    <Section>
      <img
        className="map-mockup"
        src="images/map-mockup.svg"
        alt="map-mockup"
      />
      <LeftView>
        <img src="/images/list-view.png" alt="list-view" />
      </LeftView>
      <RightView>
        <RightViewTextWrapper>
          <p className="one">Someone volunteers to help</p>

          <p className="two">
            After a request must have been published, it appears on the map and
            a volunteer can see it and decide to help out.
          </p>

          <p className="three">onPeeps comes with a map and grid feature</p>
        </RightViewTextWrapper>
      </RightView>
    </Section>
  );
};

export default HomeMapMockup;
