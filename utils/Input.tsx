import React, { FC, useState } from "react";
import styled from "styled-components";
// BiShowAlt;

interface InputProps {
  name: string;
  formValues: any;
  handleChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur?: () => void;
  label?: string;
  type?: string;
  placeholder: string;
  ta?: boolean;
  style?: React.CSSProperties;
  formError?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({
  name,
  formValues,
  handleChange,
  handleBlur,
  placeholder,
  style,
  className,
  type,
  ta,
}) => {
  return (
    <>
      {ta ? (
        <textarea
          className={className}
          style={style}
          name={name}
          value={formValues}
          placeholder={placeholder}
          onChange={handleChange}
          //   required
          onBlur={handleBlur}
          cols={30}
          rows={10}
        />
      ) : (
        <input
          className={className}
          name={name}
          style={style}
          value={formValues}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          //   required
        />
      )}
    </>
  );
};

export default Input;
