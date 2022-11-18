import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
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
import { add } from "ionicons/icons";
import React, { useContext } from "react";
import MemoriesContent from "../components/MemoriesContent";
import MemoriesList from "../components/MemoriesList";
import MemoryItem from "../components/MemoryItem";
import MemoriesContext from "../data/memories-context";

const GoodMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter((m) => m.type === "good");

  return (
    <MemoriesContent
      memories={goodMemories}
      title="Good Memories"
      fallBackText="No good memories found."
    />
  );
};
export default GoodMemories;
