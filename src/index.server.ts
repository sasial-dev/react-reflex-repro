import { createElement as e } from "@rbxts/react";
import { createLegacyRoot, createPortal } from "@rbxts/react-roblox";
import { Root } from "gui";
import { Janitor } from "janitor";

const toolbar = plugin.CreateToolbar("React-Reflex Repro");
const button = toolbar.CreateButton("Open Repro", "", "");

let enabled = false;
let clickDebounce = false;
const maid = new Janitor()
const onButtonClick = () => {
	if (clickDebounce === true) return;
	clickDebounce = true;

	if (enabled === false) {
		print("STARTUP")
		const PluginGui = plugin.CreateDockWidgetPluginGui(
			"ReproPlugin",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Left, true, true, 200, 400, 200, 350),
		);
		PluginGui.Name = "ReproPlugin";
		PluginGui.Title = "ReproPlugin";

		// currently a bug with plugins where they need a legacyRoot.
		const gui = createLegacyRoot(new Instance("Folder"));
		gui.render(createPortal(e(Root), PluginGui));

		maid.Add(() => gui.unmount());
		maid.Add(PluginGui);


		enabled = true;
	} else {
		maid.Cleanup()
		enabled = false;
	}
	button.SetActive(enabled);
	clickDebounce = false;
};

button.Click.Connect(onButtonClick);
plugin.Unloading.Connect(onButtonClick)
