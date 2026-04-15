import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

const SliderInput = ({ label, value, min, max, step = 1, onChange, formatValue }: SliderInputProps) => {
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className="flex items-center gap-4 py-3">
      <span className="text-sm font-medium text-foreground min-w-[280px]">{label}</span>
      <div className="flex-1">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(v) => onChange(v[0])}
          className="w-full"
        />
      </div>
      <span className="text-sm font-semibold text-foreground min-w-[100px] text-right">{displayValue}</span>
    </div>
  );
};

export default SliderInput;
