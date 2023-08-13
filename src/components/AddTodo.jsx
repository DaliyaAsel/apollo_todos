import { useState } from 'react';
import {
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client'
import {ADD_TODO, ALL_TODO} from "../apollo/todos";


const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo, {loading, error, data}] = useMutation(ADD_TODO, {
    // Таким способом обновятся все данные, что снижает производительность
    // refetchQueries: [
    //   { query: ALL_TODO }
    // ],

    // это для автоматического обновления данных, обновляются не все данные, а только добавляемые
    update(cache, { data: { createTodo } }) {
      const { allTodos } = cache.readQuery({ query: ALL_TODO });

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          allTodos: [createTodo, ...allTodos]
        }
      })
    }
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: 123,
        }
      })
      setText('');
    }
  }

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  }

  return (
    <FormControl display={'flex'} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
