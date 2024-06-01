import { Stack, Slot } from "expo-router"

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Slot />
        </Stack>
    )
}

export default StackLayout;