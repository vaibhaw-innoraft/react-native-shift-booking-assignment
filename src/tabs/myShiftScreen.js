import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import colors from '../theme/colors';
import {APP_URL} from '../constants';
import {groupByDate} from '../utils';

const MyShiftScreen = () => {
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    fetch(APP_URL + 'shifts', {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        let activeData = res.filter(i => i.booked);
        // console.log(JSON.stringify(groupByDate('startTime', activeData)))
        setShifts(activeData);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const _handleAction = item => {
    if (item.booked) {
      cancelBooking(item);
    }
  };

  const cancelBooking = item => {
    fetch(APP_URL + 'shifts/' + item.id + '/cancel', {method: 'POST'})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };
  const _renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={styles.timeCont}>
          <Text style={styles.timeTxt}>
            {moment(item.startTime).format('HH:mm')} -{' '}
            {moment(item.endTime).format('HH:mm')}
          </Text>
          <Text style={{color: colors.colorA4, fontSize: 18}}>{item.area}</Text>
        </View>
        <TouchableOpacity
          onPress={() => _handleAction(item)}
          disabled={moment(item.startTime).isBefore(moment())}
          style={[
            styles.bookCont,
            {
              borderColor: moment(item.startTime).isBefore(moment())
                ? colors.colorCB
                : colors.colorFE,
            },
          ]}>
          <Text
            style={{
              color: moment(item.startTime).isBefore(moment())
                ? colors.colorCB
                : colors.colorE2,
            }}>
            {'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={shifts}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{height: 2}} />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  timeCont: {
    flex: 1,
    alignItems: 'flex-start',
  },
  timeTxt: {
    fontSize: 18,
    fontWeight: '500',
  },
  status: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bookCont: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
});
export default MyShiftScreen;
