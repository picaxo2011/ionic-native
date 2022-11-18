import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React from "react";
import { Memory } from "../data/memories-context";
import FixedBottomAction from "./FixedBottomAction";
import MemoriesList from "./MemoriesList";
import ToolbarAction from "./ToolbarAction";

const MemoriesContent: React.FC<{
  memories: Memory[];
  title: string;
  fallBackText: string;
}> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          {isPlatform("ios") && <ToolbarAction icon={add} link="/new-memory" />}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {props.memories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>{props.fallBackText}</h2>
              </IonCol>
            </IonRow>
          )}
          <MemoriesList items={props.memories} />
        </IonGrid>
        {!isPlatform("ios") && (
          <FixedBottomAction icon={add} link="/new-memory" />
        )}
      </IonContent>
    </IonPage>
  );
};

export default MemoriesContent;
