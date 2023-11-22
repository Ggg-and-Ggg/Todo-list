import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Input, Modal, message, Carousel, Form } from 'antd';
import TaskCard from './TaskCard';

const { Content } = Layout;
const { TextArea } = Input;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const interval = setInterval(() => {
    }, 2000);

    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = (content, status) => {
    const newTodo = { id: Date.now(), content, status };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const handleSaveNewTask = () => {
    form
      .validateFields()
      .then((values) => {
        addTodo(
          {
            title: values.title,
            description: values.description,
          },
          'TODO'
        );
        setFormVisible(false);
        setIsSaveSuccessful(true);
        form.resetFields();
        setTimeout(() => {
          setIsSaveSuccessful(false);
        }, 3000);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const showDetails = (item) => {
    Modal.info({
      title: 'Task Details',
      content: (
        <div>
          <p>Task Title: {item.content.title}</p>
          <p>Task Description: {item.content.description}</p>
          <p>Status: {item.status}</p>
        </div>
      ),
    });
  };

  const startTask = (task) => {
    const updatedTodos = todos.map((t) =>
      t.id === task.id ? { ...t, status: 'DOING' } : t
    );
    setTodos(updatedTodos);
  };

  const finishTask = (task) => {
    const updatedTodos = todos.map((t) =>
      t.id === task.id ? { ...t, status: 'DONE' } : t
    );
    setTodos(updatedTodos);
  };

  const renderTasksInCarousel = () => {
    return todos.map((task, index) => (
      <div key={task.id} style={{ background: '#c7e2ff', padding: '10px' }}>
        <TaskCard
          className="task-card"
          task={task}
          onshowDetails={showDetails}
          onStart={startTask}
          onFinish={finishTask}
        />
        <div style={{ marginTop: '10px' }}>
          <h3>{task.content.title}</h3>
          <p>{task.content.description}</p>
          <Button className="viewDetailsButton" onClick={() => showDetails(task)}>
            VIEW DETAILS
          </Button>
        </div>
      </div>
    ));
  };

  const renderTasksByStatus = (status) => {
    return todos
      .filter((task) => status === 'ALL TASKS' || task.status === status)
      .map((task) => (
        <div key={task.id}>
          <Card className="todoCard">
            {status === 'TODO' && (
              <Button className="todoButton" onClick={() => startTask(task)}>
                CLICK TO START
              </Button>
            )}
            {status === 'DOING' && (
              <Button className="todoButton" onClick={() => finishTask(task)}>
                CLICK TO FINISH
              </Button>
            )}
            {status === 'DONE' && (
              <Button className="todoButton" onClick={() => showDetails(task)}>
                VIEW DETAILS
              </Button>
            )}
            <p>Task Title: {task.content.title}</p>
            <p>Task Description: {task.content.description}</p>
            <Button className="todoButton" onClick={() => removeTodo(task.id)}>
              Remove
            </Button>
          </Card>
        </div>
      ));
  };

  return (
    <div className="todoContainer">
       <Layout>
        <Content>
          <Carousel autoplay>{renderTasksInCarousel()}</Carousel>
        </Content>
      </Layout>
      <Layout>
        <Content>
          <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* "ALL TASKS" section with Add New Task button and form */}
            <div>
              <h2>ALL TASKS</h2>
              <Button onClick={() => setFormVisible(true)}>ADD NEW TASK</Button>
              {formVisible && (
                <Form
                  form={form}
                  onFinish={handleSaveNewTask}
                  style={{ marginTop: '10px' }}
                >
                  <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Please enter the task title' }]}
                  >
                    <Input placeholder="Task Title" />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Please enter the task description' }]}
                  >
                    <TextArea placeholder="Task Description" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Confirm
                    </Button>
                    <Button style={{ marginLeft: '10px' }} onClick={() => setFormVisible(false)}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </Content>
      </Layout>

      <div className="todoColumnsContainer">
        {/* "TODO" list */}
        <div className="todoColumn">
          <h2>TODO</h2>
          {renderTasksByStatus('TODO')}
        </div>

        {/* "DOING" list */}
        <div className="todoColumn">
          <h2>DOING</h2>
          {renderTasksByStatus('DOING')}
        </div>

        {/* "DONE" list */}
        <div className="todoColumn">
          <h2>DONE</h2>
          {renderTasksByStatus('DONE')}
        </div>
      </div>

      {/* New Task input */}
      <div className="todoColumn">
        {isSaveSuccessful && <div className="successMessage">Save Successful</div>}
      </div>
    </div>
  );
};

export default TodoList;