import React, { useCallback } from "react";
import { ColorPicker, IconButton, Input } from "@grafana/ui";
import { Color, ColorHelper, ToRGBA } from "utils/ColorHelper";

export interface GroupDefinition {
    name?: string;
    cardId: number;
    color: Color | null;
};

interface Props {
    group: GroupDefinition;
    index: number;
    onChange: (idx: number, row: GroupDefinition) => void;
    onRemove: (idx: number) => void;
}

export const GroupEditorRow = ({ group, index, onChange, onRemove }: Props) => {
    const update = useCallback((fn: (it: GroupDefinition) => void) => {
        const copy = {
            ...group
        };
        fn(copy);
        onChange(index, copy);
    }, [group, index, onChange]);

    const onNameUpdate = (event: React.FormEvent<HTMLInputElement>) => {
        update(g => g.name = event.currentTarget.value);
    }
    const onIdUpdate = (event: React.FormEvent<HTMLInputElement>) => {
        let val = Math.floor(parseFloat(event.currentTarget.value) ?? "0");
        event.currentTarget.value = (Number.isNaN(val) ? 0 : val).toString();
        update(g => g.cardId = (Number.isNaN(val) ? 0 : val));
    }
    const onColorUpdate = (c: string) => {
        update(g => g.color = ColorHelper(c));
    }

    return (
        <tr>
            <td>
                <Input 
                    type="string"
                    value={group.name ?? ""}
                    placeholder="Group name"
                    onChange={onNameUpdate}
                />
            </td>
            <td>
                <Input 
                    type="number"
                    value={group.cardId}
                    placeholder="Field id"
                    onChange={onIdUpdate}
                />
            </td>
            <td>
                <ColorPicker onChange={onColorUpdate} color={group.color === null ? "#000000" : ToRGBA(group.color, 1)} enableNamedColors />
            </td>
            <td>
                <IconButton 
                    name="trash-alt"
                    onClick={() => onRemove(index)}
                    aria-label="Delete group"
                />
            </td>
        </tr>
    );
};
