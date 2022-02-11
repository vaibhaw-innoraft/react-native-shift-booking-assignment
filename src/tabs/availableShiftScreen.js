import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {APP_URL} from '../constants';
import {dateToFromNowDaily, groupBy, groupByDate} from '../utils';
import colors from '../theme/colors';
import RenderShiftRow from '../components/renderShiftRow';

const AvailableShiftScreen = () => {
  const [shifts, setShifts] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    fetch(APP_URL + 'shifts', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        var groupedData = groupBy('area', res);
        var newData = groupedData.map(gr => {
          var unSorted = groupByDate('startTime', gr.shifts);
          // console.log(JSON.stringify(unSorted));
          // var sorted = unSorted.sort((a,b) => a.startTime - b.startTime);
          // console.log(JSON.stringify(sorted));
          return {area: gr.area, shifts: unSorted};
        });
        setShifts(newData);
        setActiveIndex(0);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const changeIndex = index => setActiveIndex(index);

  const _renderItem = ({item}) => {
    return <RenderShiftRow data={item} />;
  };
  const _renderSection = ({item}) => {
    const sorted = item?.data.sort((a, b)=> {
      if (a.startTime === b.startTime){
        return a.endTime < b.endTime ? -1 : 1
      } else {
        return a.startTime < b.startTime ? -1 : 1
      }
    });
    return (
      <View>
        <View style={styles.sectionTitleCont}>
          <Text style={styles.sectionTitleTxt}>
            {dateToFromNowDaily(item.title)}
          </Text>
        </View>
        <FlatList
          data={sorted}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}>
        {shifts.map((item, index) => (
          <TouchableOpacity
            key={item.area}
            style={styles.tabBtn}
            onPress={() => changeIndex(index)}>
            <Text
              style={activeIndex === index ? styles.tabActTxt : styles.tabTxt}>
              {item.area} ({item.shifts.length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={shifts[activeIndex]?.shifts}
        renderItem={_renderSection}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={() => <View style={{height: 2}} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabBtn: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  tabTxt: {
    color: colors.colorA4,
    fontSize: 17,
    fontWeight: '500',
  },
  tabActTxt: {
    fontSize: 17,
    color: colors.color04,
    fontWeight: '500',
  },
  sectionTitleCont: {
    padding: 10,
    backgroundColor: colors.colorF1,
  },
  sectionTitleTxt: {
    fontSize: 18,
    color: colors.color4F,
    fontWeight: '700',
  },
});
export default AvailableShiftScreen;
