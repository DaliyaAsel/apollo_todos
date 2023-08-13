// здесь пишем необходимые gql запросы

import { gql } from '@apollo/client';

export const ALL_TODO = gql`
  query AllTodoes {
     allTodos {
      id
      title
      completed
    }
  }
`;

export const ADD_TODO = gql `
  mutation AddTodo($userId: ID!, $title: String!, $completed: Boolean!)  {
    createTodo(user_id: $userId, title: $title, completed: $completed ) {
      id
      title
      user_id
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!)  {
    updateTodo(id: $id, completed: $completed ) {
      id
      title
      completed
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
    }
  }
`;
