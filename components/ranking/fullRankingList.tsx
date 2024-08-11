import React, { useRef } from 'react';
import Image from 'next/image';
import styles from './fullRankingList.module.css';
import InfiniteScroll from 'react-infinite-scroller';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string;
  rank: number;
  imageUrl?: string;
}

interface FullRankingListProps {
  rankings: Student[];
  currentUser: Student | null;
  activeTab: 'daily' | 'weekly' | 'monthly';
  loadMore: () => void;
  hasMore: boolean;
}

function FullRankingList({ rankings, currentUser, activeTab, loadMore, hasMore }: FullRankingListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const otherRankings = rankings.filter((student) => student.name !== currentUser?.name);
  const allRankings = currentUser ? [currentUser, ...otherRankings] : otherRankings;

  const timeLabel = activeTab === 'daily' ? '일간 시간' : activeTab === 'weekly' ? '주간 시간' : '월간 시간';

  return (
    <div className={styles.full_ranking_container} ref={containerRef}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className={styles.loader} key={0}>
            Loading...
          </div>
        }
        useWindow={false} // Ensure that scrolling is not applied to the window
        getScrollParent={() => containerRef.current} // Target the specific scroll container
      >
        <table className={styles.full_ranking_table_wrap}>
          <thead className={styles.full_ranking_thead_wrap}>
            <tr className={styles.full_ranking_tr}>
              <th>순위</th>
              <th></th>
              <th>이름</th>
              <th></th>
              <th>반</th>
              <th>{timeLabel}</th> {/* Time label based on tab */}
              <th>누적시간</th>
            </tr>
          </thead>
          <tbody className={styles.full_ranking_tbody_wrap}>
            {allRankings.map((student) => (
              <tr key={student.id} className={styles.full_ranking_student}>
                <td>{student.rank}</td>
                <td>
                  {student.imageUrl && (
                    <Image src={student.imageUrl} alt="Student Image" className={styles.student_image} />
                  )}
                </td>
                <td>
                  {student.name}
                  {currentUser && student.id === currentUser.id && (
                    <span className={styles.current_user_label}> (나)</span>
                  )}
                </td>
                <td></td>
                <td>{student.class}</td>
                <td>{student.studyTime}</td>
                <td>{student.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default FullRankingList;
