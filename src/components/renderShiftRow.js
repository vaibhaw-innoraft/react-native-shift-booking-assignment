import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {APP_URL} from '../constants';
import colors from '../theme/colors';

const RenderShiftRow = ({data}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(data);
  const _handleAction = () => {
    if (item.booked) {
      cancelBooking(item);
    } else {
      bookShift(item);
    }
  };
  const bookShift = item => {
    setIsLoading(true);
    fetch(APP_URL + 'shifts/' + item.id + '/book', {method: 'POST'})
      .then(res => res.json())
      .then(res => setItem(res))
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  };
  const cancelBooking = item => {
    setIsLoading(true);
    fetch(APP_URL + 'shifts/' + item.id + '/cancel', {method: 'POST'})
      .then(res => res.json())
      .then(res => setItem(res))
      .catch(e => console.log(e))
      .finally(() => setIsLoading(false));
  };
  return (
    <View style={styles.row}>
      <View style={styles.timeCont}>
        <Text style={styles.timeTxt}>
          {moment(item.startTime).format('HH:mm')} -{' '}
          {moment(item.endTime).format('HH:mm')}
        </Text>
      </View>
      <View style={styles.status}>
        <Text style={{color: colors.color4F, fontWeight: '600', fontSize: 18}}>
          {item.booked ? 'Booked' : ''}
        </Text>
      </View>
      <TouchableOpacity
        onPress={_handleAction}
        disabled={moment(item.startTime).isBefore(moment())}
        style={[
          styles.bookCont,
          {
            borderColor: moment(item.startTime).isBefore(moment())
              ? colors.colorCB
              : item.booked
              ? colors.colorFE
              : colors.color55,
          },
        ]}>
        {isLoading ? (
          <ActivityIndicator
            color={item.booked ? colors.colorFE : colors.color55}
          />
        ) : (
          <Text
            style={
              moment(item.startTime).isBefore(moment())
                ? styles.past
                : item.booked
                ? styles.booked
                : styles.available
            }>
            {item.booked ? 'Cancel' : 'Book'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  timeCont: {
    flex: 1,
    alignItems: 'center',
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
  booked: {color: colors.colorE2, fontWeight: '600', fontSize: 18},
  available: {color: colors.color16, fontWeight: '600', fontSize: 18},
  past: {color: colors.colorCB, fontWeight: '600', fontSize: 18},
  bookCont: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
});
export default RenderShiftRow;
