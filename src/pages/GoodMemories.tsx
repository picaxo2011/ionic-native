import React, { useContext, useEffect, useState } from "react";
import MemoriesContent from "../components/MemoriesContent";
import MemoriesContext from "../data/memories-context";

const GoodMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter((m) => m.type === "good");

  return (
    <>
      <MemoriesContent
        memories={goodMemories}
        title="Good Memories"
        fallBackText="No good memories found."
      />
    </>
  );
};
export default GoodMemories;
