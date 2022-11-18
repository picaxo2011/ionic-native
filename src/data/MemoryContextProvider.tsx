import React, { useCallback, useEffect, useState } from "react";
import MemoriesContext, { Memory, MemoryType } from "./memories-context";
import { Preferences } from "@capacitor/preferences";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Photo } from "../components/ImagePicker";

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
}

const MemoriesContextProvider: React.FC<any> = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const storableMemories = memories.map((memory) => {
      return {
        id: memory.id,
        title: memory.title,
        imagePath: memory.imagePath,
        type: memory.type,
      };
    });
    Preferences.set({
      key: "memories",
      value: JSON.stringify(storableMemories),
    });
  }, [memories]);

  const addMemory = async (
    takenPhoto: Photo,
    title: string,
    type: MemoryType
  ) => {
    const fileName = new Date().getTime() + ".jpeg";
    const base64 = await base64FromPath(takenPhoto!.preview);
    Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data,
    });

    const newMemory: Memory = {
      id: Math.random().toString(),
      base64Url: base64,
      title,
      type,
      imagePath: fileName,
    };
    setMemories((curMemories) => {
      return [...curMemories, newMemory];
    });
  };

  const initContext = useCallback(async () => {
    const memoriesData = await Preferences.get({ key: "memories" });
    const storedMemories = memoriesData.value
      ? JSON.parse(memoriesData.value)
      : [];
    const loadedMemories: Memory[] = [];
    for (const storedMemory of storedMemories) {
      const file = await Filesystem.readFile({
        path: storedMemory.imagePath,
        directory: Directory.Data,
      });
      loadedMemories.push({
        id: storedMemory.id,
        title: storedMemory.title,
        type: storedMemory.type,
        imagePath: storedMemory.imagePath,
        base64Url: "data:image/jpeg;base64," + file.data,
      });
    }
    setMemories(loadedMemories);
  }, []);

  return (
    <MemoriesContext.Provider value={{ memories, addMemory, initContext }}>
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
