import { useState } from "react";
import TaskForm from "./components/task-form";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./components/task-list";
import styles from "./styles/app.module.css";
import {
  DragDropContext,
  DropResult,
} from "@adaptabletools/react-beautiful-dnd";
import { TypeOfPriority, TypeOfTask } from "./types";
import Modal from "./utils/modal";
import TaskPriority from "./components/task-priority";
import { priorityOfTasks } from "./utils/constants";


const App = () => {
  const uniqueId = uuidv4();
  const [openTasks, setOpenTasks] = useState<boolean>(false);
  const [openPriority, setOpenPriority] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<TypeOfTask[]>([]);



  const openTasksModal = () => {

    setOpenTasks(true);
    setText("");
    
   
  };
  const closeTasksModal = () => {

    setOpenTasks(false);
    setTaskId("");
   
  };

  const openPriorityModal = () => {

    setOpenPriority(true);

  };

  const closePriorityModal = () => {
    
    setOpenPriority(false);
    closeTasksModal();

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };


  const addTaskName = () => {
    openPriorityModal();
  };

  const addTask = (priority: string) => {
    const taskDetails: TypeOfTask = {
      task: text,
      id: uniqueId,
      date: new Date().toLocaleString(),
      priority,
      index: tasks.length,
    };

    setTasks([...tasks, taskDetails]);
    closePriorityModal();
  };

  const deleteTask = (id:string) => {
    const updatedTasks = tasks.filter((task) => task.id!== id);
    setTasks(updatedTasks);
  }

  const updateTask = (id: string) => {
    
    setTaskId(id);
    setOpenTasks(true);
    const individualTask = tasks.find((task) => task.id === id);
    
    if(individualTask){
      setText(individualTask?.task);
    }


  }

  const updatedTask = (priority: string) => {
    
    const updatedTasks = tasks.map((task) =>
      task.id === taskId? {...task, task: text, priority} : task
    );

    setTasks(updatedTasks);

    closePriorityModal();

  }

 

  
  const changeIndexOfItems = (
    sourceIndex: number,
    destinationIndex: number,
    destinationDroppableId?: string
  ) => {
   
   
    if(destinationIndex >= tasks.length) destinationIndex=tasks.length -1;
    else if(destinationIndex <= 0) destinationIndex = 0;
    
    
    const allTheTasks = [...tasks]; //shallow copy
    
    if(destinationDroppableId){

      allTheTasks[sourceIndex].priority = destinationDroppableId;

    }

    for(let i=0; i<allTheTasks?.length; i++){
      if(i===destinationIndex) allTheTasks[i].index = destinationIndex;
      else allTheTasks[i].index  = i;
    }



    setTasks([...allTheTasks]);
  };
  
  
  
  
  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    changeIndexOfItems(
      result?.source?.index,
      result.destination.index,
      result?.destination?.droppableId
    );
  
  };
  

   console.log(tasks, "dslfhkf");

  return (
    <div>
      <button
        className={styles.btn + " " + styles.fixedPosition}
        onClick={openTasksModal}
      >
        Add Tasks
      </button>

      {/* Task modal */}
      <Modal isOpen={openTasks} onClose={closeTasksModal} title={taskId ? "Update Task" : "Add Task"}>
        {/* Task Form */}
        <TaskForm
          text={text}
          handleChange={handleChange}
          addTaskName={addTaskName}
          onClose={closeTasksModal}
        />
      </Modal>

      {/* Task Priority modal */}
      <Modal
        isOpen={openPriority}
        onClose={closePriorityModal}
        title="Task Priority"
      >
        {/* priority types */}
        <TaskPriority addTask={taskId ? updatedTask : addTask} />

      </Modal>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.containerParent}>
          {priorityOfTasks?.map((item:TypeOfPriority) => {
            return (
              <TaskList
                key={item?.id}
                tasks={tasks?.filter((el)=>el.priority===item?.priority)?.sort((a,b)=>a.index - b.index)}
                name={item?.priority}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
