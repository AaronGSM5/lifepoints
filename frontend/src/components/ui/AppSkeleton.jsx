import React, { memo } from "react";

import { Skeleton } from "moti/skeleton";

import { useAppTheme } from "@/hooks/useAppTheme";

const AppSkeleton = memo(({ width = "100%", height, radius = 8, ...props }) => {
  const MyTheme = useAppTheme();

  return (
    <Skeleton
      colorMode={MyTheme.isDark ? "dark" : "light"}
      transition={{ type: "timing", duration: 1500 }}
      width={width}
      height={height}
      radius={radius}
      {...props}
    />
  );
});
AppSkeleton.displayName = "AppSkeleton";

export default AppSkeleton;
