import React, { memo, useCallback, useState } from "react";
import { css } from "@emotion/css";
import { GrafanaTheme2, StandardEditorProps } from "@grafana/data";
import { useStyles2, Button, Stack, Modal } from "@grafana/ui";

import { GroupEditorModal } from "./GroupEditorModal";
import { GroupDefinition } from "./GroupEditorRow";

const getStyles = (theme: GrafanaTheme2) => ({
  modal: css({
    width: '650px',
  }),
});

export const GroupEditor = memo((props: StandardEditorProps<GroupDefinition[]>) => {
    const { value, onChange } = props;
    const styles = useStyles2(getStyles);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <Stack direction="column">
            <Button variant="secondary" size="sm" fullWidth onClick={() => setIsOpen(true)}>
                {(value === undefined || value.length === 0) ? "Add groups" : "Edit groups"}
            </Button>

            <Modal
                className={styles.modal}
                isOpen={isOpen}
                title="Groups"
                onDismiss={onClose}
                closeOnBackdropClick={false}
            >
                <GroupEditorModal 
                    value={value} 
                    onChange={onChange}
                    onClose={onClose} 
                />
            </Modal>
        </Stack>
    );
});
GroupEditor.displayName = "GroupEditor";
