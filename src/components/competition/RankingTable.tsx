import type { Ranking } from '../../types/competition'
import { cn } from '../../utils/cn'
import styles from './RankingTable.module.css'

interface RankingTableProps {
  rankings: Ranking[]
}

/** Extract the numeric part from a TBA team key (e.g. "frc1234" -> "1234"). */
function teamNumber(key: string): string {
  return key.replace(/^frc/, '')
}

export default function RankingTable({ rankings }: RankingTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>排名</th>
            <th>队伍</th>
            <th>战绩 (W-L-T)</th>
            <th>均分</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking) => (
            <tr
              key={ranking.teamKey}
              className={cn(ranking.rank <= 8 && styles.topRow)}
            >
              <td>{ranking.rank}</td>
              <td>
                <span className={styles.teamNumber}>
                  {teamNumber(ranking.teamKey)}
                </span>
              </td>
              <td>
                <span className={styles.record}>
                  {ranking.record.wins}-{ranking.record.losses}-
                  {ranking.record.ties}
                </span>
              </td>
              <td>
                <span className={styles.qualAverage}>
                  {ranking.qualAverage != null
                    ? ranking.qualAverage.toFixed(2)
                    : '-'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
