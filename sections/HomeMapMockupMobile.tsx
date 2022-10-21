import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: teal;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MapMockupTextWrapper = styled.div`
  background: ${({ theme }) => theme.defaultTheme.secondaryTextColorActive};
  flex: 1 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 3rem;
`;

const TextContainer = styled.div`
  width: 700px;
  text-align: center;
  margin: 0 auto;
`;

const BigText = styled.p`
  font-size: 36px;
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightBold};
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  color: #fff;
`;

const SmallText = styled.p`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  color: #fff;
`;

const MapMockupImgWrapper = styled.div`
  background: #f4f1e8;
  flex: 1 1 0;
  position: relative;
  height: 1000px;
  margin-top: -1rem;

  img {
    position: absolute;
    // display: none;
    top: 130%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    border-radius: 10px;
  }
`;

const HomeMapMockupMobile = () => {
  return (
    <Section>
      <MapMockupTextWrapper>
        <TextContainer>
          <BigText>Someone Volunteers to help</BigText>
          <SmallText>
            After a request must have been published, it appears on other peeps
            feed and you get help from anyone that choose to volunteer.
          </SmallText>
        </TextContainer>
      </MapMockupTextWrapper>
      <MapMockupImgWrapper>
        <img src="images/list-view.png" alt="map mockup" />
      </MapMockupImgWrapper>
    </Section>
  );
};

export default HomeMapMockupMobile;
