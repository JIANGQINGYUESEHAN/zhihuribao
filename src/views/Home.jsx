import React, { useState } from "react";
import HomeHead from "../component/HomeHead/HomeHead";
import utils from "../assets/utils";

export default function Home() {
  const [today, _] = useState(() => {
    return utils.formatTime(null, "{0}{1}{2}");
  });

  return (
    <>
      <HomeHead today={today} />
    </>
  );
}
