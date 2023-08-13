import { VStack } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import {useMutation, useQuery} from "@apollo/client";

import {ALL_TODO, REMOVE_TODO, UPDATE_TODO} from "../apollo/todos";

import TodoItem from './TodoItem';
import TotalCount from './TotalCount';


const TodoList = () => {
  const {loading, error, data} = useQuery(ALL_TODO);

  const [toggleTodo, {error: updateError}] = useMutation(UPDATE_TODO);

  const [removeTodo, {error: removeError}] = useMutation(REMOVE_TODO, {
    update(cache, {data: { removeTodo }}) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
                                               // потому что в кэше apollo данные хранятся в виде рефки: __ref:"Todo:10"
            return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo.id}`)
          }
        }
      })
    }
  });


  if (loading) return <Spinner />;
  if (error || updateError || removeError) return <h2>Error...</h2>

  return (
    <>
    <VStack spacing={2} mt={4}>
      {data?.allTodos?.map((todo) => (
        <TodoItem
          key={todo.id}
          onToggle={toggleTodo}
          removeTodo={removeTodo}
          {...todo}
        />
      ))}
    </VStack>
    <TotalCount />
    </>
  );
};

export default TodoList;
