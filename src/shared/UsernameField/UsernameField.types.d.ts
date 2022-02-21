export interface UsernameFieldProps {
  onUsernameSubmit: () => void;
  usernameError: string;
  username: string;
  onChangeText: (text: string) => void;
}
