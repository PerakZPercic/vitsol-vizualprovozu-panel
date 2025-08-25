import React, { useCallback } from "react";
import { IconButton, Input } from "@grafana/ui";

export interface GroupDefinition {
    name?: string;
    fieldId: number;
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
        let val = Math.floor(parseFloat(event.currentTarget.value));
        event.currentTarget.value = (Number.isNaN(val) ? 0 : val).toString();
        update(g => g.fieldId = (Number.isNaN(val) ? 0 : val));
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
                    value={group.fieldId}
                    placeholder="Field id"
                    onChange={onIdUpdate}
                />
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
