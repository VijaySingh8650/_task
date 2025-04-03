
import styles from "../styles/task-item.module.css";
import {Draggable } from "@adaptabletools/react-beautiful-dnd";
import { TypeOfTask } from "../types";
import { SquarePen, Trash2 } from 'lucide-react';


type TypeOfPageProps = {
    task: TypeOfTask;
    index: number;
    deleteTask: (id: string) => void;
    updateTask: (id: string) => void;
}

const TaskItem: React.FC<TypeOfPageProps> = ({task, index, deleteTask, updateTask}) => {
  return (
    <Draggable draggableId={task?.id} index={index}>
        {
            (provided) => (

                    <div
                      className={styles.textDiv}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                        <p>
                          &bull;  <span>{task?.task} </span>
                        </p>
                        <div className={styles.btnContainer}>
                            <SquarePen className={styles.icon} onClick={()=> updateTask(task?.id)}/>
                            <Trash2 className={styles.icon} onClick={()=> deleteTask(task?.id)}/>
                        </div>
                     
                    </div>
            )
        }


    </Draggable>
  )
}

export default TaskItem