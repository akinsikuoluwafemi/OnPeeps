export interface MyContactFormValues {
  email: string;
  name: string;
  message: string;
}
export interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  file: File | any;
  confirm_password: "";
  cell_phone: "";
  created_at: "";
  updated_at: "";
  verified: false;
  id: 0;
}

export type SignInformValues = Omit<
  SignupFormValues,
  | "username"
  | "confirm_password"
  | "file"
  | "cell_phone"
  | "created_at"
  | "updated_at"
  | "verified"
  | "id"
  | "verified"
>;
