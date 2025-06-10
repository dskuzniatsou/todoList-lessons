import {FilterValues, Todolist} from '../App'



const initialState: Todolist[] = []
// type DeleteTodolistAction  = {
//     type: 'delete_todolist'
//     payload:{
//         id: string
//     }
// }
// export const deleteTodolistAC = (id: string): DeleteTodolistAction => {
//     return {type: 'delete_todolist', payload: { id }} as const
// }
export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const

}
export const createTodolistAC = (id:string, title: string) => {
    return {type: 'create_todolist', payload: {id,title}} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'change_todolisttitle', payload: {id, title}} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValues) => {
    return {type: 'change_todolistfilter', payload: {id, filter}} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitle | ChangeTodolistFilter
export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)// логика удаления тудулиста
        }
        case 'create_todolist': {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'change_todolisttitle': {
            return state.map(todolist =>
                todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
        }
        case 'change_todolistfilter': {
            return state.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }

        default:
            return state
    }
}