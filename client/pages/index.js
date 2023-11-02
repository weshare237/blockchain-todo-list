import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { TaskContractAddress } from '../config'
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isCorrectNework, setIsCorrectNework] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    connectWallet()
    getAllTasks()
  }, [])

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('Connected to chain:', chainId)

      const sepoliaChainId = '0xaa36a7'

      if (chainId !== sepoliaChainId) {
        alert("You're not connected to the sepolia testnet!")
        setIsCorrectNework(false)
        return
      } else {
        setIsCorrectNework(true)
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])

      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        const allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)
        console.log(allTasks)
      } else {
        console.log('Ethereum object does not exist!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    e.preventDefault()

    const task = {
      taskText: input,
      isDeleted: false,
    }

    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        TaskContract.addTask(task.taskText, task.isDeleted)
          .then((res) => {
            setTasks([...tasks, task])
            console.log('Added task')
          })
          .catch((error) => console.log(error))
      } else {
        console.log('Ethereum object does not exist!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        const deleteTaskTx = await TaskContract.deleteTask(key, true)
        console.log('successfully deleted:', deleteTaskTx)

        const allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)
      } else {
        console.log('Ethereum object does not exist!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isUserLoggedIn ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : isCorrectNework ? (
        <TodoList
          input={input}
          setInput={setInput}
          addTask={addTask}
          tasks={tasks}
          deleteTask={deleteTask}
        />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  )
}
