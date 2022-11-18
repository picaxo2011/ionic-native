import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import React from "react";

const ToolbarAction: React.FC<{ icon: string; link: string }> = (props) => {
  return (
    <IonButtons slot="end">
      <IonButton routerLink={props.link}>
        <IonIcon icon={props.icon} />
      </IonButton>
    </IonButtons>
  );
};

export default ToolbarAction;
