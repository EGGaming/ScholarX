export interface PasswordFieldProps {
  passwordError: string;
  password: string;
  hidePassword: boolean;
  toggleHidePassword: () => void;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}
