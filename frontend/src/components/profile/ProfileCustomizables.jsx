import React from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { Spacing } from "@/constants/Spacing";
import { MyTheme } from "@/constants/Colors";
import SectionHeader from "../ui/SectionHeader";
import CustomizablesCard from "../customizables/CustomizablesCard";

const CustomizablesPreview = ({ isLoading, customizables, skeletonProps }) => {
  if (!isLoading && (!customizables || customizables.length === 0)) {
    return null;
  }

  return (
    <View style={{ marginTop: Spacing.xl, marginBottom: Spacing.md }}>
      <SectionHeader
        title={"Customizables"}
        icon={"star"}
        iconColor={MyTheme.primaryAccent}
        rightLabel={"See all"}
        rightLabelColor={MyTheme.primaryAccent}
        onRightPress={() => router.push("/customizables")}
        isLoading={isLoading}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.md }}>
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={`skel-custom-${i}`}
              {...skeletonProps}
              width={80}
              height={80}
              radius={Spacing.borderRadius.lg}
            />
          ))}
        {!isLoading &&
          customizables.map((item, i) => (
            <View key={`custom-${item?.id || i}`} style={{ width: 80 }}>
              <CustomizablesCard
                id={item.id}
                name={item.name}
                icon={item.icon || "circle"}
                color={item.color || MyTheme.text}
                isActive={false}
                unlocked={true}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default CustomizablesPreview;
