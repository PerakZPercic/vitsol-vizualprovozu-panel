import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { VizualOptions } from './types';
import { VizualPanel } from 'components/VizualPanel';

export const plugin = new PanelPlugin<VizualOptions>(VizualPanel).useFieldConfig({
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
  ]
})
.setPanelOptions(bldr => {
  return bldr.addNumberInput({
    path: "numFields",
    name: "Počet hodnot ve vizuálu",
    defaultValue: 2
  })
  .addSliderInput({
    path: "bgTransparency",
    name: "Průhlednost pozadí karty",
    defaultValue: 0.8,
    settings: {
      min: 0,
      max: 1,
      step: 0.01
    }
  })
  .addTextInput({
    path: "image",
    name: "Obrázek k vizuálu",
    defaultValue: ""
  })
  .addBooleanSwitch({
    path: "changeSvgColor",
    name: "Přebarvit obrázek podle pozadí",
    defaultValue: false
  })
});
