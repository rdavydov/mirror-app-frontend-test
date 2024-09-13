import React from "react";
import { useSettingsStore } from "../../store/settingsStore";

const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();

  React.useEffect(() => {
    updateSettings();
  }, [updateSettings]);

  const currentLayout = settings.layout.current;

  return (
    <div className="settings-panel">
      <p>
        Layout: <span className="value">{currentLayout}</span>
      </p>
      <p>
        Columns:{" "}
        <span className="value">
          {settings.layout.params[currentLayout]?.columns || 0}
        </span>
      </p>

      <p>
        Rows:{" "}
        <span className="value">
          {settings.layout.params[currentLayout]?.rows || 0}
        </span>
      </p>
      <p>
        Template: <span className="value">{settings.template}</span>
      </p>
      <p>
        Navigation: <span className="value">{settings.navigation}</span>
      </p>
      <button className="update-settings-button" onClick={updateSettings}>
        Обновить настройки
      </button>
    </div>
  );
};

export default SettingsPanel;
