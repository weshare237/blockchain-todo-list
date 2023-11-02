// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract TaskContract {
    event AddTask(address recepient, uint256 taskId);
    event UpdateTask(uint256 taskId, string taskText);
    event DeleteTask(uint256 taskId, bool isDeleted);

    struct Task {
        uint256 id;
        string taskText;
        bool isDeleted;
    }

    Task[] private tasks;
    mapping(uint256 => address) taskToOwner;

    function addTask(string memory taskText, bool isDeleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, taskText, isDeleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }

    function getMyTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);

        uint256 counter = 0;

        for (uint i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender && !tasks[i].isDeleted) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);

        for (uint256 i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }

        return result;
    }

    function deleteTask(
        uint256 taskId,
        bool isDeleted
    ) external onlyOwner(taskId) {
        tasks[taskId].isDeleted = isDeleted;
        emit DeleteTask(taskId, isDeleted);
    }

    function getTask(
        uint256 taskId
    ) external view onlyOwner(taskId) returns (Task memory) {
        require(!tasks[taskId].isDeleted, "Task does not exist or is deleted");
        return tasks[taskId];
    }

    function updateTask(
        uint256 taskId,
        string memory newTaskText
    ) external onlyOwner(taskId) {
        require(!tasks[taskId].isDeleted, "Task does not exist or is deleted");
        tasks[taskId].taskText = newTaskText;
        emit UpdateTask(taskId, newTaskText);
    }

    modifier onlyOwner(uint256 taskId) {
        require(
            taskToOwner[taskId] == msg.sender,
            "You're not the owner of the task"
        );
        _;
    }
}
