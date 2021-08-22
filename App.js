import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text
} from 'react-native';
import { white } from 'ansi-colors';



export default function App() {

  const {width, height} = Dimensions.get('screen');
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const data = [
    'https://i.pinimg.com/564x/87/21/f7/8721f7024ba5c256cfbe8a0bd8598ee1.jpg',
    'https://i.pinimg.com/564x/1b/2d/3c/1b2d3c30e833b188685395f218c2e62b.jpg',
    'https://i.pinimg.com/564x/b9/35/24/b93524a7afc4a624d8d6ec40991fc9a1.jpg',
    'https://i.pinimg.com/564x/11/22/42/1122424fb90a12ebf23c88391e359de1.jpg',
    'https://i.pinimg.com/564x/83/31/01/833101531773756c018864a0149645c3.jpg',
    'https://i.pinimg.com/564x/bd/2e/3e/bd2e3ebc2daf3fb470a350028a2df285.jpg',
    'https://i.pinimg.com/564x/33/c9/8b/33c98be315884edab5a80e158165059e.jpg',
    'https://i.pinimg.com/564x/40/5a/06/405a06e0e56b44c29b1b1e5d22b5edd3.jpg'
];

const imageW = width * 0.7;
const imageH = height * 0.5;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
                <Text style={[styles.headertitle, {
                    color:  "rgba(255,255,255,0.5)"
                }]}>HOME
                </Text>
                <Text style={[styles.headertitle, {
                    color:  "rgba(255,255,255,0.5)"
                }]}>STORE
                </Text>
      </View >

      <View style={styles.bottomContainer}>
          <Image 
          source={{ uri : 'https://duniagames.co.id/assets/v2/images/components/logo.png' }}
          style={{ width : 150, height: 100 , resizeMode: 'center', opacity: .5}}
          />
      </View>

        <View style={{ 
          width: "100%", 
          height: "100%", 
          position: 'absolute'
        }}>
        {
          data.map((image, index) => {
            const inputRange = [
              (index - 1)*width ,
              index*width,
              (index + 1)*width
            ]
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange : [0, 1, 0]
            })
            return <Animated.Image 
              key={`image-${index}`}
              source={{ uri : image }}
              style={{ 
                width: "100%",
                height: "100%" , 
                position: 'absolute',
                opacity,
                
              }}
              blurRadius={8}
              />
          })
        }
      </View>
      <Animated.FlatList
      data={data}
      pagingEnabled
      onScroll={Animated.event(
        [{nativeEvent : {contentOffset : {x : scrollX}}}],
        {useNativeDriver : true}
      )}
      horizontal={true}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 1)*width ,
          index*width,
          (index + 1)*width
        ]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.3,1,0.3]
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0,1,0]
        })
        return(
          <View style={{ 
          width,
          justifyContent: 'center', 
          alignItems: 'center',
          
          }}>
            <Animated.View style={{
              shadowColor: '#202020',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.00,
              elevation: 24,
              transform:[
                {
                    scale
                },
                
            ] ,
            opacity
          }}>
              <Avatar 
            source={{ uri: item }}
            style={{ 
              width: imageW, 
              height: imageH, 
              resizeMode:'cover',
              borderColor: "rgba(255,255,255,.4)",
              borderWidth: 3,
              borderRadius: 20,
             
            }
          }
            rounded
            />
            </Animated.View>
            
          </View>
      )}}
      /> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 50,
    padding: 15,
    zIndex : 1
  },
  headertitle:{
    fontSize: 15,
    fontWeight: "bold",
  },
  bottomContainer:{
    width: 100,
    position: "absolute",
    bottom: 20,
    zIndex : 1,
    alignItems: 'center',
    shadowColor: '#202020',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.50,
              shadowRadius: 16.00,

              elevation: 24,
  }

});
