
import styles from "../styles/task-form.module.css";


type TypeOfPageProps = {

    text: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=> void;
    addTaskName: () => void;
    onClose: () => void;
  
}

const TaskForm: React.FC<TypeOfPageProps> = ({text, handleChange, addTaskName, onClose}) => {

    
  return (
    
      <div className={styles.container}>

        <input className={styles.field} type="text" placeholder='Write tasks here...' value={text} onChange={handleChange}/>
        <div className={styles.btnParent}>
         <button className={styles.btn1} onClick={()=> onClose()}>Cancel</button>
        <button className={styles.btn2} onClick={()=> text && addTaskName()}>Submit</button>

        </div>
        

      </div>

    
  )
}

export default TaskForm;