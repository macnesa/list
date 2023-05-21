

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions,  View, Text, FlatList, TouchableOpacity, Image, Linking, TextInput, Button } from 'react-native';

import { Feather } from '@expo/vector-icons';


import axios from 'axios';

const CatList = () => {
  const [catData, setCatData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, SetIsSearch] = useState(false);
  
  const apiKey = 'live_DAPFjPnUVTkX9AOUDnTNoKD1DaJOM61Kpke5sHsLujPigv89mWeyDlqDTrLtfGtm'
  
  useEffect(() => {
    !isSearch && fetchData() 
  }, [page]);
   
  
  const fetchData = async () => {
    console.log("fetch data");
    try { 
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`,
        {
          headers: {
            'x-api-key': apiKey
          }
        }
      ); 
      setCatData((prevData) => [ 
        ...prevData,
        ...response.data.map((each) => ({ ...each, expanded: false })),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (itemId) => {
    setCatData((prevState) => {
      return prevState.map((item) =>
        item.id === itemId ? { ...item, expanded: !item.expanded } : item
      );
    });
  };

  const handleSearch = async () => {
    try {
      SetIsSearch(true)
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${searchQuery}`,
        {
          headers: {
            'x-api-key': apiKey 
          }
        }
      );
      console.log(response.data);
      setCatData(response.data.map((each) => ({ ...each, expanded: false })));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setCatData([]);
    setPage(0);
    SetIsSearch(false) 
  };

  const renderCatItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 10, background:"radial-gradient(#fc466b, #7857d0, #3f5efb)", borderRadius: 8,borderWidth: 1, borderColor: "#0b1f38",}}>
        <TouchableOpacity
          style={{
            flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 12,
            
            
            //borderLeftColor: "#2e406b",
            //borderBottomColor: "#2e406b",
            
            backgroundColor: `${item.expanded ? "#0b1f38" : "transparent"}`,
           
          }}
          activeOpacity={0.7}
          onPress={() => {
            handlePress(item.id);
          }}
        >


          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
                source={{ uri: item.image.url }}
                style={{
                  aspectRatio: 200 / 200,
                  borderRadius: 5,
                }}
            /> 
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color:"#9CA3AF",
              }}
              >
              {item.name}
            </Text>
           
            <Feather
              name={(item.expanded ? "chevron-up" : "chevron-down")}
              size={20}
              color="#9CA3AF"
              style={{... styles.searchIcon, borderWidth: 1, borderColor:"#3f4d63", paddingLeft:2, paddingTop:3, borderRadius:12 }} 
            />
          </View>


          {item.expanded && (
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                source={{ uri: item.image.url }}
                style={{
                  flex: 1,
                  aspectRatio: 16 / 9,
                  marginTop: 10,
                  borderRadius: 5,
                }}
              />

              <View style={{ flex: 1, paddingHorizontal: 10, marginBottom: 10 }}>
                <Text
                  style={{ ...styles.text, marginTop: 10, fontWeight: "700" }}
                >
                  {item.description}{" "}
                </Text>

                <Text
                  style={{ ...styles.text, fontWeight: "bold", marginTop: 20, color: "grey" }}
                >
                  {""}
                  Origin{" "}
                </Text>
                <Text style={styles.text}>{item.origin} </Text>

                <Text
                  style={{ ...styles.text, fontWeight: "bold", marginTop: 5, color:"grey" }}
                >
                  {""}
                  Temperament{" "}
                </Text>
                <Text style={styles.text}>{item.temperament} </Text>

                <Text
                  style={{ ...styles.text, fontWeight: "bold", marginTop: 5, color: "grey" }}
                >
                  {""}
                  Life Span{" "}
                </Text>
                <Text style={styles.text}>{item.life_span} </Text>

                <Text
                  style={{
                    ...styles.text,
                    marginTop: 10,
                    marginBottom: 5,
                    color: "#599c6b",
                  }}
                >
                  {""}
                  Adaptability{" "}
                </Text>
                <Progress
                  percentage={item.adaptability}
                  backgroundColor="#599c6b"
                />

                <Text
                  style={{ ...styles.text, marginBottom: 5, color: "#822f42" }}
                >
                  {""}
                  Energy level{""}
                </Text>
                <Progress
                  percentage={item.energy_level}
                  backgroundColor="#822f42"
                />

                <Text
                  style={{ ...styles.text, marginBottom: 5, color: "#595a9c" }}
                >
                  {""}
                  Intelligence{""}
                </Text>
                <Progress
                  percentage={item.intelligence}
                  backgroundColor="#595a9c"
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const Progress = ({ percentage, backgroundColor="blue" }) => {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          backgroundColor: "#ccc",
          borderRadius: 100,
          height: 2.5,
          marginBottom: 10,
        }}
        activeOpacity={0.7}
        onPress={() => {}}
      >
        
        <View
          style={{
            width: `${percentage}0%`,
            height: "100%",
            backgroundColor: backgroundColor,
            borderRadius: 100,
          }}
        />
      </TouchableOpacity>
    );
  };

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={{ borderColor: "", borderWidth: 0, paddingHorizontal: 10 }}> 
    
    <Text style={{...styles.text, fontSize:16, marginBottom: 20, marginTop: -5, fontWeight: "bold", color: "#2f4561"}}>Cat List</Text>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#9CA3AF"
            style={styles.searchIcon}
          /> 
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#9CA3AF"
            underlineColorAndroid="transparent"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            required
          />
          <Feather
            name="x"
            size={20}
            color="#9CA3AF" 
            onPress={handleRefresh} 
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Feather
            name="search"
            size={25}
            color="white"
            style={styles.buttonIcon}
          /> 
        </TouchableOpacity>
      </View>
 
      <FlatList
        data={catData}
        renderItem={renderCatItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default CatList;

 
 
const styles = StyleSheet.create({
  text: { 
    color: '#ccc', // font tulisan detail
  },
  
  
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:12
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c233f',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
    borderColor:"#3f4d63",
    borderWidth:0.5
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3f4d63',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 12,
  
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
});