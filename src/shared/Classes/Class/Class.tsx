import Card from '@components/Card/Card';
import Flex from '@components/Flex/Flex';
import IconButton from '@components/IconButton/IconButton';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import React from 'react';
import Icon from '@components/Icon/Icon';
import Button from '@components/Button/Button';
import { ClassProps } from './Class.types';
import { useAppTheme } from '@theme/core';
import { Linking, ToastAndroid, TouchableNativeFeedback } from 'react-native';
import Divider from '@components/Divider/Divider';
import { TypographyColors } from '@theme/core.types';
import { ClassContainer, ClassInfoContainer, GradeSymbolContainer } from './Class.base';
import { ButtonBase, NativeButtonBase } from '@components/Button/Button.base';
import { HoldItem } from 'react-native-hold-menu';
import { MenuItemProps } from 'react-native-hold-menu/lib/typescript/components/menu/types';
import * as Clipboard from 'expo-clipboard';
import { useRootNavigation } from '@navigators/Root/Root';
import useGradeColor from '@utilities/useGradeColor';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Class: React.FC<ClassProps> = (props) => {
  const theme = useAppTheme();
  const navigation = useRootNavigation();
  const { classInfo } = props;
  const opacity = useSharedValue(0);
  React.useEffect(() => {
    opacity.value = withSpring(1);
  }, []);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  function handleEmail() {
    Linking.openURL(`mailto:${classInfo.staff.email}`);
  }
  function handleCopyToClipboard() {
    Clipboard.setString(classInfo.staff.email);
    ToastAndroid.showWithGravity(`Copied to clipboard.`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  }

  const gradeColor = useGradeColor(classInfo.marks[0].calculatedScore.string);

  const menuItems: MenuItemProps[] = React.useMemo(
    () => [
      { text: 'Actions', isTitle: true, withSeparator: true },
      { text: `Email`, icon: 'mail', onPress: handleEmail },
      { text: `Copy`, icon: 'copy', onPress: handleCopyToClipboard },
    ],
    [classInfo.staff.name, handleEmail, handleCopyToClipboard]
  );

  function moreInfo() {
    navigation.navigate('ClassViewer', { class: classInfo });
  }

  return (
    <NativeButtonBase onPress={moreInfo}>
      <ClassContainer style={style}>
        <Space spacing={1}>
          <GradeSymbolContainer>
            <Typography
              variant={classInfo.marks[0].calculatedScore.string !== 'N/A' ? 'h1' : 'h2'}
              bold={classInfo.marks[0].calculatedScore.string !== 'N/A'}
              color={gradeColor}>
              {classInfo.marks[0].calculatedScore.string}
            </Typography>
            <Typography variant='body2' bold color='textSecondary'>
              ({classInfo.marks[0].calculatedScore.raw})
            </Typography>
          </GradeSymbolContainer>
          <ClassInfoContainer>
            <Typography bold numberOfLines={1}>
              {classInfo.title}
            </Typography>

            <Space spacing={0.5} alignItems='center'>
              <Typography variant='body2' color='textSecondary'>
                {classInfo.staff.name}
              </Typography>
              <HoldItem items={menuItems}>
                <IconButton icon={<Icon bundle='Feather' name='mail' />} onPress={handleEmail} />
              </HoldItem>
            </Space>
          </ClassInfoContainer>
        </Space>
      </ClassContainer>
    </NativeButtonBase>
  );
};

export default React.memo(Class);
