import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useAppTheme } from '@theme/core';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import {
  ChipBaseContainer,
  ChipBaseText,
  ChipBaseFeedbackContainer,
  ChipBaseButtonRemoveContainer,
  ChipBaseButtonBaseRemoveContainer,
} from './Chip.base';
import { ChipProps } from './Chip.types';

const Chip: React.FC<ChipProps> = (props) => {
  const {
    onPress,
    title,
    color = 'primary',
    hexColor = '',
    onRemove,
    variant = 'outlined',
    disabled = false,
    visible,
  } = props;
  const theme = useAppTheme();
  const [done, setIsDone] = React.useState<boolean>(false);
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible === true) {
      setIsDone(false);
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 200 });
    } else if (visible === false) {
      scale.value = withSpring(0, undefined, setIsDone);
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (visible != null) {
    if (done) return null;
    return (
      <>
        <ChipBaseFeedbackContainer style={animatedStyles}>
          {onPress ? (
            <ButtonBase round color={color} hexColor={hexColor} onPress={onPress}>
              <ChipBaseContainer color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
                <Space spacing={1} justifyContent='space-between' alignItems='center'>
                  <ChipBaseText color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
                    {title}
                  </ChipBaseText>
                  {onRemove && (
                    <ChipBaseButtonRemoveContainer>
                      <NativeButtonBase round onPress={onRemove}>
                        <ChipBaseButtonBaseRemoveContainer
                          color={color}
                          hexColor={hexColor}
                          variant={variant}
                          disabled={disabled}>
                          <Icon
                            bundle='AntDesign'
                            name='close'
                            color='inherit'
                            size='small'
                            hexColor={
                              variant === 'contained'
                                ? theme.palette.getContrastText(theme.palette.toColorValue(color))
                                : theme.palette.toColorValue(color)
                            }
                          />
                        </ChipBaseButtonBaseRemoveContainer>
                      </NativeButtonBase>
                    </ChipBaseButtonRemoveContainer>
                  )}
                </Space>
              </ChipBaseContainer>
            </ButtonBase>
          ) : (
            <ChipBaseContainer color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
              <Space spacing={1} justifyContent='space-between' alignItems='center'>
                <ChipBaseText color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
                  {title}
                </ChipBaseText>
                {onRemove && (
                  <ChipBaseButtonRemoveContainer>
                    <NativeButtonBase round onPress={onRemove}>
                      <ChipBaseButtonBaseRemoveContainer
                        color={color}
                        hexColor={hexColor}
                        variant={variant}
                        disabled={disabled}>
                        <Icon
                          bundle='AntDesign'
                          name='close'
                          color='inherit'
                          size='small'
                          hexColor={
                            variant === 'contained'
                              ? theme.palette.getContrastText(theme.palette.toColorValue(color))
                              : theme.palette.toColorValue(color)
                          }
                        />
                      </ChipBaseButtonBaseRemoveContainer>
                    </NativeButtonBase>
                  </ChipBaseButtonRemoveContainer>
                )}
              </Space>
            </ChipBaseContainer>
          )}
        </ChipBaseFeedbackContainer>
      </>
    );
  }

  return (
    <>
      <ChipBaseFeedbackContainer>
        {onPress ? (
          <ButtonBase round color={color} hexColor={hexColor} onPress={onPress}>
            <ChipBaseContainer color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
              <Space spacing={1} justifyContent='space-between' alignItems='center'>
                <ChipBaseText color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
                  {title}
                </ChipBaseText>
                {onRemove && (
                  <ChipBaseButtonRemoveContainer>
                    <NativeButtonBase round onPress={onRemove}>
                      <ChipBaseButtonBaseRemoveContainer
                        color={color}
                        hexColor={hexColor}
                        variant={variant}
                        disabled={disabled}>
                        <Icon
                          bundle='AntDesign'
                          name='close'
                          color='inherit'
                          size='small'
                          hexColor={
                            variant === 'contained'
                              ? theme.palette.getContrastText(theme.palette.toColorValue(color))
                              : theme.palette.toColorValue(color)
                          }
                        />
                      </ChipBaseButtonBaseRemoveContainer>
                    </NativeButtonBase>
                  </ChipBaseButtonRemoveContainer>
                )}
              </Space>
            </ChipBaseContainer>
          </ButtonBase>
        ) : (
          <ChipBaseContainer color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
            <Space spacing={1} justifyContent='space-between' alignItems='center'>
              <ChipBaseText color={color} hexColor={hexColor} variant={variant} disabled={disabled}>
                {title}
              </ChipBaseText>
              {onRemove && (
                <ChipBaseButtonRemoveContainer>
                  <NativeButtonBase round onPress={onRemove}>
                    <ChipBaseButtonBaseRemoveContainer
                      color={color}
                      hexColor={hexColor}
                      variant={variant}
                      disabled={disabled}>
                      <Icon
                        bundle='AntDesign'
                        name='close'
                        color='inherit'
                        size='small'
                        hexColor={
                          variant === 'contained'
                            ? theme.palette.getContrastText(theme.palette.toColorValue(color))
                            : theme.palette.toColorValue(color)
                        }
                      />
                    </ChipBaseButtonBaseRemoveContainer>
                  </NativeButtonBase>
                </ChipBaseButtonRemoveContainer>
              )}
            </Space>
          </ChipBaseContainer>
        )}
      </ChipBaseFeedbackContainer>
    </>
  );
};

export default Chip;
