interface SummaryCardProps {
  label: string;
  value: string;
  variant?: "before" | "after";
}

const SummaryCard = ({ label, value, variant = "before" }: SummaryCardProps) => {
  return (
    <div className={`rounded-lg border p-4 text-center transition-all ${
      variant === "after" ? "border-accent bg-accent/5" : "border-border bg-card"
    }`}>
      <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-bold ${variant === "after" ? "text-accent" : "text-foreground"}`}>{value}</p>
    </div>
  );
};

export default SummaryCard;
