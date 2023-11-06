/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,
} from 'react-native';
import axios from 'axios';

function App(): JSX.Element {

  const [data,setData] = useState([]);

  useEffect(()=>{
    axios.get('https://5f8e-149-200-255-34.ngrok-free.app/api/course')
    .then(result=>{
      setData(result.data);
    }).catch(err=>console.log(err));  
  },[]);

  // add new course 

  const fetchData = () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(data => data.json())
    //     .then(jsonData => {
    //       console.log(jsonData);
    //     }).catch(err=>console.log(err));  

    axios.get('https://5f8e-149-200-255-34.ngrok-free.app/api/course')
         .then(result=>{
           setData(result.data);
         }).catch(err=>console.log(err));  
  }

  return (
   <View>
    <Text>
      Our Courses  
    </Text>
    {/* <Button title ="fetch data" onPress={fetchData}/> */}
    <FlatList
      data={data}
      keyExtractor={(item)=>item.courseId.toString()}
      renderItem={({item})=>(
        <View>
          {/* <Text>Tilte : {item.title}</Text>
          <Text>Completed : {item.completed ? "Yes" : "No" }</Text> */}
          <Text> name : {item.name}</Text>
          <Text> Status : {item.status}</Text>

        </View>
  )}
    />
   </View>
  );
}

export default App;
