import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { VizualFieldConfig, VizualOptions } from './types';
import { VizualPanel } from 'components/VizualPanel';
import { GroupEditor } from 'components/Group/GroupEditor';

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
    return builder.addNumberInput({
      path: "fieldGroup",
      name: "Group",
      defaultValue: undefined,
      hideFromDefaults: true,
      settings: {
        step: 1,
        min: 0
      }
    })
    .addBooleanSwitch({
      path: "showPrefix",
      name: "Show prefix",
      description: "Prefixes the value with the field name",
      defaultValue: false,
      hideFromDefaults: true
    })
  },
})
.setPanelOptions(bldr => {
  return bldr.addNumberInput({
    path: "numCards",
    name: "Fields",
    description: "Number of cards in the vizual",
    defaultValue: 2,
  })
  .addSliderInput({
    path: "bgTransparency",
    name: "Card transparency",
    description: "Background transparency of the card",
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
    path: "changeImgColor",
    name: "Change image color",
    description: "Change color based on theme",
    defaultValue: false
  })
  .addCustomEditor({
    id: "groups",
    path: "groups",
    name: "Groups",
    editor: GroupEditor,
    defaultValue: []
  })
});
