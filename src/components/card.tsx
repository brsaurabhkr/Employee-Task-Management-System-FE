import * as React from "react"

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ")
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  ),
)

Card.displayName = "Card"

export { Card }
