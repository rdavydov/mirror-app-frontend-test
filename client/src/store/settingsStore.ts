import create from "zustand";
import { SettingType } from "../entities/setting.entity";
import { useSettingsService } from "../features/settings/service.ts";

type SettingsState = {
  settings: SettingType;
  updateSettings: () => Promise<void>;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    layout: { current: "", params: {} },
    template: "",
    navigation: "",
  },
  updateSettings: async () => {
    try {
      const newSettings = await useSettingsService.getSettings();
      set({ settings: newSettings });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  },
}));
