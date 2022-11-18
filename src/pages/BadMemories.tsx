import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import React, { useContext } from "react";
import MemoriesContent from "../components/MemoriesContent";
import MemoriesContext from "../data/memories-context";

const BadMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter((m) => m.type === "bad");

  return (
    <MemoriesContent
      memories={badMemories}
      title="Bad Memories"
      fallBackText="No bad memories found."
    />
  );
};
export default BadMemories;
