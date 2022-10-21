import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: #fff;
  //   height: 100vh;
  padding: 0 3rem;
  padding-top: 25rem;
  margin-top: -1rem;
`;

const InnerSection = styled.div`
  height: 100vh;
  background: red;
`;

const HomeVideoMockupMobile = () => {
  return (
    <Section>
      <InnerSection>HomeVideoMockupMobile</InnerSection>
    </Section>
  );
};

export default HomeVideoMockupMobile;
