import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Button from "../utils/Buttons";
import Link from "next/link";

const Section = styled.section`
  height: auto;
  padding: 0 3rem;
  padding-bottom: 3rem;
  display: flex;
  transition: all 0.5s ease;
  background-image: url("/images/bg-hero.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeroRight = styled(motion.div)`
  display: flex;
  min-width: 50%;
  height: 100%;
  flex-direction: column;
  // background-color: red;
`;

const container = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      type: "spring",
      duration: 1,
      delayChildren: 1.5, //2
      staggerChildren: 0.8,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const HeroRightUp = styled.div`
  flex: 1 1 auto;
  text-align: start;
  padding-top: 3rem;
  transition: ease all 0.5s;

  img {
    width: 100%;
    max-width: 350px;
    height: auto;
    transition: ease all 0.5s;
  }

  @media (max-width: 768px) {
    text-align: end;

    img {
      margin-bottom: 2rem;
      width: 100%;
      max-width: 220px;
      height: auto;
    }
  }
`;

const HeroRightDown = styled.div`
  flex: 1 1 auto;
  text-align: end;
  margin-top: -8rem;
  transition: ease all 0.5s;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
  @media (max-width: 768px) {
    text-align: start;
    // margin-top: 0;

    img {
      max-width: 350px;
    }
  }
`;

const HeroLeft = styled.div`
  padding-top: 4rem;
  // background-color: blue;
  min-width: 50%;
`;

const heroContaner = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
      delayChildren: 1, //2
      staggerChildren: 0.8,
    },
  },
};

const heroItem = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const HeroTextBig = styled(motion.h1)`
  font-size: ${({ theme }) => theme.defaultTheme.fontBig};
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  margin-bottom: 4rem;
`;

const QuoteWrapper = styled.div`
  // margin-left: 6rem;
  padding-left: 3rem;
  width: 80%;

  position: relative;
  line-height: 40.2px;
  // background: red;

  @media (max-width: 768px) {
    width: 100%;
  }

  .quote-line {
    position: absolute;
    height: 100%;
    width: 10px;
    border-radius: 10px;
    left: 0rem;
    top: 0rem;
    background: #ac5d83;
    opacity: 0.5;
  }
`;

const QuoteText = styled.p`
  font-size: ${({ theme }) => theme.defaultTheme.fontH2};
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  // line-height: 43px;
  margin-bottom: 1rem;

  span {
    transform: translateY(-100%);
    color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  // background: red;
  align-items: flex-start;
  margin-top: 4rem;
  width: 80%;
  // margin-left: 4rem;

  .m-right {
    margin-right: 4rem;
  }
`;

const HeroSection = () => {
  return (
    <Section>
      <HeroLeft>
        <HeroTextBig
          variants={heroContaner}
          initial="hidden"
          animate="show"
          // data-scroll
          // data-scroll-speed="-2"
          // data-scroll-direction="horizontal"
        >
          <motion.span variants={heroItem}>
            Lightening the burden of others.
          </motion.span>
        </HeroTextBig>

        <QuoteWrapper>
          <span className="quote-line"></span>

          <QuoteText>
            <span>
              A means of facilitating exchanged acts of kindness, we help in
              connecting people in need to willing volunteers globally.
            </span>
          </QuoteText>
        </QuoteWrapper>

        <ButtonWrapper>
          <Button className="m-right" variant="primary">
            <Link href="/signin">
              <a>&nbsp; Sign In &nbsp;</a>
            </Link>
          </Button>
          <Button variant="secondary">
            <Link href="/signin">
              <a>&nbsp; Learn More &nbsp;</a>
            </Link>
          </Button>
        </ButtonWrapper>
      </HeroLeft>
      <HeroRight variants={container} initial="hidden" animate="show">
        <HeroRightUp>
          <motion.img
            variants={item}
            // data-scroll
            // data-scroll-delay="0.1"
            // data-scroll-speed="4"
            // data-scroll-direction="horizontal"
            src="/images/Hero-right-up.svg"
            alt="hero-right-up-animation"
          />
        </HeroRightUp>
        <HeroRightDown>
          <motion.img
            variants={item}
            // data-scroll
            // data-scroll-delay="0.06"
            // data-scroll-speed="4"
            src="/images/Hero-right-down.svg"
            alt="hero-right-down-animation"
          />
        </HeroRightDown>
      </HeroRight>
    </Section>
  );
};

export default HeroSection;
