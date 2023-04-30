import {Button,  Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import axios from 'axios';

const App = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('text', text);
    formData.append('file', file);
    
    try {
      await axios.post('http://localhost:5000/api', formData, {
         headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Форма отправлена!');
    } catch (err) {
      console.error(err);
      alert('Произошла ошибка!');
    }
  };

  return (
    <div>
      <Container style={{width: '500px'}}>
        <h1>Напишите нам</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group style={{marginTop: '50px'}}>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)} required placeholder="Введите имя"></Form.Control>
          </Form.Group> 
          <Form.Group style={{marginTop: '20px'}}>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required  placeholder="Введите email"></Form.Control>
          </Form.Group>
          <Form.Group style={{marginTop: '20px'}}>
            <Form.Control value={text} onChange={(e) => setText(e.target.value)} required as="textarea" rows="3" placeholder="Введите сообщение"></Form.Control>
          </Form.Group>
          <Form.Group style={{marginTop: '20px'}}>
            <Form.Control
              id="contained-button-content"
              type="file"
              encType="multipart/form-data"
              onChange={(e) => setFile(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Button style={{marginTop: '20px'}} variant="primary" type="submit">Отправить</Button>  
        </Form>
        
      </Container>
    </div>
    
  );
};

export default App;
