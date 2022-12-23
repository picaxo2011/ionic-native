import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowUndoOutline, checkmarkDoneOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import "./todo.css";

const Todo: React.FC = () => {
  const { todos, addTodo, updateTodo, removeTodo } = useStorage();
  const [task, setTask] = useState("");
  const ionList = useRef(null as any);

  const createTodo = async () => {
    await addTodo(task);
    setTask("");
  };

  const deleteTodo = async (id: string) => {
    await removeTodo(id);
    ionList.current.closeSlidingItems();
  };

  const updateStatus = async (id: string, status: number) => {
    await updateTodo(id, status);
    ionList.current.closeSlidingItems();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonInput
            value={task}
            onIonChange={(e) => setTask(e.detail.value!)}
            placeholder="Play soccer"
          ></IonInput>
          <IonButton slot="end" onClick={() => createTodo()} fill="clear">
            Add
          </IonButton>
        </IonItem>
        <IonList ref={ionList}>
          {todos.map((todo, key) => {
            return (
              <IonItemSliding key={key}>
                <IonItem className={todo.status === 1 ? "done" : ""}>
                  <IonLabel>{todo.task}</IonLabel>
                </IonItem>
                <IonItemOptions side="start">
                  <IonItemOption
                    color="danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </IonItemOption>
                </IonItemOptions>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="secondary"
                    onClick={() => updateStatus(todo.id, 0)}
                  >
                    <IonIcon icon={arrowUndoOutline}></IonIcon>
                  </IonItemOption>
                  <IonItemOption
                    color="primary"
                    onClick={() => updateStatus(todo.id, 1)}
                  >
                    <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Todo;
