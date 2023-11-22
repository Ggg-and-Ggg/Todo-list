import React from 'react';
import { Card, Button } from 'antd';

const TaskCard = ({ task, onViewDetails, onStart, onFinish }) => {
  return (
    <Card title={task.name}>
      {/* Display task details */}
      <p>{task.details}</p>
      
      {/* View Details */}
      <Button onClick={() => onViewDetails(task)}>View Details</Button>
      
      {/* Start or Finish button based on task state */}
      {task.state === 'TODO' && <Button onClick={() => onStart(task)}>Start</Button>}
      {task.state === 'DOING' && <Button onClick={() => onFinish(task)}>Finish</Button>}
    </Card>
  );
};

export default TaskCard;