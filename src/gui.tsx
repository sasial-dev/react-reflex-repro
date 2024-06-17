import React from "@rbxts/react";
import { ReflexProvider, useProducer, useSelector } from "@rbxts/react-reflex";
import { producer } from "store";

export const Root = React.memo(() => {
    return <ReflexProvider producer={producer}>
        <NavBar />
        <Route />
    </ReflexProvider>
})

export const NavBar = React.memo(() => {
    const producer = useProducer<typeof import("./store")["producer"]>()

    return ["/", "/a", "/b", "/c", "/d"].map((route, index) => (
        <textbutton Text={route} Size={UDim2.fromScale(0.2, 0.1)} Position={UDim2.fromScale(index * 0.2, 0)} Event={{
            MouseButton1Up: () => producer.updateRoute(route)
        }} />
    ))
})

export const Route = React.memo(() => {
    const route = useSelector<string>((state) => state)

    return <textlabel Text={route} Position={UDim2.fromScale(0, 0.1)} Size={UDim2.fromScale(1, 0.9)}></textlabel>
})
