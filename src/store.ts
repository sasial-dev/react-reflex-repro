import { createProducer } from "@rbxts/reflex";

export const producer = createProducer("/", {
    updateRoute: (oldState: string, newState: string) => {
        print("STORE UPDATING FROM", oldState, "TO", newState)
        return newState
    }
})
