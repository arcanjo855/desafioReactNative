import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen options={{ headerShown: false }}></Tabs.Screen>
    </Tabs>
  );
}
