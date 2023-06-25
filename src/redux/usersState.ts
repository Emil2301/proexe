import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/Types';

const initialState: { users: User[] } = {
  users: [],
};

export const usersStateSlice = createSlice({
  name: 'usersState',
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      const cities = ['Warszawa', 'Wrocław', 'Poznań', 'Kraków'];
      const randomCity = cities[Math.floor(Math.random() * 4)];
      const highestIdPlusOne = Math.max(...state.users.map((user) => user.id)) + 1;
      const { name, email } = action.payload;
      state.users = [
        ...state.users,
        {
          name,
          email,
          username: name + '123',
          id: highestIdPlusOne,
          city: randomCity,
        },
      ];
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user: User) => user.id !== action.payload);
      if (state.users.length === 0) {
        console.log('pusto tu');
      }
    },
    editUser: (state, action) => {
      const { row, value, keyName, currentlyEditingId } = action.payload;
      console.log(currentlyEditingId);
      state.users = state.users.map((user: User) => {
        if (user.id === currentlyEditingId) {
          return { ...row, [keyName]: value };
        } else {
          return {
            ...user,
          };
        }
      });
    },
    setFetchedUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setFetchedUsers, deleteUser, editUser, addUser } = usersStateSlice.actions;

export default usersStateSlice;
