interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: string
  borderWidth?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-24 w-24",
}

const borderWidthClasses = {
  sm: "border-4",
  md: "border-8",
  lg: "border-12",
  xl: "border-16",
}

export default function Loading({
  size = "md",
  color = "var(--secondary-4)",
  borderWidth = "md",
  className = "",
}: LoadingProps) {
  return (
    <div
      className={`animate-spin rounded-full ${borderWidthClasses[borderWidth]} border-current border-t-transparent ${sizeClasses[size]} ${className}`}
      style={{ color }}
    />
  )
}
