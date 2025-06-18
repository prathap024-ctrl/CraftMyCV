// components/ui/gauge.jsx
import { cn } from "@/lib/utils"

export function Gauge({ value, size = "medium", className }) {
  const sizeClasses = {
    small: "h-3 w-16",
    medium: "h-4 w-24",
    large: "h-6 w-32"
  }

  return (
    <div className={cn("relative overflow-hidden rounded-full bg-secondary", sizeClasses[size], className)}>
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}