import React from 'react';
import { Carousel, Modal } from 'antd';

const TaskDetailsCarousel = ({ tasks }) => {
  const showDetails = (task) => {
    Modal.info({
      title: 'Task Details',
      content: (
        <div>
          <p>Task Name: {task.name}</p>
          <p>Task Details: {task.details}</p>
        </div>
      ),
    });
  };

  return (
    <Carousel autoplay>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => showDetails(task)}>
          {/* Display task details in AntD Carousel */}
          <p>{task.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default TaskDetailsCarousel;