import { GroupDefinition } from "components/Group/GroupEditorRow";

export interface VizualOptions {
  numCards: number;
  bgTransparency: number;
  image: string;
  changeImgColor: boolean;
  groups: GroupDefinition[];
};

export interface VizualFieldConfig {
  fieldGroup?: number;
  showPrefix: boolean;
}
