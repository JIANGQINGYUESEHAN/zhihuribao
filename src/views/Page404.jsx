import React from "react";
import { ErrorBlock } from "antd-mobile";

export default function Page404() {
  return (
    <div>
      <ErrorBlock
        status="empty"
        title="您访问的页面不存在"
        description="去逛逛其他页面吧"
      />
    </div>
  );
}
