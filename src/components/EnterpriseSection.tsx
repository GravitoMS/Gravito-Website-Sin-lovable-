import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnterpriseSectionProps {
  enterprisePlan: {
    name: string;
    subtitle: string;
    description: string;
    features: string[];
    cta: string;
  };
}

const EnterpriseSection: React.FC<EnterpriseSectionProps> = ({ enterprisePlan }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <Card className="border-2 border-primary/20 shadow-lg max-w-7xl mx-auto">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left Section - Title and Description */}
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{enterprisePlan.name}</h3>
                  <p className="text-sm text-muted-foreground">{enterprisePlan.subtitle}</p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {enterprisePlan.description}
                </p>
              </div>

              {/* Middle Section - Features */}
              <div className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-4">
                  {enterprisePlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Section - CTA */}
              <div className="lg:col-span-1 flex justify-center lg:justify-end">
                <Link to="/contacto">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                    {enterprisePlan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EnterpriseSection;
