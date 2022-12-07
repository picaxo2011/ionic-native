import {
  IonAlert,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  SelectCustomEvent,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import {
  type AuthenticateOptions,
  BiometricAuth,
  BiometryType,
  type CheckBiometryResult,
  getBiometryName,
  type ResultError,
} from "@aparajita/capacitor-biometric-auth";
import { PluginListenerHandle } from "@capacitor/core";

const biometryTypes = [
  {
    title: "None",
    type: BiometryType.none,
  },
  {
    title: "Touch ID",
    type: BiometryType.touchId,
  },
  {
    title: "Face ID",
    type: BiometryType.faceId,
  },
  {
    title: "Fingerprint Authentication",
    type: BiometryType.fingerprintAuthentication,
  },
  {
    title: "Face Authentication",
    type: BiometryType.faceAuthentication,
  },
  {
    title: "Iris Authentication",
    type: BiometryType.irisAuthentication,
  },
];

const Biometry: React.FC = () => {
  const [appListener, setAppListener] = useState<PluginListenerHandle>();
  const [biometryName, setBiometryName] = useState<string>("No biometry");
  const [biometry, setBiometry] = useState<CheckBiometryResult>({
    isAvailable: false,
    biometryType: BiometryType.none,
    reason: "",
  });

  const options: AuthenticateOptions = {
    reason: "asdf",
    cancelTitle: "asdf",
    iosFallbackTitle: "asdf",
    androidTitle: "",
    androidSubtitle: "",
    allowDeviceCredential: true,
  };

  // useEffect(() => {
  //   const loadBiometry = async () => {
  //     const loadData = await BiometricAuth.checkBiometry();
  //     setBiometry(loadData);
  //   };
  //   loadBiometry();
  // }, []);

  //   useEffect(() => {
  //     const loadBiometry = async () => {
  //       const loadBiometry = await BiometricAuth.checkBiometry();
  //       setBiometry(loadBiometry);
  //       try {
  //         const updateAppListener = await BiometricAuth.addResumeListener(
  //           setBiometry
  //         );
  //         setAppListener(updateAppListener);
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           console.error(error.message);
  //         }
  //       }
  //     };
  //     loadBiometry();
  //   }, []);

  //   useEffect(() => {
  //     setBiometryName(getBiometryName(biometry.biometryType) || "No biometry");
  //   }, [biometry]);

  //   const biometryDescription = () => {
  //     let description = `${biometryName} is supported`;
  //     if (biometry.biometryType !== BiometryType.none) {
  //       if (biometry.isAvailable) {
  //         description += " and available.";
  //       } else {
  //         description += ", but not available.";
  //       }
  //       if (biometry.reason) {
  //         description += ` ${biometry.reason}`;
  //       }
  //     } else {
  //       description += ".";
  //     }
  //     return description;
  //   };

  //   const onSelectBiometry = async (event: SelectCustomEvent<string>) => {
  //     await BiometricAuth.setBiometryType(Number(event.detail.value));
  //     const updateBiometry = await BiometricAuth.checkBiometry();
  //     setBiometry(updateBiometry);
  //   };

  const onAuthenticate = async () => {
    try {
      // options is a reactive proxy, we can't pass it directly to a plugin.
      // so pass the underlying object.
      await BiometricAuth.setBiometryType(BiometryType.faceId);
      await BiometricAuth.authenticate(options);
      // await showAlert('Authorization successful!')
    } catch (error) {
      // Someday TypeScript will let us type catch clauses...
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      // await showErrorAlert(error as ResultError)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Biometry Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>Status</IonListHeader>
          <IonLabel>{biometry.biometryType}</IonLabel>
          {/* <IonItem>{biometryDescription()}</IonItem> */}
        </IonList>
        <IonList class="mt-6" lines="full">
          <IonListHeader>Options</IonListHeader>

          <IonItem v-if="!isNative">
            <IonLabel class="flex-initial">Biometry:</IonLabel>
            <IonSelect
              class="[--padding-start:0px] max-w-full"
              interface="action-sheet"
              //   onIonChange={onSelectBiometry}
            >
              {biometryTypes.map((type) => (
                <IonSelectOption value={type.type} key={type.type}>
                  {type.title}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {/* <IonItem v-if="isAndroid">
            <IonLabel>Title:</IonLabel>
            <IonInput
              v-model="options.androidTitle"
              type="text"
              autocapitalize="sentences"
            />
          </IonItem>

          <IonItem v-if="isAndroid">
            <IonLabel>Subtitle:</IonLabel>
            <IonInput
              v-model="options.androidSubtitle"
              type="text"
              autocapitalize="sentences"
            />
          </IonItem> */}

          <IonItem>
            <IonLabel>Reason:</IonLabel>
            <IonInput
              v-model="options.reason"
              type="text"
              autocapitalize="sentences"
            />
          </IonItem>

          <IonItem v-if="isNative">
            <IonLabel>Cancel title:</IonLabel>
            <IonInput
              v-model="options.cancelTitle"
              type="text"
              autocapitalize="sentences"
            />
          </IonItem>

          <IonItem v-if="isIOS">
            <IonLabel>Fallback title:</IonLabel>
            <IonInput
              v-model="options.iosFallbackTitle"
              type="text"
              autocapitalize="sentences"
            />
          </IonItem>

          <IonItem v-if="isNative">
            <IonCheckbox v-model="options.allowDeviceCredential" />
            <IonLabel>Allow device credential</IonLabel>
          </IonItem>
        </IonList>
        <div>
          <IonButton
            class="mt-5"
            size="default"
            shape="round"
            onClick={onAuthenticate}
          >
            Authenticatedsfsdasdfasdf
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Biometry;
