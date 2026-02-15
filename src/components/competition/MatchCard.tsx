import type { Match } from '../../types/competition'
import { cn } from '../../utils/cn'
import styles from './MatchCard.module.css'

interface MatchCardProps {
  match: Match
}

const compLevelLabels: Record<Match['compLevel'], string> = {
  qm: 'Qual',
  ef: 'Eighth',
  qf: 'QF',
  sf: 'SF',
  f: 'Final',
}

/** Extract the numeric part from a TBA team key (e.g. "frc1234" -> "1234"). */
function teamNumber(key: string): string {
  return key.replace(/^frc/, '')
}

function formatMatchTitle(match: Match): string {
  const label = compLevelLabels[match.compLevel]
  if (match.compLevel === 'qm') {
    return `${label} ${match.matchNumber}`
  }
  return `${label} ${match.setNumber}-${match.matchNumber}`
}

function formatTime(timestamp: number): string {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function MatchCard({ match }: MatchCardProps) {
  const redWins = match.winningAlliance === 'red'
  const blueWins = match.winningAlliance === 'blue'

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.matchTitle}>{formatMatchTitle(match)}</h4>
        {match.time > 0 && (
          <span className={styles.matchTime}>{formatTime(match.time)}</span>
        )}
      </div>

      <div className={styles.alliances}>
        {/* Red Alliance */}
        <div
          className={cn(styles.allianceRed, redWins && styles.allianceWinner)}
        >
          <div className={styles.teams}>
            {match.alliances.red.teamKeys.map((key) => (
              <span key={key} className={styles.teamNumber}>
                {teamNumber(key)}
              </span>
            ))}
          </div>
          <span className={styles.score}>
            {match.alliances.red.score >= 0 ? match.alliances.red.score : '-'}
          </span>
        </div>

        {/* Blue Alliance */}
        <div
          className={cn(styles.allianceBlue, blueWins && styles.allianceWinner)}
        >
          <div className={styles.teams}>
            {match.alliances.blue.teamKeys.map((key) => (
              <span key={key} className={styles.teamNumber}>
                {teamNumber(key)}
              </span>
            ))}
          </div>
          <span className={styles.score}>
            {match.alliances.blue.score >= 0
              ? match.alliances.blue.score
              : '-'}
          </span>
        </div>
      </div>
    </div>
  )
}
