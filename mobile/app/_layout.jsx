import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Items',
        }}
      />
      <Stack.Screen
        name="items/[id]"
        options={{
          title: 'Item Details',
        }}
      />
      <Stack.Screen
        name="items/create"
        options={{
          title: 'Create Item',
        }}
      />
    </Stack>
  );
}
