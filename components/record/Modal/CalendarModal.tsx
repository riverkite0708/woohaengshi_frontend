'use client';

import styles from './CalendarModal.module.css';
import { Box, Dialog, Flex, Inset, Tabs, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEventStore, useSelectedMonthStore, useSelectedYearStore, useTextareaStore } from '@/store/recordStore';
import { levelColor } from '@/utils/levelUtils';
import ModalInTabEdit from './ModalInTabEdit';
import { useEffect } from 'react';

export default function CalendarModal({
  nowDate,
  record,
  onClose,
}: {
  nowDate: number;
  record: IRecord;
  onClose: () => void;
}) {
  const record_color: string = levelColor(record.time);

  const { selectedYear } = useSelectedYearStore();
  const { selectedMonth } = useSelectedMonthStore();
  const { setEventChange } = useEventStore();

  const { textValue, setTextValue } = useTextareaStore();

  // 모달 열리면 이벤트 감지 초기화
  useEffect(() => {
    setEventChange(false);
  }, [setEventChange]);

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Content maxWidth="640px" height="600px" aria-describedby={undefined}>
        <Box className="modal_content">
          <Inset side="x">
            <Flex align="center" className="modal_header">
              <Flex justify="between" align="center">
                <Dialog.Title>
                  {selectedYear}.{selectedMonth}.{nowDate}
                </Dialog.Title>
                <Flex align="center" gap="10px" className="right">
                  <Dialog.Close>
                    <button className="btn_close">
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Flex>
              </Flex>
            </Flex>
          </Inset>
          <Box py="5" className={styles.modal_body}>
            <Tabs.Root defaultValue="view">
              <Tabs.List>
                <Tabs.Trigger value="view">그날의 기록</Tabs.Trigger>
                <Tabs.Trigger value="edit">편집하기</Tabs.Trigger>
              </Tabs.List>
              <Box pt="3">
                <Tabs.Content value="view">
                  <ul className={`${styles.subject_list} ${styles[record_color]}`}>
                    {record.subjects.length > 0 &&
                      record.subjects.map((subject) => {
                        return (
                          <li key={`${nowDate}${subject.name}`}>
                            <Text as="p" size="2">
                              {subject.name}
                            </Text>
                          </li>
                        );
                      })}
                  </ul>
                </Tabs.Content>
                <Tabs.Content value="edit">
                  <ModalInTabEdit />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
