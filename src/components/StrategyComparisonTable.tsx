import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, Info } from 'lucide-react';
import { FadeIn } from '@/components/ui/SimpleAnimations';

interface ImpulsoService {
  name: string;
  icon: string;
  basic: string;
  advanced: string;
  basicTooltip: string;
  advancedTooltip: string;
}

interface ImpulsoPlan {
  name: string;
  subtitle: string;
  isPopular: boolean;
}

interface StrategyComparisonTableProps {
  services: ImpulsoService[];
  plans: ImpulsoPlan[];
  delay?: number;
}

const StrategyComparisonTable: React.FC<StrategyComparisonTableProps> = React.memo(({ 
  services, 
  plans, 
  delay = 0 
}) => {
  return (
    <FadeIn delay={delay}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Servicio</th>
                  {plans.map((plan, index) => (
                    <th key={index} className="text-center p-4 font-semibold">
                      <div className="space-y-2">
                        <div className="text-lg font-bold">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.subtitle}</div>
                        {plan.isPopular && (
                          <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mx-auto w-fit">
                            Más Popular
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service, serviceIndex) => (
                  <tr key={serviceIndex} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{service.name}</h4>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center space-x-2">
                              {service.basic === 'checkmark' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <span className="text-xs font-medium text-primary max-w-xs">
                                  {service.basic}
                                </span>
                              )}
                              <Info className="h-4 w-4 text-primary cursor-help" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm p-3">
                            <div className="whitespace-pre-line text-sm">
                              {service.basicTooltip}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="text-center p-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center space-x-2">
                              {service.advanced === 'checkmark' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <span className="text-xs font-medium text-primary max-w-xs">
                                  {service.advanced}
                                </span>
                              )}
                              <Info className="h-4 w-4 text-primary cursor-help" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm p-3">
                            <div className="whitespace-pre-line text-sm">
                              {service.advancedTooltip}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
});

StrategyComparisonTable.displayName = 'StrategyComparisonTable';

export default StrategyComparisonTable;
