import styled, { keyframes } from "styled-components";

export const FormSection = styled.section`
  min-height: 100vh;
  background-color: #fff;
  // margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  // width: 100vw;

  @media (min-width: 1500px) {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    margin: 3rem auto;
    padding: 2rem 0;
    width: 100vw;
  }

  @media (max-width: 425px) {
    width: auto;
  }

  .&copy {
    text-align: center;
  }
`;

export const FormContainer = styled.div`
  width: 550px;
  min-height: auto;
  background-color: #fbf9f6;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 2rem;
  // display: flex;
  // flex-direction: column;
  padding-bottom: 2rem;

  .input {
    margin-top: 1rem;
    margin-bottom: 0.2rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid
      ${({ theme }) =>
        theme.bdclr
          ? theme.bdclr
          : theme.defaultTheme.secondaryTextColorDefault};
    width: 100%;
    font-size: 1rem;

    &:focus {
      outline: none;
      border: 1px solid
        ${({ theme }) =>
          theme.bdclr ? theme.bdclr : theme.defaultTheme.primaryDefaultColor};

      // box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
      transition: all 0.3s ease-in-out;
    }

    &::placeholder {
      color: #95a9c6;
      font-size: 0.8rem;
      font-weight: 300;
      transition: all 0.3s ease-in-out;
    }
  }
`;

export const FormTextHeader = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding-top: 2rem;
  padding-left: 2rem;
  padding-bottom: 1rem;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightMedium};
  font-size: 28px;
`;

export const FormTextHeaderSmall = styled.p`
  color: ${({ theme }) => theme.defaultTheme.primaryDefaultColor};
  padding-left: 2rem;
  font-weight: ${({ theme }) => theme.defaultTheme.fontWeightLight};
  padding-bottom: 1rem;
  a {
    color: #ffaa05;
    font-weight: 500;
  }
`;

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
  
`;

export const FormWrapper = styled.form`
  padding-left: 2rem;
  padding-right: 2rem;
  // text-align: center;

  width: 100%;
  // background-color: red;
  //   min-height: 400px;

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }

  small {
    font-size: 0.7rem;
    font-weight: 300;
    margin-bottom: 0.5rem;
    text-align: left !important;
  }

  .upload-wrapper {
    margin-top: 2rem;
  }

  .signup-btn {
    width: 300px;
    margin-top: 2rem;

    span {
      animation-name: ${Spinner};
      animation-duration: 5000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .guidelines {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .guidelines-text {
      margin: 0;
      font-size: 0.8rem;

      a {
        color: #ffaa05;
        font-weight: 500;
      }
    }
  }
`;

export const BtnWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

export const InputWrapper = styled.div`
  position: relative;

  .icon {
    position: absolute;
    left: 88%;
    top: 45%;
    bottom: 0;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;
