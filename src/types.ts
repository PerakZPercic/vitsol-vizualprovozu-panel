import { GroupDefinition } from "components/GroupEditorRow";

export interface VizualOptions {
  numFields: number;
  bgTransparency: number;
  image: string;
  changeSvgColor: boolean;
  groups: GroupDefinition[];
};
