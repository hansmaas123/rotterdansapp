
import { Tabs } from "expo-router"


export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="Map" />
            <Tabs.Screen name="Programma" />
            <Tabs.Screen name="Qr" />
            <Tabs.Screen name="Collectie" />
            <Tabs.Screen name="Profile" />
        </Tabs>
    )
}