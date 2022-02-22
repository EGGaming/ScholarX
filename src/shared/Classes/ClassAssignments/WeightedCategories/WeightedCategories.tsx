import Button from '@components/Button/Button';
import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Flex from '@components/Flex/Flex';
import Icon from '@components/Icon/Icon';
import IconButton from '@components/IconButton/IconButton';
import Paper from '@components/Paper/Paper';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { WeightedCategoriesProps } from '@shared/Classes/ClassAssignments/WeightedCategories/WeightedCategories.types';
import { useAppTheme } from '@theme/core';
import _ from 'lodash';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart, PieChart, StackedBarChart } from 'react-native-chart-kit';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const WeightedCategories: React.FC<WeightedCategoriesProps> = (props) => {
  const { summary } = props;
  const opacity = useSharedValue(0);
  const yOffset = useSharedValue(-10);
  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    yOffset.value = withTiming(0, { duration: 400 });
  }, []);
  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: yOffset.value }],
  }));
  const paperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: yOffset.value }],
    borderRadius: 24,
  }));
  const sortedSummary = _.sortBy(summary, [(e) => parseFloat(e.weight.percentage.potential)]);
  const theme = useAppTheme();
  const colorOne = theme.palette.primary.main;
  const colorTwo = theme.palette.secondary.main;
  const [hide, setHide] = React.useState<boolean>(false);
  function handleOnPress() {
    setHide((hide) => !hide);
  }
  return (
    <Animated.View style={style}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Typography>Category Weighing</Typography>
        <Button
          title='View'
          size='small'
          onPress={handleOnPress}
          icon={<Icon bundle='Feather' name='chevron-right' />}
          iconPlacement='right'
        />
      </Flex>
      {/* <Space spacing={1} direction='vertical'>
        <Flex justifyContent='space-between'>
          <Typography>Category Weighing</Typography>
          <IconButton icon={<Icon bundle='Feather' name='chevron-right' />} onPress={handleOnPress} />
        </Flex>

        <Paper animated style={paperStyle}>
          <View
            style={{
              paddingTop: 24,
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.borderRadius,
            }}
          />

          <Flex direction='column'>
            <StackedBarChart
              data={{
                labels: sortedSummary.map((weighted) => weighted.type),
                legend: ['Current points', 'Available points'],
                data: sortedSummary.map((weighted) => [
                  parseInt(weighted.weight.percentage.current),
                  parseInt(weighted.weight.percentage.potential) - parseInt(weighted.weight.percentage.current),
                ]),
                barColors: [colorOne, colorTwo],
              }}
              width={Dimensions.get('window').width - 48}
              height={Dimensions.get('window').height * 0.3}
              hideLegend
              decimalPlaces={0}
              yAxisSuffix='%'
              segments={5}
              chartConfig={{
                backgroundColor: theme.palette.primary.main,
                backgroundGradientFrom: theme.palette.background.default,
                backgroundGradientTo: theme.palette.background.default,
                color: (opacity = 1) =>
                  theme.mode === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => theme.palette.text.secondary,
              }}
              xLabelsOffset={5}
            />
            <Space spacing={1} direction='vertical' container>
              <Space spacing={1} alignItems='center'>
                <View style={{ backgroundColor: colorOne, width: 16, height: 16 }} />
                <Typography variant='caption' color='textSecondary'>
                  % earned
                </Typography>
              </Space>
              <Space spacing={1} alignItems='center'>
                <View style={{ backgroundColor: colorTwo, width: 16, height: 16 }} />
                <Typography variant='caption' color='textSecondary'>
                  % of grade
                </Typography>
              </Space>
            </Space>
          </Flex>
        </Paper>
      </Space> */}
    </Animated.View>
  );
};

export default React.memo(WeightedCategories);
