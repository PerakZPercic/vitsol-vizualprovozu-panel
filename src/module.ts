import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { VizualFieldConfig, VizualOptions } from './types';
import { VizualPanel } from 'components/VizualPanel';
import { GroupEditor } from 'components/GroupEditor';
import { GroupSelectorEditor } from 'components/GroupSelectorEditor';

export const plugin = new PanelPlugin<VizualOptions, VizualFieldConfig>(VizualPanel).useFieldConfig({
  disableStandardOptions: [
    FieldConfigProperty.Thresholds,
    FieldConfigProperty.Filterable,
    FieldConfigProperty.FieldMinMax,
    FieldConfigProperty.Min,
    FieldConfigProperty.Max,
    FieldConfigProperty.Decimals,
    FieldConfigProperty.Unit,
    FieldConfigProperty.Actions,
    FieldConfigProperty.NoValue
  ],
  standardOptions: {
    [FieldConfigProperty.DisplayName]: {
      hideFromDefaults: true
    },
    [FieldConfigProperty.Color]: {
      hideFromDefaults: true
    },
    [FieldConfigProperty.Links]: {
      hideFromDefaults: true
    },
    [FieldConfigProperty.Mappings]: {
      hideFromDefaults: true
    }
  },
  useCustomConfig(builder) {
    return builder.addCustomEditor({
      id: "groups",
      path: "groups",
      name: "Groups",
      editor: GroupEditor,
      override: GroupEditor,
      process(value, context, settings) {
        return value;
      },
      shouldApply() {
        return true;
      },
      hideFromOverrides: true
    }).addCustomEditor({
      id: "fieldGroup",
      path: "fieldGroup",
      name: "Group",
      editor: GroupSelectorEditor,
      override: GroupSelectorEditor,
      process(value, context, settings) {
        return value;
      },
      shouldApply() {
        return true
      },
      hideFromDefaults: true
    })
  },
})
.setPanelOptions(bldr => {
  return bldr.addNumberInput({
    path: "numFields",
    name: "Fields",
    description: "Number of fields in the vizual",
    defaultValue: 2,
  })
  .addSliderInput({
    path: "bgTransparency",
    name: "Field transparency",
    description: "Background transparency of the fields",
    defaultValue: 0.8,
    settings: {
      min: 0,
      max: 1,
      step: 0.01
    }
  })
  .addTextInput({
    path: "image",
    name: "Image",
    description: "background image",
    defaultValue: ""
  })
  .addBooleanSwitch({
    path: "changeSvgColor",
    name: "Change image color",
    description: "Change color based on theme",
    defaultValue: false
  })
  /*.addCustomEditor({
    id: "groups",
    path: "groups",
    name: "Groups",
    editor: GroupEditor
  })*/
});
