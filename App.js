import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList} from 'react-native';

const App = () =>{

const [ sortCriteria, setSortCriteria ] = useState('creationDate')


const [ completedTasks, setCompletedTasks ] = useState([]);


const [task, setTask] = useState('');


const [taskList, setTaskList] = useState([
  
])


const handleAddTask = () =>{

  if(task)
   setTaskList([...taskList, {task, isCompleted: false}]);
   setTask('');

}
 

const handleDeleteTask = (index) =>{

const task = taskList[index];

const updatedTask = {...task, isCompleted: true};

setTaskList((prevTaskList) =>{
  const newTaskList = [...prevTaskList];
  newTaskList.splice(index, 1, updatedTask);
  return newTaskList;

})

setCompletedTasks((prevCompletedTasks) =>[...prevCompletedTasks, updatedTask] )
};

const renderItem = ({item, index}) =>{

const isCompleted = item.isCompleted;

  return(

    <TouchableOpacity onPress={()=>handleDeleteTask(index)} style={[styles.taskItem, isCompleted && styles.completedTasksItem]} >
      < Text style={[styles.taskText, isCompleted && styles.completedTasksText]}>{item.task}</Text>
      {isCompleted && <Text style={styles.completedTasksText}>Concluída</Text>}
    </TouchableOpacity>

  )
}
const getSortedTasks = () => {
  switch (sortCriteria) {
    case 'creationDate' :
      return taskList;
      case 'completionDate' :
        return [...taskList].sort((a, b) =>{

          const dateA = a.completionDate;
          const dateB = b.completionDate;
          return new Date(dateA) - new Date(dateB);
        } );
        case 'alphabeticalOrder' :
          return [...taskList].sort((a, b) =>{

            return a.task.localeCompare(b.task);
          })
        default:
          return taskList;
  }
}



  return (

    <View style={styles.container}>
      <View style={styles.inputContainer}>

      <TextInput
      style={styles.input}
      value={task}
      onChangeText={text => setTask(text)}
      placeholder='Digite uma Tarefa'
      placeholderTextColor="#fffff"
      />

      <TouchableOpacity onPress={handleAddTask}    style={styles.button}>
        <Text style={styles.buttonText} >adicionar</Text>
      </TouchableOpacity>

    </View>
    <View style={styles.sortButtonsContainer}>
      <TouchableOpacity
      style={[styles.sortButton,
        sortCriteria === 'creationDate' && styles.activeSortButton,
       ]}
       onPress={() => setSortCriteria('creationDate')}
      
      >
        <Text  style={styles.sortButtonText} >Data de Criação</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.sortButton,
      sortCriteria === 'completionDate' && styles.activeSortButton,
     ]}
     onPress={() => setSortCriteria('completionDate')}
      
      >
        <Text style={styles.sortButtonText}>Data de Conclusão</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.sortButton,sortCriteria === 'alphabeticalOrder' && styles.activeSortButton,
     ]}
     onPress={() => setSortCriteria ('alphabeticalOrder')}
      
      >
        <Text style={styles.sortButtonText}>Ordem Alfabética</Text>
      </TouchableOpacity>
      
    

    </View>

    <FlatList
    data={getSortedTasks()}
    renderItem={renderItem}
   keyExtractor={(_,index)=> index.toString()} 
   contentContainerStyle={styles.listContainer}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5a2a7e',
paddingTop: 40,
  },
  inputContainer:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom:20,
  },
  activeSortButton: {
    backgroundColor: '#5a2a7e',
  },
  sortButtonText: {
    color: '#5a2a7e',
    fontWeight: 'bold',
  },
  input:{
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 29,
    paddingHorizontal: 10,
  },
  button:{
    marginLeft: 10,
    backgroundColor: '#ffff',
    borderRadius:8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',

 },
 buttonText:{
  color: '#5a2a7e',
  fontWeight: 'bold',
 },
 listContainer:{
  paddingHorizontal: 20,
 },
 taskItem:{
  backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  taskText: {
    color: '#5A2A7E',
    fontWeight: 'bold',
  },
  completedTasksItem:{
    backgroundColor: '#fff',
  },
  completedTasksText:{
    textDecorationLine: 'line-through',
    color: "#808080"
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sortButton: {
    marginHorizontal: 5,
    backgroundColor: '#cc2121',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  activeSortButton: {
    backgroundColor: '#5a2a7e',
  },
  sortButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

});


export default App;