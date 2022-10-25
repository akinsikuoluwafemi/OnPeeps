import styled from "styled-components";

interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary";
  width?: string;
  rounded?: boolean;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  padding: 13px 25px;
  width: 150px;
  border-radius: 12px;
  background: ${({ theme, variant }) =>
    variant === "primary"
      ? `${theme.defaultTheme.primaryDefaultColor}`
      : `transparent`};
  color: ${({ theme, variant }) =>
    variant === "primary"
      ? `${theme.defaultTheme.primaryTextColor}`
      : `${theme.defaultTheme.primaryDefaultColor}`};
  box-shadow: none;
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "primary"
        ? `transparent`
        : `${theme.defaultTheme.primaryDefaultColor}`};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "primary" ? `${theme.defaultTheme.primaryHoverColor}` : ``};
    color: ${({ theme, variant }) => (variant === "primary" ? `` : `#fff`)};
    border: 1px solid
      ${({ theme, variant }) =>
        variant === "primary"
          ? ``
          : `${theme.defaultTheme.secondaryTextColorHover}`};
  }

  &:active {
    background: ${({ theme, variant }) =>
      variant === "primary" ? `${theme.defaultTheme.primaryActiveColor}` : ``};
    color: ${({ theme, variant }) =>
      variant === "primary"
        ? ``
        : `${theme.defaultTheme.secondaryTextColorActive}`};
    border: 1px solid
      ${({ theme, variant }) =>
        variant === "primary"
          ? ``
          : `${theme.defaultTheme.secondaryTextColorActive}`};
  }

  &:disabled {
    background: ${({ theme, variant }) =>
      variant === "primary"
        ? `${theme.defaultTheme.primaryDisabledColor}`
        : `${theme.defaultTheme.secondaryTextColorDisabled}`};

    color: ${({ theme, variant }) =>
      variant === "primary"
        ? ``
        : `${theme.defaultTheme.secondaryTextColorHover}`};

    border: ${({ theme, variant }) =>
      variant === "primary"
        ? ``
        : `${theme.defaultTheme.secondaryTextColorDisabled}`};

    cursor: not-allowed;
  }

  ${({ variant }) =>
    variant === "tertiary" &&
    `
    border: 1px solid transparent;
  cursor: pointer;
  border-radius: 12px;
  width: fit-content;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;

    `}

  &:hover {
    background-color: ${({ theme }) => theme.defaultTheme.primaryHoverColor};
  }
`;

export default Button;
