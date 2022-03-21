export interface AvatarBaseProps extends Required<AvatarProps> {
  base64: string;
}

export interface AvatarProps {
  size?: 'small' | 'large' | 'medium';
}
