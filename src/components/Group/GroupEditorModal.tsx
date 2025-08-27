import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { GrafanaTheme2 } from "@grafana/data";
import { useStyles2, Button, Modal } from "@grafana/ui";

import { GroupEditorRow, type GroupDefinition } from "./GroupEditorRow";

const getStyles = (theme: GrafanaTheme2) => ({
  tableWrap: css({
    // TODO remove maxHeight/overflow when Modal.ButtonRow is sticky
    maxHeight: 'calc(80vh - 170px)',
    overflow: 'auto',
    minHeight: '40px',
  }),

  editTable: css({
    width: '100%',
    marginBottom: theme.spacing(2),

    'thead th': {
      textAlign: 'center',
    },

    'tbody tr:hover': {
      background: theme.colors.action.hover,
    },

    ' th, td': {
      padding: theme.spacing(1),
    },
  }),
});

export interface Props {
    value: GroupDefinition[];
    onChange: (groups: GroupDefinition[]) => void;
    onClose: () => void;
}

export const GroupEditorModal = ({value, onChange, onClose}: Props) => {
    const styles = useStyles2(getStyles);

    const [rows, updateRows] = useState<GroupDefinition[]>([]);
    useEffect(() => {
        updateRows(value ?? []);
    }, [value]);

    const onAddGroup = () => {
        updateRows([
            ...rows, 
            {
                name: undefined,
                cardId: 0
            }
        ])
    }
    const onChangeRow = (idx: number, row: GroupDefinition) => {
        const list = [...rows];
        list.splice(idx, 1, row);
        updateRows(list);
    }
    const onRemoveRow = (idx: number) => {
        const list = [...rows];
        list.splice(idx, 1);
        updateRows(list);
    }
    const onUpdate = () => {
        onChange(rows);
        onClose();
    }

    return (
        <>
            <div className={styles.tableWrap}>
                <table className={styles.editTable}>
                    <thead>
                        <tr>
                            <th style={{textAlign: "left"}} colSpan={1}>Name</th>
                            <th style={{textAlign: "left"}} colSpan={1}>Card ID</th>
                            <th style={{width: "1%"}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <GroupEditorRow 
                                key={idx}
                                group={row}
                                index={idx}
                                onChange={onChangeRow}
                                onRemove={onRemoveRow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal.ButtonRow
                leftItems={
                    <Button variant="primary" icon="plus" size="md" onClick={onAddGroup}>Add group</Button>
                }
            >
                <Button variant="secondary" fill="outline" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onUpdate}>Update</Button>
            </Modal.ButtonRow>
        </>
    );
};
