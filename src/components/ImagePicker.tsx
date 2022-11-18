import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonButton, IonIcon, IonLabel } from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { useState } from "react";
import "./ImagePicker.css";

export interface Photo {
  path: string | undefined;
  preview: string;
}

const ImagePicker: React.FC<{
  onImagePick: (photo: Photo) => void;
}> = (props) => {
  const [takenPhoto, setTakenPhoto] = useState<Photo>();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    if (!photo || !photo.webPath) {
      return;
    }
    const pickedPhoto: Photo = {
      path: photo.path,
      preview: photo.webPath,
    };
    setTakenPhoto(pickedPhoto);
    props.onImagePick(pickedPhoto);
  };

  return (
    <>
      <div className="image-preview">
        {!takenPhoto && <h3>No photo chosen.</h3>}
        {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
      </div>
      <IonButton fill="clear" onClick={takePhotoHandler}>
        <IonIcon icon={camera} slot="start" />
        <IonLabel>Take Photo</IonLabel>
      </IonButton>
    </>
  );
};

export default ImagePicker;
