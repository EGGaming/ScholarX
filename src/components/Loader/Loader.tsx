import { LoaderBase } from '@components/Loader/Loader.base';
import { LoaderProps } from '@components/Loader/Loader.types';
import React from 'react';
const Loader: React.FC<LoaderProps> = (props) => <LoaderBase {...(props as any)} />;

export default Loader;
