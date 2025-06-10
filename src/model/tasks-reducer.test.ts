import { beforeEach, expect, test } from 'vitest'
import type {TasksState} from '../App'
import {tasksReducer} from "./tasks-reducer.ts";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {v1} from "uuid";

let startState: TasksState = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ],
    }
})

test('array should be created for new todolist', () => {
    const newTodolistId = v1()
    const endState = tasksReducer(startState, createTodolistAC(newTodolistId, 'New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})

test('проверка, что значения не равны ожидаемому', () => {
    // ✅ Тест пройден
    expect(5).not.toBe(10) // 5 не равно 10
    expect('hello').not.toContain('world') // строка 'hello' не содержит 'world'
})