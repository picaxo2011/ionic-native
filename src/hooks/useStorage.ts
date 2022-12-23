import { useEffect, useState } from "react";
import {Drivers, Storage} from "@ionic/storage";
import cordovaSQLiteDriver, * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const TODOS_KEY = 'my-todos';

export interface TodoItem {
    task: string;
    created: number;
    status: number;
    id: string;
}

export const useStorage = () => {
    const [store,setStore] = useState<Storage>();
    const [todos, setTodos] = useState<TodoItem[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'picaxo',
                driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            });
            await newStore.defineDriver(cordovaSQLiteDriver);
            
            const store = await newStore.create();
            setStore(store);

            const storedTodo = await store.get(TODOS_KEY) || [];
            setTodos(storedTodo);
        };
        initStorage();
    },[]);

    const addTodo = async (task: string) => {
        const newTodo = {
            task,
            created: new Date().getTime(),
            status: 0,
            id: ''+new Date().getTime()
        }
        const updateTodos = [...todos,newTodo];
        setTodos(updateTodos)
        store?.set(TODOS_KEY, updateTodos);
    }

    const updateTodo = async (id: string, status: number) => {
        const updateTodo = [...todos];
        const newTodo = updateTodo.filter((todo) => todo.id === id)[0];
        newTodo.status = status;
        setTodos(updateTodo);
        return store?.set(TODOS_KEY, updateTodo);
    }

    const removeTodo = async (id: string) => {
        const updateTodo = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodo);
        return store?.set(TODOS_KEY, updateTodo);
    }

    return {
        todos,
        addTodo,
        updateTodo,
        removeTodo
    }
}