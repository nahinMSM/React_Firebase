import './App.css';
import { db } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState('');

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  // Ler dados
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
      const todosList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todosList);
    });

    return () => unsubscribe();
  }, []);

  // Adicionar
  const addTodo = async () => {
    try {
      await addDoc(collection(db, 'todos'), {
        todo
      });
      setTodo('');
    } catch (error) {
      console.error('Erro ao adicionar todo: ', error);
    }
  };

  // Atualizar
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTempId(todo.id);
    setTodo(todo.todo);
  };

  const submitChange = async () => {
    try {
      const todoRef = doc(db, 'todos', tempId);
      await updateDoc(todoRef, {
        todo
      });
      setTodo('');
      setIsEdit(false);
    } catch (error) {
      console.error('Erro ao atualizar todo: ', error);
    }
  };

  // Deletar
  const handleDelete = async (id) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await deleteDoc(todoRef);
    } catch (error) {
      console.error('Erro ao deletar todo: ', error);
    }
  };

  return (
    <div className="App">
      <input type="text" value={todo} onChange={handleTodoChange} />
      {isEdit ? (
        <>
          <button onClick={submitChange}>Confirmar Alteração</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTodo('');
            }}
          >
            Cancelar
          </button>
        </>
      ) : (
        <button onClick={addTodo}>Adicionar</button>
      )}
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.todo}</h2>
          <button onClick={() => handleUpdate(todo)}>Editar</button>
          <button onClick={() => handleDelete(todo.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default App;