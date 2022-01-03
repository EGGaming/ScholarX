import styled, { css } from 'styled-components/native';

const Loader = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.palette.primary.dark,
}))``;

export default Loader;
