
import TaskItem from "./task-item";
import styles from "../styles/task-list.module.css";
import { Droppable } from "@adaptabletools/react-beautiful-dnd";
import { TypeOfTask } from "../types";


type TypeOfPageProps = {
    tasks: TypeOfTask[];
    name: string;
    deleteTask: (id: string) => void;
    updateTask: (id: string) => void;
}

const TaskList: React.FC<TypeOfPageProps> = ({ tasks, name, deleteTask , updateTask}) => {
  return (
    <Droppable droppableId={name}>
      {(provided) => {
        return (
          <div
            className={styles.taskContainer}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1 className={styles.taskHeader}>{name}</h1>
            {tasks?.map((el) => (
              <TaskItem task={el} key={el?.id} index={el?.index} deleteTask={deleteTask} updateTask={updateTask}/>
            ))}

            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default TaskList;