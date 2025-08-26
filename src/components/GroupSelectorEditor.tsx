import React, { memo, useEffect, useState } from "react";
import { FieldConfig, StandardEditorProps } from "@grafana/data";
import { GroupDefinition } from "./GroupEditorRow";
import { Combobox, ComboboxOption } from "@grafana/ui";
import { VizualFieldConfig, VizualOptions } from "types";

export const GroupSelectorEditor = memo((props: StandardEditorProps<GroupDefinition>) => {
    const { value, onChange, context } = props;
    const [options, setOptions] = useState<Array<ComboboxOption<number>>>([]);

    let cfg: FieldConfig<VizualFieldConfig> = context.data[0].fields[0].config;
    console.log(cfg.custom)

    const onDropChange = (val: ComboboxOption<number>) => {

    };

    return (
        <Combobox options={options} onChange={onDropChange}>

        </Combobox>
    );
});
