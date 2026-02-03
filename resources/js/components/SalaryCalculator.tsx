import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface SalaryCalculatorProps {
    baseSalary: number;
    commissions?: number;
    bonuses?: number;
    overtimeValue?: number;
    otherIncome?: number;
    loans?: number;
    workErrors?: number;
    otherDeductions?: number;
}

interface TaxCalculation {
    grossSalary: number;
    sfsAmount: number;
    afpAmount: number;
    isrAmount: number;
    totalDeductions: number;
    netSalary: number;
    deductionPercentage: number;
    annual: {
        grossSalary: number;
        sfsAmount: number;
        afpAmount: number;
        isrAmount: number;
        totalDeductions: number;
        netSalary: number;
    };
}

const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({
    baseSalary = 0,
    commissions = 0,
    bonuses = 0,
    overtimeValue = 0,
    otherIncome = 0,
    loans = 0,
    workErrors = 0,
    otherDeductions = 0,
}) => {
    const calculation = useMemo((): TaxCalculation => {
        // Calculate gross salary
        const grossSalary = baseSalary + commissions + bonuses + overtimeValue + otherIncome;

        // SFS (Seguro Familiar de Salud) - 3.04%
        const sfsAmount = Math.round(grossSalary * 0.0304 * 100) / 100;

        // AFP (Administradora de Fondos de Pensiones) - 2.87%
        const afpAmount = Math.round(grossSalary * 0.0287 * 100) / 100;

        // Calculate ISR (Impuesto Sobre la Renta)
        const annualGross = grossSalary * 12;
        const annualTSS = (sfsAmount + afpAmount) * 12;
        const annualAfterTSS = annualGross - annualTSS;

        let annualISR = 0;
        const EXEMPT_THRESHOLD = 416220.00;
        const BRACKET_1_MAX = 624329.00;
        const BRACKET_2_MAX = 867123.00;

        if (annualAfterTSS > EXEMPT_THRESHOLD) {
            if (annualAfterTSS <= BRACKET_1_MAX) {
                annualISR = (annualAfterTSS - EXEMPT_THRESHOLD) * 0.15;
            } else if (annualAfterTSS <= BRACKET_2_MAX) {
                annualISR = 31216.00 + ((annualAfterTSS - BRACKET_1_MAX) * 0.20);
            } else {
                annualISR = 79776.00 + ((annualAfterTSS - BRACKET_2_MAX) * 0.25);
            }
        }

        const isrAmount = Math.round((annualISR / 12) * 100) / 100;

        // Total deductions
        const totalDeductions = sfsAmount + afpAmount + isrAmount + loans + workErrors + otherDeductions;

        // Net salary
        const netSalary = grossSalary - totalDeductions;

        // Deduction percentage
        const deductionPercentage = grossSalary > 0 ? Math.round((totalDeductions / grossSalary) * 10000) / 100 : 0;

        return {
            grossSalary,
            sfsAmount,
            afpAmount,
            isrAmount,
            totalDeductions,
            netSalary,
            deductionPercentage,
            annual: {
                grossSalary: annualGross,
                sfsAmount: sfsAmount * 12,
                afpAmount: afpAmount * 12,
                isrAmount: annualISR,
                totalDeductions: totalDeductions * 12,
                netSalary: netSalary * 12,
            },
        };
    }, [baseSalary, commissions, bonuses, overtimeValue, otherIncome, loans, workErrors, otherDeductions]);

    const formatCurrency = (amount: number) => {
        return `RD$${amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    if (calculation.grossSalary === 0) {
        return (
            <div className="text-center text-muted-foreground py-8">
                Ingrese un salario para ver el cálculo de deducciones
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Net Salary Card */}
            <Card className="bg-muted/30 border-2">
                <div className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Tu salario neto mensual</p>
                    <h2 className="text-4xl font-bold">
                        {formatCurrency(calculation.netSalary)}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Quincenal: {formatCurrency(calculation.netSalary / 2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        💡 Deducciones: {calculation.deductionPercentage}% del salario bruto
                    </p>
                </div>
            </Card>

            {/* Monthly Deductions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* AFP */}
                <Card className="border">
                    <div className="p-4">
                        <p className="text-sm font-medium mb-1">AFP (Pensiones)</p>
                        <p className="text-xs text-muted-foreground mb-2">2.87% del salario bruto</p>
                        <p className="text-lg font-bold">
                            {formatCurrency(calculation.afpAmount)}
                        </p>
                    </div>
                </Card>

                {/* SFS */}
                <Card className="border">
                    <div className="p-4">
                        <p className="text-sm font-medium mb-1">SFS (Seguro de salud)</p>
                        <p className="text-xs text-muted-foreground mb-2">3.04% del salario bruto</p>
                        <p className="text-lg font-bold">
                            {formatCurrency(calculation.sfsAmount)}
                        </p>
                    </div>
                </Card>

                {/* ISR */}
                <Card className="border">
                    <div className="p-4">
                        <p className="text-sm font-medium mb-1">ISR (Impuesto)</p>
                        <p className="text-xs text-muted-foreground mb-2">Basado en escala impositiva</p>
                        <p className="text-lg font-bold">
                            {formatCurrency(calculation.isrAmount)}
                        </p>
                    </div>
                </Card>

                {/* Total Deductions */}
                <Card className="border">
                    <div className="p-4">
                        <p className="text-sm font-medium mb-1">Total deducciones</p>
                        <p className="text-xs text-muted-foreground mb-2">Suma de todas las deducciones</p>
                        <p className="text-lg font-bold">
                            {formatCurrency(calculation.totalDeductions)}
                        </p>
                    </div>
                </Card>
            </div>

            {/* Gross vs Net */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-1">Salario bruto mensual</p>
                    <p className="text-xl font-bold">
                        {formatCurrency(calculation.grossSalary)}
                    </p>
                </Card>
                <Card className="p-4 bg-muted/20">
                    <p className="text-sm text-muted-foreground mb-1">Salario neto mensual</p>
                    <p className="text-xl font-bold">
                        {formatCurrency(calculation.netSalary)}
                    </p>
                </Card>
            </div>

            {/* Annual Projections */}
            <Card className="border">
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold">Resultados anuales</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div>
                            <p className="text-muted-foreground">AFP fondos de pensiones (Anual)</p>
                            <p className="font-semibold">{formatCurrency(calculation.annual.afpAmount)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">SFS seguro familiar de salud (Anual)</p>
                            <p className="font-semibold">{formatCurrency(calculation.annual.sfsAmount)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">ISR impuestos sobre la renta (Anual)</p>
                            <p className="font-semibold">{formatCurrency(calculation.annual.isrAmount)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Total de deducciones anuales</p>
                            <p className="font-semibold">{formatCurrency(calculation.annual.totalDeductions)}</p>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-muted-foreground">Salario neto anual</p>
                            <p className="text-lg font-bold">{formatCurrency(calculation.annual.netSalary)}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SalaryCalculator;
