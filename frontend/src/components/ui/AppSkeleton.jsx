import React from "react";

import { Skeleton } from "moti/skeleton";

import { useAppTheme } from "@/hooks/useAppTheme";

export default function AppSkeleton({ width = "100%", height, radius = 8, ...props }) {
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
}
