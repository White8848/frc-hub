import { cn } from '../../utils/cn'
import styles from './FilterBar.module.css'

interface FilterOption {
  label: string
  value: string
}

interface FilterBarProps {
  options: FilterOption[]
  activeValue: string
  onChange: (value: string) => void
  className?: string
}

export default function FilterBar({
  options,
  activeValue,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            styles.chip,
            option.value === activeValue && styles.chipActive
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
