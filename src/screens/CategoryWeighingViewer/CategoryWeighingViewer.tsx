import Card from '@components/Card/Card';
import Container from '@components/Container/Container';
import Divider from '@components/Divider/Divider';
import Flex from '@components/Flex/Flex';
import Paper from '@components/Paper/Paper';
import Space from '@components/Space/Space';
import Typography from '@components/Typography/Typography';
import { useGradebook } from '@context/GradebookContext/GradebookContext';
import { RootStackParamList } from '@navigators/Root/Root.types';
import { StackHeaderProps, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import Header from '@shared/@react-navigation/Header';
import { useAppTheme } from '@theme/core';
import useCardAnimation from '@utilities/useCardAnimation';
import _ from 'lodash';
import React from 'react';
import { Animated as ReactAnimated, Dimensions, View } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import Animated from 'react-native-reanimated';
import {
  CollapsibleSubHeaderAnimator,
  useCollapsibleHeader,
  UseCollapsibleOptions,
} from 'react-navigation-collapsible';

const CategoryWeighingViewer: React.FC<StackScreenProps<RootStackParamList, 'CategoryWeighingViewer'>> = (props) => {
  const {
    navigation,
    route: {
      params: { summary },
    },
  } = props;
  const options: UseCollapsibleOptions = {
    navigationOptions: {
      header: (props: JSX.IntrinsicAttributes & StackHeaderProps) => <Header {...props} />,
      headerTitle: '',
    },
  };
  const theme = useAppTheme();
  const { onScroll, containerPaddingTop, scrollIndicatorInsetTop, translateY } = useCollapsibleHeader(options);
  const [gradebook] = useGradebook();
  const sortedSummary = _.sortBy(summary, [(e) => parseFloat(e.weight.percentage.potential)]);
  const colorOne = theme.palette.primary.main;
  const colorTwo = theme.palette.secondary.main;
  return (
    <>
      <ReactAnimated.ScrollView
        contentContainerStyle={{ paddingTop: containerPaddingTop }}
        scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
        onScroll={onScroll}>
        <Space direction='vertical' spacing={1}>
          <Container header>
            <Typography variant='h3' align='center'>
              Category Weighing
            </Typography>
            <Typography color='textSecondary' align='center'>
              {gradebook?.currentPeriod.name}
            </Typography>
          </Container>
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
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.5}
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
            <Flex justifyContent='space-evenly' alignItems='center' container containerProps={{ header: true }}>
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
            </Flex>
          </Flex>
          <Divider />
          <Space spacing={1} direction='vertical' container>
            {sortedSummary
              .filter((t) => t.type !== 'TOTAL')
              .map((weighted) => (
                <Card key={weighted.type}>
                  <Typography>{weighted.type}</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    % of grade: {weighted.weight.percentage.potential}
                  </Typography>
                </Card>
              ))}
          </Space>
        </Space>
      </ReactAnimated.ScrollView>
    </>
  );
};

export default CategoryWeighingViewer;
