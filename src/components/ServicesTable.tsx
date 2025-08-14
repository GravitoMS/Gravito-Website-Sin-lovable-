import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, X } from 'lucide-react';
import { FadeIn } from '@/components/ui/SimpleAnimations';

interface ServiceDetail {
  levelNumber: number;
  displayType: 'checkmark' | 'text' | 'cross';
  displayText: string;
  tooltipContent: string;
}

interface Service {
  icon: string;
  serviceName: string;
  serviceDescription: string;
  levelDetails: ServiceDetail[];
}

interface ServicesTableProps {
  services: Service[];
  delay?: number;
}

const ServicesTable: React.FC<ServicesTableProps> = React.memo(({ services, delay = 0 }) => {
  return (
    <FadeIn delay={delay}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-semibold">Servicio</th>
                  <th className="text-center p-4 font-semibold">Nivel 1</th>
                  <th className="text-center p-4 font-semibold">Nivel 2</th>
                  <th className="text-center p-4 font-semibold">Nivel 3</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, serviceIndex) => (
                  <tr key={serviceIndex} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{service.serviceName}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.serviceDescription}
                          </p>
                        </div>
                      </div>
                    </td>
                    {[1, 2, 3].map((level) => {
                      const detail = service.levelDetails.find(d => d.levelNumber === level);
                      return (
                        <td key={level} className="text-center p-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex justify-center">
                                  {detail?.displayType === 'checkmark' ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : detail?.displayType === 'text' ? (
                                    <span className="text-xs font-medium text-primary">
                                      {detail.displayText}
                                    </span>
                                  ) : detail?.displayType === 'cross' ? (
                                    <X className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <X className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-sm p-3">
                                <div className="whitespace-pre-line text-sm">
                                  {detail?.tooltipContent || 'No disponible en este nivel'}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                      );
                    })}
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

ServicesTable.displayName = 'ServicesTable';

export default ServicesTable;
