export interface SettingType {
  layout: {
    current: string;
    params: {
      grid?: {
        columns: number;
        rows: number;
      };
      masonry?: {
        columns: number;
        rows: number;
      };
    };
  };
  template: string;
  navigation: string;
}
