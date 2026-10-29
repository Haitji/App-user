import { User } from './../model/user';
import { createReducer, on } from "@ngrx/store";
import { add, find, findAll, remove, setPaginator, update } from './users.actions';



const users: User[] = [];
const newUser: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
}
const user: User = { ...newUser };
export const userReducer = createReducer(
    {
        users,
        paginator: {},
        user
    },
    on(findAll, (state, { users }) => {
        return {
            users: [...users],
            paginator: state.paginator,
            user: state.user
        }
    }),
    on(find, (state, { id }) => ({
        users: state.users,
        paginator: state.paginator,
        user: state.users.find(user => user.id == id) || { ...newUser }
    })),
    on(setPaginator, (state, { paginator }) => {
        return {
            users: state.users,
            paginator: { ...paginator },
            user: state.user
        }
    }),
    //==================================================================================
    on(add, (state, { userNew }) => {
        return {
            users: [...state.users, { ...userNew }],
            paginator: state.paginator,
            user: state.user
        }
    }),
    on(update, (state, { userUpdate }) => {
        return {
            users: state.users.map(u => {
                if (u.id == userUpdate.id) {
                    return { ...userUpdate };
                }
                return u;
            }),
            paginator: state.paginator,
            user: state.user
        }
    }),
    on(remove, (state, { id }) => {
        return {
            users: state.users.filter(u => u.id != id),
            paginator: state.paginator,
            user: state.user
        }
    })

);