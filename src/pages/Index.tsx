import { useState } from "react";
import logo from "@/assets/logo.png";
import SliderInput from "@/components/SliderInput";
import SummaryCard from "@/components/SummaryCard";

const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatPct = (v: number) => `${v.toFixed(1)}%`;

const Index = () => {
  const [custoOp, setCustoOp] = useState(25000);
  const [horasMes, setHorasMes] = useState(160);
  const [horasManual, setHorasManual] = useState(80);
  const [meses, setMeses] = useState(6);
  const [horasApos, setHorasApos] = useState(40);

  // ANTES
  const pctManual = horasMes > 0 ? (horasManual / horasMes) * 100 : 0;
  const custoOpMes = horasMes > 0 ? (custoOp / horasMes) * horasManual : 0;
  const horasPeriodo = horasManual * meses;
  const custoOpPeriodo = custoOpMes * meses;

  // DEPOIS
  const horasLiberadas = horasManual - horasApos;
  const custoReduzidoMes = horasMes > 0 ? (custoOp / horasMes) * horasLiberadas : 0;
  const custoReduzidoPeriodo = custoReduzidoMes * meses;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={logo} alt="Camila Panozzo" className="h-14 w-auto" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Calculadora de Custo Operacional
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ajuste os parâmetros para ver o impacto estimado na sua operação
          </p>
        </div>

        {/* Sliders */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <SliderInput
            label="Custo Operacional (R$)"
            value={custoOp}
            min={0}
            max={50000}
            step={500}
            onChange={setCustoOp}
            formatValue={(v) => formatBRL(v)}
          />
          <SliderInput
            label="Horas/mês trabalhadas"
            value={horasMes}
            min={0}
            max={1000}
            step={1}
            onChange={setHorasMes}
            formatValue={(v) => `${v} h`}
          />
          <SliderInput
            label="Horas/mês em tarefa manual"
            value={horasManual}
            min={0}
            max={300}
            step={1}
            onChange={setHorasManual}
            formatValue={(v) => `${v} h`}
          />
          <SliderInput
            label="Nº de meses"
            value={meses}
            min={0}
            max={12}
            step={1}
            onChange={setMeses}
            formatValue={(v) => `${v} meses`}
          />
          <SliderInput
            label="Horas/mês em tarefa manual após ajuste"
            value={horasApos}
            min={0}
            max={300}
            step={1}
            onChange={setHorasApos}
            formatValue={(v) => `${v} h`}
          />
        </div>

        {/* Totalizadores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* ANTES */}
          <div className="rounded-lg border border-primary/30 p-5">
            <h2 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
              Antes do ajuste
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="% Horas Tarefa Manual" value={formatPct(pctManual)} />
              <SummaryCard label="Custo Operacional Mês" value={formatBRL(custoOpMes)} />
              <SummaryCard label="Horas no Período" value={`${horasPeriodo} h`} />
              <SummaryCard label="Custo Operacional Período" value={formatBRL(custoOpPeriodo)} />
            </div>
          </div>

          {/* DEPOIS */}
          <div className="rounded-lg border border-accent/30 p-5">
            <h2 className="text-sm font-semibold text-accent mb-4 uppercase tracking-wide">
              Depois do ajuste
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <SummaryCard label="Horas Liberadas/mês" value={`${horasLiberadas} h`} variant="after" />
              <SummaryCard label="Custo Reduzido Mês" value={formatBRL(custoReduzidoMes)} variant="after" />
              <SummaryCard
                label="Custo Reduzido Período"
                value={formatBRL(custoReduzidoPeriodo)}
                variant="after"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8">
          Os valores são estimativas ilustrativas para apoio à decisão.
        </p>
      </div>
    </div>
  );
};

export default Index;
