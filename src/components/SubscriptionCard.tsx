import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { FadeIn } from '@/components/ui/SimpleAnimations';

interface SubscriptionCardProps {
  plan: {
    level: number;
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
    color: string;
  };
  billingCycle: 'monthly' | 'yearly';
  isPopular?: boolean;
  delay?: number;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = React.memo(({ 
  plan, 
  billingCycle, 
  isPopular = false, 
  delay = 0 
}) => {
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const savings = billingCycle === 'yearly' ? Math.round((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12) * 100) : 0;

  return (
    <FadeIn delay={delay}>
      <Card className={`relative border-2 transition-all duration-300 hover:shadow-lg ${
        isPopular 
          ? 'border-primary shadow-lg scale-105' 
          : 'border-border hover:border-primary/50'
      }`}>
        {isPopular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
            Más Popular
          </Badge>
        )}
        
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Precio */}
          <div className="text-center">
            <div className="text-4xl font-bold">
              ${price.toLocaleString()}
              <span className="text-lg text-muted-foreground">/{billingCycle === 'monthly' ? 'mes' : 'año'}</span>
            </div>
            {savings > 0 && (
              <p className="text-sm text-green-600 font-medium mt-1">
                Ahorras {savings}% con facturación anual
              </p>
            )}
          </div>

          {/* Características */}
          <div className="space-y-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Botón */}
          <Button 
            className={`w-full ${
              isPopular 
                ? 'bg-primary hover:bg-primary/90' 
                : 'bg-secondary hover:bg-secondary/90'
            }`}
            size="lg"
          >
            Elegir {plan.name}
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
});

SubscriptionCard.displayName = 'SubscriptionCard';

export default SubscriptionCard;
