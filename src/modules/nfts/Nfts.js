import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {text} from '../../styles/app';
import NftCard from '../../components/widgets/NftCard';
import NftService from '../../services/NftService';

function Nfts({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [nfts, setNfts] = useState([]);

  const listNfts = useCallback(() => {
    setRefreshing(true);

    NftService.listNfts(
      {
        collection: 'PHPONG721',
        wallet_address: '0x91e0857884317E75eB4b76CE7d64872a8FaEc521',
      },
      '0x91e0857884317E75eB4b76CE7d64872a8FaEc521',
    )
      .then(response => {
        console.log(response.data[0].metadata.image);
        setNfts(response.data);
      })
      .catch(error => {})
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    listNfts();
  }, [listNfts]);

  return (
    <SafeAreaView style={styles.view.safeArea}>
      <ScrollView
        contentContainerStyle={styles.view.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={listNfts} />
        }>
        <Text style={[text.title, text.color.black]}>My NFTs</Text>
        {nfts?.map((i, iKey) => (
          <NftCard
            key={iKey}
            image={i.metadata.image}
            name={i.metadata.name}
            amount={i.amount}
            collection={i.name}
            block={i.block_number}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    safeArea: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scroll: {
      marginHorizontal: 20,
    },
  },
  card: {
    container: {
      minHeight: 128,
      marginBottom: 24,
      padding: 16,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    bgColor: {
      red: {backgroundColor: '#c10b22'},
      blue: {backgroundColor: '#1a439f'},
    },
  },
});

export default Nfts;
