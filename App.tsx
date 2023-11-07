/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  FlatList,
} from 'react-native';
import axios from 'axios';

function App(): JSX.Element {
  // name, status ,dateFrom ,dateTo , mark

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [mark, setMark] = useState('');
  const [getAgain, setGetAgain] = useState(false)


  const getAll = () =>{
    axios.get('https://8872-2a01-9700-169d-a500-255b-29f9-6563-5f53.ngrok-free.app/api/course')
      .then(result => {
        setData(result.data);
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getAll
  },[]);

  const handleCreate = () => {
    axios.post('https://8872-2a01-9700-169d-a500-255b-29f9-6563-5f53.ngrok-free.app/api/course', {
      "courseId" : Math.floor(Math.random() * 100),  
      "name": name,
      "status": status,
       "dateFrom": dateFrom, 
       "dateTo": dateTo,
        "mark": mark,
    },
      {
        "headers": {
          'Content-Type': 'application/json',
        }
      }
    ).then(res => {
      console.log(res.data);
      alert('Course Created Successfully');
      getAll();
    }).catch((err) => console.log(err));
  }


  const handleDelte = (id) => {
    axios.delete(`https://8872-2a01-9700-169d-a500-255b-29f9-6563-5f53.ngrok-free.app/api/course/${id}`)
    .then(()=>{
      alert('Course Deleted Successfully');
    }).catch((err) => console.log(err));
  }

  

  return (
    <View>
      <Text>
        Our Courses
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.courseId.toString()}
        renderItem={({ item }) => (
          <View>
            <Text> name : {item.name}</Text>
            <Text> Status : {item.status}</Text>
            <Button title='x' onPress={()=>handleDelte(item.courseId)}/>
          </View>
        )}
      />

      <Text style={{ margin: 50 }}>Add new Course</Text>
      <TextInput
        placeholder='Enter course name'
        defaultValue={name}
        onChangeText={courseName => setName(courseName)}
      />
      <TextInput
        placeholder='Enter course status'
        defaultValue={status}
        onChangeText={courseStatus => setStatus(courseStatus)}
      />
      <TextInput
        placeholder='Enter course start date'
        defaultValue={dateFrom}
        onChangeText={startDate => setDateFrom(startDate)}
      />
      <TextInput
        placeholder='Enter course end date'
        defaultValue={dateTo}
        onChangeText={endDate => setDateTo(endDate)}
      />
      <TextInput
        placeholder='Enter course mark'
        defaultValue={mark}
        onChangeText={courseMark => setMark(courseMark)}
      />

      <Button title="Add" onPress={handleCreate} />


    </View>
  );
}


const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 0
  },
  inputText: {
    height: 45,
    marginBottom: 15
  },
  labelText: {
    marginTop: 10,
    marginBottom: 5
  },
  mainBox: {
    textAlign: 'center',
    margin: 15,
    justifyContent: 'space-between'
  }
});


export default App;
