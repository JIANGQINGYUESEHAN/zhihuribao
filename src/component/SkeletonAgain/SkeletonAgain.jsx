import React from "react";
import { Skeleton } from "antd-mobile";
import "./SkeletonAgain.less";
export default function SkeletonAgain() {
  return (
    <div className="SkeletonAgain">
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
}
