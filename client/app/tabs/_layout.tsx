
import { Tabs } from "expo-router"


export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="map" />
            <Tabs.Screen name="programma" />
            <Tabs.Screen name="qr" />
            <Tabs.Screen name="collectie" />
            <Tabs.Screen name="profile" />
        </Tabs>
    )
}