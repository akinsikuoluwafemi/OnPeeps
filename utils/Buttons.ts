import styled from "styled-components";

interface ButtonProps {
  variant: "primary" | "secondary";
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
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "primary" ? `${theme.defaultTheme.primaryHoverColor}` : ``};
    color: ${({ theme, variant }) =>
      variant === "primary"
        ? ``
        : `${theme.defaultTheme.secondaryTextColorHover}`};
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
`;

export default Button;
