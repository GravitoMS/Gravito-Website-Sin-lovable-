import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const FAQ = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Resolviendo tus últimas dudas con total transparencia.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* FAQ Item 1 */}
          <Card className="border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-foreground group-open:text-primary transition-colors">
                    ¿Qué pasa si necesito cancelar o cambiar mi plan?
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-current transition-transform duration-300 group-open:rotate-90"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    ¡Total flexibilidad! Puedes cancelar tu suscripción en cualquier momento, sin contratos a largo plazo. Si tu negocio crece y necesitas más, puedes subir de plan fácilmente. Si necesitas ajustar, también puedes bajar de plan al final de tu ciclo de facturación. Queremos que el plan se ajuste siempre a tus necesidades.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* FAQ Item 2 */}
          <Card className="border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-foreground group-open:text-primary transition-colors">
                    ¿El costo del "Impulso Estratégico" realmente se descuenta de mi primer mes?
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-current transition-transform duration-300 group-open:rotate-90"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    Sí, al 100%. Vemos el Impulso Estratégico como tu inversión inicial en nuestro primer mes de trabajo juntos. Por eso, el costo total (sin IVA) de ese primer análisis se acredita íntegramente a tu primera factura de suscripción mensual.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* FAQ Item 3 */}
          <Card className="border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-foreground group-open:text-primary transition-colors">
                    No estoy seguro de qué plan es el mejor para mí. ¿Qué hago?
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-current transition-transform duration-300 group-open:rotate-90"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    No te preocupes, por eso diseñamos el Impulso Estratégico. Es la forma perfecta y sin riesgo de empezar. Recibirás un análisis tan profundo de tu negocio que, al final del proceso, sabrás con total claridad cuál de los planes de suscripción es el siguiente paso lógico para ti.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>

          {/* FAQ Item 4 */}
          <Card className="border border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-foreground group-open:text-primary transition-colors">
                    ¿Cómo funciona el proceso de aprobación de contenido?
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current rounded-full relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-current transition-transform duration-300 group-open:rotate-90"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    A través de nuestro portal de cliente (Social Pilot), tendrás acceso a un calendario visual con todo el contenido programado para la semana. Podrás revisar cada post, dejar comentarios para solicitar cambios o simplemente darle al botón de "Aprobar". Tú siempre tienes la última palabra.
                  </p>
                </div>
              </details>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
