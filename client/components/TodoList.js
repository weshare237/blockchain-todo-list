import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'
import Task from './Task'

const TodoList = ({ input, setInput, addTask, tasks, deleteTask }) => (
  <div className='w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll'>
    <Navbar />
    <h2 className='text-4xl bolder text-white pb-8'>
      What&apos;s up, Duclair!
    </h2>
    <div className='py-3 text-[#7d99e9]'>TODAY&apos;S TASKS</div>
    <form className='flex items-center justify-center'>
      <input
        className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
        placeholder='Add a task for today...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IoMdAddCircle
        onClick={addTask}
        className='text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
      />
    </form>
    <ul>
      {tasks.map((task, index) => (
        <Task
          key={index}
          taskText={task.taskText}
          onClick={deleteTask(task.id)}
        />
      ))}
    </ul>
  </div>
)

export default TodoList
