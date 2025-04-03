import { TypeOfPriority } from "../types";
import { priorityOfTasks } from "../utils/constants";
import  styles from "../styles/task-priority.module.css";
 

type TypeOfPageProps = {
    addTask: (priority: string) => void;
}

const TaskPriority: React.FC<TypeOfPageProps> = ({addTask}) => {
  return (
    <div className={styles.container}>
        {
            priorityOfTasks?.map((el: TypeOfPriority)=>{
                const dynamicBtnClass = styles.btn + " " + styles["btn" + el.id];

                return <button className={dynamicBtnClass} key={el?.id} onClick={()=>addTask(el?.priority)}>{el?.priority}</button>
            })
        }
        
      
    </div>
  )
}

export default TaskPriority;
