import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Info, Check, ArrowRight, CheckCircle, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FadeIn, HoverScale, FadeInScale } from '@/components/ui/SimpleAnimations';

// Lazy load components
const FAQ = lazy(() => import('../components/FAQ'));
const EnterpriseSection = lazy(() => import('../components/EnterpriseSection'));

const Suscripciones = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Datos para las preguntas frecuentes de suscripciones
  const faqData = [
    {
      question: "¿Qué incluye exactamente cada nivel de suscripción?",
      answer: "Cada nivel incluye una combinación específica de servicios. El Nivel 1 (Presencia Esencial) incluye servicios básicos como auditoría inicial, gestión de hasta 2 plataformas sociales, y diagnósticos mensuales. El Nivel 2 (Crecimiento y Optimización) añade más plataformas, informes trimestrales, y estrategias avanzadas. El Nivel 3 (Liderazgo y Expansión) incluye todo lo anterior más servicios ilimitados, prioridad de agenda, y análisis más profundos."
    },
    {
      question: "¿Puedo cambiar de nivel durante mi suscripción?",
      answer: "Sí, puedes cambiar de nivel en cualquier momento. Si subes de nivel, se te cobrará la diferencia proporcional. Si bajas de nivel, el cambio se aplicará en el siguiente ciclo de facturación. Nuestro equipo te ayudará con la transición para asegurar que no pierdas ningún servicio importante."
    },
    {
      question: "¿Qué pasa si no estoy satisfecho con el servicio?",
      answer: "Ofrecemos una garantía de satisfacción. Si en los primeros 30 días no estás completamente satisfecho con nuestro servicio, te devolvemos tu dinero sin preguntas. Además, puedes cancelar tu suscripción en cualquier momento con un aviso de 30 días."
    },
    {
      question: "¿Los precios incluyen IVA?",
      answer: "Los precios mostrados son sin IVA. El IVA se aplicará según la legislación fiscal mexicana. Te proporcionaremos facturas detalladas con el desglose correspondiente para que puedas deducir los gastos si aplica."
    },
    {
      question: "¿Cuánto tiempo tardan en responder a mis solicitudes?",
      answer: "Nuestros tiempos de respuesta varían según el nivel de suscripción. En el Nivel 1, respondemos en horarios laborables. En el Nivel 2, ofrecemos soporte prioritario. En el Nivel 3, tienes soporte total con atención prioritaria y extendida para urgencias."
    },
    {
      question: "¿Puedo pausar mi suscripción temporalmente?",
      answer: "Sí, puedes pausar tu suscripción por hasta 2 meses consecutivos. Durante la pausa, no se te cobrará, pero tampoco se realizarán publicaciones ni análisis. Para reactivar, simplemente avísanos y continuaremos desde donde lo dejamos."
    }
  ];

  // Datos de servicios memoizados para evitar re-creaciones
  const services = useMemo(() => [
    {
      icon: "📋",
      serviceName: "Auditoría Inicial por Plataforma",
      serviceDescription: "El Primer Impulso para tu Negocio. Evaluamos la presencia digital del negocio para detectar oportunidades de mejora y establecer una base sólida. Incluye auditoría por canal. Similar a los Impulsos GMS.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "• Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n\n• Identificación de contenido con mejor y peor rendimiento\n\n• Observaciones generales del primer mes\n\n• Calificación general y meta para el mes siguiente\n\n• Auditoría inicial por plataforma\n\n• Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n\n• Benchmarking inicial\n\n• Datos internos: objetivo SMART, insights clave, recomendaciones accionables, propuesta creativa, pilares de contenido, KPIs, bloqueos, activaciones clave y prioridades del mes siguiente"
        },
        {
          levelNumber: 2,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "• Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n\n• Identificación de contenido con mejor y peor rendimiento\n\n• Observaciones generales del primer mes\n\n• Calificación general y meta para el mes siguiente\n\n• Auditoría inicial por plataforma\n\n• Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n\n• Benchmarking inicial\n\n• Datos internos: objetivo SMART, insights clave, recomendaciones accionables, propuesta creativa, pilares de contenido, KPIs, bloqueos, activaciones clave y prioridades del mes siguiente"
        },
        {
          levelNumber: 3,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "Nivel 1/2 +\n\n• Benchmarking exhaustivo\n\n• Estrategia derivada del análisis FODA (FO, DO, FA, DA)"
        }
      ]
    },
    {
      icon: "👨‍💻",
      serviceName: "Gestión de Redes sociales",
      serviceDescription: "Una Comunidad Atendida y Comprometida. Nos convertimos en la voz de tu marca. Respondemos a comentarios, gestionamos mensajes directos e iniciamos conversaciones para transformar a tu audiencia pasiva en una comunidad activa y leal, todo alineado con nuestra estrategia mensual.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Hasta 2 Plataformas a elegir.",
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\n• Facebook Pages: Páginas, Reels y Stories\n• Instagram: Publicaciones, Reels y Stories\n• LinkedIn: Perfil personal y Páginas\n• Threads: Publicaciones e Hilos\n• X: Posts y retweets\n• Pinterest: Pins y boards"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 2 Plataformas a elegir.",
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\n• Facebook Pages: Páginas, Reels y Stories\n• Instagram: Publicaciones, Reels y Stories\n• LinkedIn: Perfil personal y Páginas\n• Threads: Publicaciones e Hilos\n• X: Posts y retweets\n• Pinterest: Pins y boards"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Hasta 3 Plataformas a elegir.",
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\n• Facebook Pages: Páginas, Reels y Stories\n• Instagram: Publicaciones, Reels y Stories\n• LinkedIn: Perfil personal y Páginas\n• Threads: Publicaciones e Hilos\n• X: Posts y retweets\n• Pinterest: Pins y boards"
        }
      ]
    },
    {
      icon: "⭐️",
      serviceName: "Gestión y Reviews en Google my Business Profile",
      serviceDescription: "Tu Reputación y Visibilidad en Manos de Expertos. Gestión activa del perfil de GMB, incluyendo publicaciones, actualización de información, respuesta a Q&A y en ciertos niveles la implementación de estrategias para generación de reseñas orgánicas.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Setup + Gestión + análisis",
          tooltipContent: "Incluye un análisis dedicado dentro del Diagnóstico Mensual/Inicial"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Nivel 1 + Estrategia para reseñas",
          tooltipContent: "Incluye un análisis dedicado dentro del los informes Trimestrales y Diagnósticos Mensuales/Iniciales"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Nivel 2 + Estrategia avanzada para reseñas",
          tooltipContent: "Incluye un análisis dedicado dentro del los informes Trimestrales y Diagnósticos Mensuales/Iniciales"
        }
      ]
    },
    {
      icon: "🙋‍♀️",
      serviceName: "Colaboraciones y UGC",
      serviceDescription: "Creadores para tu Marca. Creamos colaboraciones y UGC con influencers relacionados con el nicho y contexto de tu negocio a través de los creadores de contenido recomendados por nosotros para generar contenido publicitario y auténtico.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Acceso a Red de Creadores e Influencers",
          tooltipContent: "Recomendamos a los mejores creadores UGC e influencers para crear colaboraciones específicamente para en el nicho y el contexto personalizado de tu negocio."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Nivel 1 + estratégia UGC mensual",
          tooltipContent: "1 Reel UGC/mes creado por un influencer de nuestra red."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Nivel 2 + Colaboraciones o Estrategia UGC",
          tooltipContent: "2 Reels UGC adicionales/mes (3 en total).\n\n1 colaboración Bimestral con un influencer recomendado"
        }
      ]
    },
    {
      icon: "✍️",
      serviceName: "Servicio de Post Producción",
      serviceDescription: "Tu Contenido, Re-Imaginado. No dejes que tu material valioso se quede en un disco duro. Editamos tus videos y fotos, añadiendo subtítulos, tu marca y efectos dinámicos para crear un flujo constante de contenido profesional para tus redes.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "5 archivos por mes",
          tooltipContent: "Ejemplo: videos existentes ya sean largos o cortos convertidos en reels virales"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 10 archivos/mes",
          tooltipContent: "Ejemplo: videos existentes ya sean largos o cortos convertidos en reels virales"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Hasta 20 archivos/mes",
          tooltipContent: "Ejemplo: videos existentes ya sean largos o cortos convertidos en reels virales"
        }
      ]
    },
    {
      icon: "🎨",
      serviceName: "Diseños de Social Media Graphics",
      serviceDescription: "Diseño que Detiene el Scroll. Diseños visuales creados específicamente para comunicarse de manera atractiva y rápida a través de redes sociales, con el objetivo de captar la atención del usuario e impulsar interacción o engagement.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Hasta 4 Diseños para Redes/mes",
          tooltipContent: "Incluye:\n\n• Infografías visuales\n• Publicaciones promocionales\n• Contenido de branding\n• Frases sobre imagen\n• Motion graphics o animaciones breves\n• Entre Otros…"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 8 Diseños para Redes/mes",
          tooltipContent: "Incluye:\n\n• Infografías visuales\n• Publicaciones promocionales\n• Contenido de branding\n• Frases sobre imagen\n• Motion graphics o animaciones breves\n• Entre Otros…"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Diseños ilimitados",
          tooltipContent: "Incluye:\n\n• Infografías visuales\n• Publicaciones promocionales\n• Contenido de branding\n• Frases sobre imagen\n• Motion graphics o animaciones breves\n• Entre Otros…"
        }
      ]
    },
    {
      icon: "🗃️",
      serviceName: "Diseño de Marketing/Brand Collateral",
      serviceDescription: "Materiales Impresos y Digitales. Llevamos tu identidad visual más allá de lo digital ya que unificamos tu marca en todos los puntos de contacto con el cliente.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "1 Diseño Personalizado/mes",
          tooltipContent: "$'X' MXN por diseño extra"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "2 Diseños Personalizado/mes",
          tooltipContent: "$'X' MXN por diseño extra"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "5 diseños personalizados/mes",
          tooltipContent: "$'X' MXN por diseño extra"
        }
      ]
    },
    {
      icon: "🔄",
      serviceName: "Orden de cola para Diseño Gráficos",
      serviceDescription: "Cantidad de proyectos en los que se trabaja a la vez, si se reciben más solicitudes, se comenzará a trabajar en ellas por orden de cola.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "1 Proyecto activo",
          tooltipContent: "El \"proyecto activo\" indica que se trabaja en una solicitud a la vez."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "1 Proyecto activo",
          tooltipContent: "El \"proyecto activo\" indica que se trabaja en una solicitud a la vez."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "1 Proyecto activo + Entrega Prioritaria",
          tooltipContent: "El \"proyecto activo\" indica que se trabaja en una solicitud a la vez."
        }
      ]
    },
    {
      icon: "📸",
      serviceName: "Sesiones de Fotografía Profesional",
      serviceDescription: "Fotografía Profesional, Simplificada. Te damos acceso a nuestra red de fotógrafos y estudios verificados. En algunos planes, te incluimos horas de sesión y gestionamos todo el proceso de coordinación y agendamiento por ti.\n\nLímite: Las horas de sesión no son acumulables mes a mes.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Acceso a red de studios y fotógrafos",
          tooltipContent: "Acceso a recomendación Personalizada de Studios y Fotógrafos"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Nivel 1 + 2 horas de sesión/mes",
          tooltipContent: "Las horas aplican solo con studios/fotógrafos recomendados\n\n• Se puede dividir en 3 sesiones de 1 hr/sesión\n• Puedes elegir entre autoagendamiento o tomar las sesiones cada que lo necesites"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "4 horas de sesión/mes + Prioridad de agenda",
          tooltipContent: "Las horas aplican solo con studios/fotógrafos recomendados\n\n• Se puede dividir en sesiones más cortas\n• Puedes elegir entre autoagendamiento o tomar las sesiones cada que lo necesites"
        }
      ]
    },
    {
      icon: "🎤",
      serviceName: "Creación experiencias y eventos personalizados",
      serviceDescription: "Activaciones que Involucran a tu Comunidad. Fomentamos la lealtad y generamos prueba social a través de nuestro sistema de propuestas proactivas. Diseñamos experiencias que motivan la interacción y convierten a tus clientes en tus mejores promotores.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Identificación de oportunidades + Propuestas + Eventos Sencillos",
          tooltipContent: "Todos los eventos que se realicen serán personalizados para adaptarse al contexto de tu negocio por lo que estos eventos pueden variar dependiendo de tu marca y diversos factores externos.\n\nAlgunos ejemplos son:\n\n• Desafíos virales en redes sociales\n• Códigos de descuento escondidos\n• Giveaways o sorteos\n• Campañas de \"comenta y gana\"\n• Cupones por referidos\n\nPor mencionar algunos…."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Todo el Nivel 1 + Eventos Avanzados",
          tooltipContent: "Todos los eventos que se realicen serán personalizados para adaptarse al contexto de tu negocio por lo que estos eventos pueden variar dependiendo de tu marca y diversos factores externos.\n\nAlgunos ejemplos son:\n\n• Programas de fidelidad con dinámicas\n• Códigos de descuento escondidos\n• Regalos sorpresa por interacción\n• Campañas con influencers\n• Miércoles de casino\n\nPor mencionar algunos…."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Todo el Nivel 2 + eventos integrales + Análisis post-evento",
          tooltipContent: "Todos los eventos que se realicen serán personalizados para adaptarse al contexto de tu negocio por lo que estos eventos pueden variar dependiendo de tu marca y diversos factores externos.\n\nAlgunos ejemplos son:\n\nPor mencionar algunos…."
        }
      ]
    },
    {
      icon: "💻",
      serviceName: "Profesionales en Google y Meta Ads",
      serviceDescription: "ADS Focalizados. Aprovecha el conocimiento que ya tenemos de tu marca. Nuestro equipo de profesionales en Google y Meta Ads está listo para lanzar campañas que se integren perfectamente con tu estrategia orgánica.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Acceso a profesionales",
          tooltipContent: "Si se decide tomar un servicio de Google/Meta ADS, el costo de la campaña es aparte del costo de la suscripción."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Acceso a profesionales",
          tooltipContent: "Si se decide tomar un servicio de Google/Meta ADS, el costo de la campaña es aparte del costo de la suscripción."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Acceso a profesionales + Mejores Tarifas",
          tooltipContent: "Si se decide tomar un servicio de Google/Meta ADS, el costo de la campaña es aparte del costo de la suscripción."
        }
      ]
    },
    {
      icon: "🗓️",
      serviceName: "Diagnóstico Mensual",
      serviceDescription: "Afinación y Mejora Mensual. Nuestro diagnóstico mensual es el motor de tu estrategia. Cada mes, te entregamos un análisis que evoluciona con tus necesidades:\n\nNivel 1 - Análisis de Rendimiento\n\nNivel 2 - Inteligencia Competitiva\n\nNivel 3 - Optimización y Mejora de la Estrategia de Negocio",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Diagnóstico Sencillo",
          tooltipContent: "• Resumen de datos generales del último mes por plataforma\n• Métricas clave: alcance, impresiones, engagement, clics, crecimiento de seguidores\n• Observaciones cualitativas de la semana\n• Calificación general del desempeño\n• Análisis de performance por plataforma\n• Comparativa de contenido propuesto vs. resultados\n• Meta general para el próximo mes y justificación\n• Datos internos: objetivo SMART, insights clave, recomendaciones, etc."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Diagnóstico Avanzado",
          tooltipContent: "Nivel 1 +\n\n• Análisis de sentimiento: observaciones, oportunidades de contenido, etc.\n• Radar competitivo: comparación con el principal competidor\n• Priorización de acciones para el mes siguiente"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Diagnóstico GMS+",
          tooltipContent: "Nivel 2 +\n\n• Pruebas A/B propuestas para el mes siguiente\n• Tabla de pendientes: tareas no realizadas, razón y acción correctiva\n• Resumen de avances: mejores resultados, metas, campañas activas, diagnóstico clave y resumen ejecutivo"
        }
      ]
    },
    {
      icon: "📈",
      serviceName: "Informe de Gestión mensual",
      serviceDescription: "Tu Guía Mensual de Crecimiento. Este informe te da una visibilidad total sobre nuestro trabajo. Documenta cada acción, analiza los resultados y se convierte en la base para tomar decisiones más inteligentes, asegurando que tu estrategia se optimice mes a mes.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Informe de gestión",
          tooltipContent: "• Registro semanal de publicaciones por plataforma\n• Seguimiento de publicaciones en Google My Business\n• Resumen de campañas UGC con creadores/influencers\n• Calendario de campañas ADS (opcional)\n• Resumen mensual: objetivos SMART, pilares de contenido, KPIs, etc."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Informe de gestión Avanzado",
          tooltipContent: "Nivel 1 +\n\n• Registro de métricas post-publicación (48h) para cada contenido\n• Resumen del objetivo táctico de cada post y copy específico\n• Detalle de resultados y aprendizajes de colaboraciones y UGC\n• Resumen cualitativo mensual más detallado"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Informe de gestión GMS+",
          tooltipContent: "Nivel 2 +\n\n• Planificación y registro de campañas ADS y UGC con mayor profundidad\n• Análisis estratégico de resultados: inversión, ROI, etc.\n• Resumen ejecutivo mensual con énfasis en la toma de decisiones"
        }
      ]
    },
    {
      icon: "📊",
      serviceName: "Informe trimestral",
      serviceDescription: "Birds View. Cada tres meses, damos un paso atrás para ver el panorama completo. Analizamos tu rendimiento, detectamos tendencias y te mostramos cómo te comparas con la competencia. El resultado es una hoja de ruta estratégica para los próximos 90 días, diseñada para alinear cada acción con tu crecimiento.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "cross",
          displayText: "No incluido",
          tooltipContent: ""
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Informe Trimestral",
          tooltipContent: "Resumen general del trimestre:\n\n• Video análisis Personal\n• Principales logros, métricas estrella, observaciones clave\n• Datos generales trimestrales por plataforma\n• Tendencia general y comentarios adicionales por plataforma\n• Resultados de Google My Business y colaboraciones y campañas UGC\n• Benchmarking: comparación de posts destacados y aprendizajes clave con el principal competidor\n• Resumen de logros, aprendizajes tácticos y observaciones de la comunidad\n• Valoración estratégica trimestral\n• Conclusiones finales y enfoque para el próximo trimestre\n• Espacio para feedback del cliente y fecha sugerida para la próxima revisión"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Informe Trimestral GMS+",
          tooltipContent: "Nivel 2 +\n\n• Video análisis personal y resumen ejecutivo del trimestre\n• Recomendación principal para el próximo trimestre\n• Datos generales trimestrales para más plataformas (hasta 3 o más)\n• Objetivos SMART de cada mes: KPI principal/secundario, meta, resultado y análisis de cumplimiento\n• Análisis de pruebas A/B realizadas cada mes: hipótesis, grupos, KPI, duración, aprendizajes clave\n• Análisis de sentimiento y oportunidades: insight principal, impacto estimado, justificación y oportunidades de contenido/formato sugerido\n• Benchmarking más profundo: estrategias y tácticas, gap analysis (dónde se superó y dónde no al competidor), insight clave y acción estratégica para cerrar brechas\n• Acciones correctivas y gestión de bloqueos: recomendaciones, justificación, impacto, acción propuesta y decisiones del cliente por mes\n• Conclusiones finales y próximos pasos detallados (GMS y cliente), aprendizajes clave y resumen del trimestre"
        }
      ]
    },
    {
      icon: "🎥",
      serviceName: "Video Explicación",
      serviceDescription: "Explicación Directa y Clara. Video explicativo que acompaña cada informe y documento entregado mensualmente con el objetivo de fácilmente comunicar y explicar los hallazgos de cada documento dándote una explicación clara y directa. Duración de 5-7 minutos.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Sistema de Videos sencillo",
          tooltipContent: "Video Personal (Loom) para Diagnóstico Inicial.\n\nVideos por GAIA para Diagnósticos Mensuales y Líneas del Tiempo."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Sistema de Videos avanzado",
          tooltipContent: "Video Personal (Loom) para Diagnóstico Inicial e Informe Trimestral.\n\nVideos por GAIA para Diagnósticos Mensuales y Líneas del Tiempo."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Sistema de Videos GMS+",
          tooltipContent: "Video Personal (Loom) para TODOS los entregables (Iniciales, Mensuales y Trimestrales)."
        }
      ]
    },
    {
      icon: "🗺️",
      serviceName: "Línea del Tiempo",
      serviceDescription: "Tu Hoja de Ruta Estratégica Mensual. Convertimos nuestro análisis y hallazgos en una Línea del Tiempo visual. Es un plan de acción claro que te muestra exactamente qué contenido crearemos, por qué y qué objetivos buscamos alcanzar cada mes.",
      levelDetails: [
        { levelNumber: 1, displayType: "checkmark", displayText: "", tooltipContent: "" },
        { levelNumber: 2, displayType: "checkmark", displayText: "", tooltipContent: "" },
        { levelNumber: 3, displayType: "checkmark", displayText: "", tooltipContent: "" }
      ]
    },
    {
      icon: "📲",
      serviceName: "Canales de Comunicación",
      serviceDescription: "Comunicación Directa y Ágil. Utilizamos estos canales para que siempre tengas una línea directa con nuestro equipo. Son el espacio ideal para consultas rápidas, seguimiento de proyectos y colaboración constante.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "Comunicación Estándar",
          tooltipContent: "Chat + Zoom/Teams en horarios laborables"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Soporte Prioritario",
          tooltipContent: "Incluye llamadas de soporte para urgencias"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Soporte Total",
          tooltipContent: "Atención prioritaria + Soporte extendido para urgencias."
        }
      ]
    },
    {
      icon: "🤝",
      serviceName: "Reuniones y soporte físico o digital",
      serviceDescription: "Acompañamiento Total. Reuniones en linea o presenciales bajo demanda del cliente para revisar progreso y si es necesario, se realizan ajustes a diseños o publicaciones según las necesidades.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "Reuniones físicas/digitales ilimitadas bajo demanda + atención básica por WhatsApp"
        },
        {
          levelNumber: 2,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "Reuniones físicas/digitales ilimitadas bajo demanda + atención básica por WhatsApp"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "✓ + Soporte para Urgencias",
          tooltipContent: "Reuniones físicas/digitales ilimitadas + atención por WhatsApp + soporte para urgencias"
        }
      ]
    },
    {
      icon: "✅",
      serviceName: "Aprobación de Post",
      serviceDescription: "Tú Tienes la Última Palabra. Acceso al portal de cliente dedicado de GMS para supervisar y aprobar el contenido que nosotros programaremos.",
      levelDetails: [
        {
          levelNumber: 1,
          displayType: "text",
          displayText: "1 ronda de revisión/semana.",
          tooltipContent: "Una \"ronda\" se define como un ciclo de feedback sobre el lote de contenido de la semana."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 2 rondas de revisión/semana.",
          tooltipContent: "Una \"ronda\" se define como un ciclo de feedback sobre el lote de contenido de la semana."
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Hasta 2 rondas de revisión/semana.",
          tooltipContent: "Una \"ronda\" se define como un ciclo de feedback sobre el lote de contenido de la semana."
        }
      ]
    }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: "Nivel 1",
      subtitle: "Presencia Esencial",
      price: billingCycle === 'monthly' ? "$6,490" : "$5,516",
      originalPrice: billingCycle === 'monthly' ? "$6,490" : "$6,490",
      description: "Built for businesses who want to establish their digital presence.",
      features: services.map(service => service.levelDetails.find(detail => detail.levelNumber === 1)?.displayText || ""),
      isPopular: false,
      cta: "COMENZAR AHORA",
      color: "border-muted"
    },
    {
      name: "Nivel 2",
      subtitle: "Crecimiento y Optimización",
      price: billingCycle === 'monthly' ? "$12,395" : "$10,536",
      originalPrice: billingCycle === 'monthly' ? "$12,395" : "$12,395",
      description: "Designed to empower growing businesses and small teams.",
      features: services.map(service => service.levelDetails.find(detail => detail.levelNumber === 2)?.displayText || ""),
      isPopular: true,
      cta: "COMENZAR AHORA",
      color: "border-primary"
    },
    {
      name: "Nivel 3",
      subtitle: "Liderazgo y Expansión",
      price: billingCycle === 'monthly' ? "$15,780" : "$13,413",
      originalPrice: billingCycle === 'monthly' ? "$15,780" : "$15,780",
      description: "Capabilities built for established businesses who want to scale.",
      features: services.map(service => service.levelDetails.find(detail => detail.levelNumber === 3)?.displayText || ""),
      isPopular: false,
      cta: "COMENZAR AHORA",
      color: "border-muted"
    }
  ], [billingCycle, services]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 relative">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <FadeIn 
              delay={0.1}
              className="text-4xl lg:text-6xl font-black text-foreground mb-8"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              SUSCRIPCIONES
            </FadeIn>
            <FadeIn 
              delay={0.2}
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8"
            >
               La competencia <span 
                className="text-primary font-bold"
                style={{
                  textShadow: '0 0 10px hsl(162 100% 45% / 0.5), 0 0 20px hsl(162 100% 45% / 0.3)',
                  willChange: 'text-shadow'
                }}
              >no se detiene</span>, tu presencia digital tampoco debería. Nuestros planes son la solución definitiva para quienes buscan <span 
                className="text-primary font-bold"
                style={{
                  textShadow: '0 0 10px hsl(162 100% 45% / 0.5), 0 0 20px hsl(162 100% 45% / 0.3)',
                  willChange: 'text-shadow'
                }}
              >resultados consistentes</span> mes a mes sin la carga de la gestión diaria...
            </FadeIn>
            <FadeIn 
              delay={0.3}
              className="flex justify-center"
            >
              <Button 
                onClick={() => {
                  const tableSection = document.querySelector('[data-section="comparison-table"]');
                  if (tableSection) {
                    tableSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Comparar Planes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Espaciado con difuminado */}
      <div className="h-72 bg-gradient-to-b from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground/60 font-medium text-lg animate-bounce mx-auto mb-2" style={{ animationDuration: '2s' }}>
            Desliza para continuar
          </div>
        </div>
      </div>

      {/* Nueva Sección: Elige el Plan Perfecto */}
      <section className="py-95 bg-muted/30" data-section="plan-perfecto">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 
              className="text-3xl lg:text-5xl font-bold text-foreground mb-6"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              El Plan Perfecto para tu Negocio
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Descubre cuál de nuestros planes se adapta mejor a tus necesidades y objetivos de crecimiento.
            </p>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tarjeta 1: Negocio que Busca Tranquilidad */}
              <FadeIn delay={0.1}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                      Para el Negocio que Busca Tranquilidad
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      El plan <strong>Presencia Esencial</strong> es ideal si buscas <strong>aliviar tu carga de trabajo</strong> y asegurar una presencia digital consistente y profesional sin tener que pensar en ello. Nosotros nos encargamos de la ejecución para que tú te enfoques en tu negocio.
                    </p>
                    <div className="mt-auto text-center">
                      <Badge className="bg-primary text-primary-foreground mb-3">
                        Presencia Esencial
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Tarjeta 2: Negocio Listo para Crecer */}
              <FadeIn delay={0.2}>
                <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                      Para el Negocio Listo para Crecer
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      El plan <strong>Crecimiento y Optimización</strong> es para ti si ya tienes una base y estás listo para <strong>crecer de manera proactiva</strong>, entendiendo a tu competencia y optimizando tu contenido para generar más interacción y construir una comunidad leal.
                    </p>
                    <div className="mt-auto text-center">
                      <Badge className="bg-hero-yellow text-hero-yellow-foreground mb-3">
                        Crecimiento y Optimización
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Tarjeta 3: Negocio que Busca un Socio Estratégico */}
              <FadeIn delay={0.3}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                      Para el Negocio que Busca un Socio Estratégico
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                      El plan <strong>Liderazgo y Expansión</strong> es para negocios que ven el marketing como una <strong>inversión estratégica</strong>. Actuamos como tu departamento de marketing externo, conectando cada acción con el <strong>impacto en el negocio</strong> y el <strong>retorno de la inversión (ROI)</strong>.
                    </p>
                    <div className="mt-auto text-center">
                      <Badge className="bg-primary text-primary-foreground mb-3">
                        Liderazgo y Expansión
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Espaciado con difuminado entre secciones */}
      <div className="h-32 bg-gradient-to-b from-muted/30 to-background"></div>

      {/* Features Table */}
      <section className="py-14" data-section="comparison-table">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 
              className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-4"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              Compara Nuestros Planes
            </h2>
          </div>

          <div className="bg-card rounded-lg shadow-lg overflow-x-auto">
            <TooltipProvider>
              <table className="w-full">
                <thead className="sticky top-0 bg-card z-10 shadow-sm">
                  <tr className="border-b border-border">
                    <th className="text-center p-6 font-semibold text-foreground bg-card">
                      <span>Características</span>
                    </th>
                    {pricingPlans.map((plan, index) => (
                      <th key={index} className={`text-center p-6 font-semibold text-foreground bg-card ${plan.isPopular ? 'bg-primary/10' : ''}`}>
                        <div className="space-y-3">
                          <div>
                            <div className="text-lg font-bold">{plan.name}</div>
                            <div className="text-sm text-muted-foreground">{plan.subtitle}</div>
                          </div>
                          {plan.isPopular && (
                            <Badge className="bg-primary text-primary-foreground">
                              Más Popular
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{service.icon}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">{service.serviceName}</span>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <button className="inline-flex">
                                  <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                <div 
                                  className="whitespace-pre-line leading-relaxed"
                                  dangerouslySetInnerHTML={{ 
                                    __html: service.serviceDescription.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') 
                                  }}
                                />
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                      {pricingPlans.map((plan, planIndex) => {
                        const levelDetail = service.levelDetails.find(detail => detail.levelNumber === planIndex + 1);
                        return (
                        <td key={planIndex} className={`text-center p-6 ${plan.isPopular ? 'bg-primary/5' : ''}`}>
                            <div className="flex items-center justify-center space-x-2">
                              {levelDetail?.displayType === "checkmark" ? (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              ) : levelDetail?.displayType === "cross" ? (
                                <X className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <span className="text-sm text-foreground max-w-xs mx-auto">{levelDetail?.displayText}</span>
                              )}
                              {levelDetail?.tooltipContent && (
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger asChild>
                                    <button className="inline-flex">
                                      <Info className="w-4 h-4 text-primary hover:text-primary/80 cursor-help transition-colors" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-card text-foreground border border-primary max-w-xs">
                                    <div 
                                      className="whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ 
                                        __html: levelDetail.tooltipContent.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>') 
                                      }}
                                    />
                                  </TooltipContent>
                                </Tooltip>
                              )}
                          </div>
                        </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* Espaciado con difuminado entre tabla y planes */}
      <div className="h-20 bg-gradient-to-b from-background to-muted/30"></div>

      {/* Tarjetas de Resumen de Impulsos */}
      <section className="py-14 bg-muted/30" data-section="nuestros-impulsos">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <FadeIn 
              delay={0.1}
              className="text-4xl lg:text-6xl xl:text-7xl font-black text-foreground mb-6"
              style={{
                textShadow: '0 0 20px hsl(162 100% 45% / 0.3), 0 0 40px hsl(162 100% 45% / 0.2)',
                willChange: 'text-shadow'
              }}
            >
              Nuestros Planes
            </FadeIn>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cuál es el plan perfecto para tu negocio y comienza tu transformación digital.
            </p>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            {/* Switch de Precios */}
            <div className="flex justify-center mb-8">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full p-1 flex items-center relative">
                {/* Slider animado */}
                <div 
                  className={`absolute top-1 bottom-1 bg-primary rounded-full transition-all duration-300 ease-in-out ${
                    billingCycle === 'monthly' 
                      ? 'left-1 w-20' 
                      : 'left-20 w-20'
                  }`}
                />
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 z-10 ${
                    billingCycle === 'monthly'
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 z-10 ${
                    billingCycle === 'yearly'
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Anual
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tarjeta Nivel 1 */}
              <FadeIn delay={0.1}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Presencia Esencial
                      </h3>
                      <Badge className="bg-primary text-primary-foreground mb-4">
                        Nivel 1
                      </Badge>
                      <div className="mb-4">
                        <div className="text-xl lg:text-2xl font-bold text-foreground">
                          {billingCycle === 'monthly' ? '$6,490/mes' : '$5,408.34/mes'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                        Precio en MXN, ya incluye IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para los dueños de negocios que necesitan establecer su presencia digital y comenzar su transformación digital de manera escalable.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Auditoría integral de Presencia Digital</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Gestión de 2 Plataformas Sociales</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Setup + Gestión + Análisis en Google</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Diseños Gráficos y Edición de Video</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Sistema de Informes Básico</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Profesionales en Google/Meta ADS</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Aprobación de Posts</span>
                      </div>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link to="/contacto?servicio=nivel-1">
                        <Button 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Comenzar Ahora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Tarjeta Nivel 2 */}
              <FadeIn delay={0.2}>
                <Card className="border-hero-yellow/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Crecimiento y Optimización
                      </h3>
                      <Badge className="bg-hero-yellow text-hero-yellow-foreground mt-2 mx-auto">
                        Recomendado
                      </Badge>
                      <div className="mb-4 mt-4">
                        <div className="text-xl lg:text-2xl font-bold text-foreground">
                          {billingCycle === 'monthly' ? '$12,395/mes' : '$10,328.75/mes'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                        Precio en MXN, ya incluye IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para negocios en crecimiento que buscan optimizar su presencia digital y expandir su alcance con estrategias avanzadas.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Todo del Nivel 1</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Estrategia de reseñas en Google</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Estrategia UGC y Colaboraciones</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">2 Hrs de Sesión Fotográfica</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Informe Trimestral</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Creación de Eventos Avanzada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Video Explicación Avanzada</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-hero-yellow flex-shrink-0" />
                        <span className="text-foreground">Aprobación de Posts</span>
                      </div>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link to="/contacto?servicio=nivel-2">
                        <Button 
                          size="lg" 
                          className="w-full bg-hero-yellow hover:bg-hero-yellow/90 text-hero-yellow-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Comenzar Ahora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Tarjeta Nivel 3 */}
              <FadeIn delay={0.3}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        Liderazgo y Expansión
                      </h3>
                      <Badge className="bg-primary text-primary-foreground mb-4">
                        Nivel 3
                      </Badge>
                      <div className="mb-4">
                        <div className="text-xl lg:text-2xl font-bold text-foreground">
                          {billingCycle === 'monthly' ? '$15,780/mes' : '$13,150/mes'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Precio en MXN, ya incluye IVA
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Para negocios establecidos que buscan liderar su mercado y expandir su presencia digital con estrategias integrales.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Todo del Nivel 2</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Gestión de 3 Plataformas Sociales</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Diseños Ilimitados</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">4 Hrs de Sesión Fotográfica en total</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Sistema de Informes GMS+</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Soporte Prioritario</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">Aprobación de Posts</span>
                      </div>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link to="/contacto?servicio=nivel-3">
                        <Button 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Comenzar Ahora
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
            
            {/* Tarjeta Enterprise - Horizontal debajo de las tres tarjetas */}
            <div className="mt-12">
              <FadeIn delay={0.4}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <div className="flex flex-col lg:flex-row items-center lg:items-center p-8">
                    {/* Contenido izquierdo */}
                    <div className="flex-1 lg:pr-8 mb-6 lg:mb-0">
                      <div className="text-center lg:text-left mb-4">
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        GMS Enterprise
                        </h3>
                        <Badge className="bg-hero-yellow text-hero-yellow-foreground mb-4">
                          Plan Personalizado
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                      Para empresas con necesidades complejas y metas de crecimiento ambiciosas. Esto no es un plan, es una asociación estratégica. Nos integramos directamente con tu equipo para construir y ejecutar una hoja de ruta de marketing a medida, alineada con tus KPIs de negocio más importantes.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">Estrategia y Ejecución 100% a la Medida</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">Reportes de ROI y Business Intelligence</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">Acceso Directo a Dirección y Soporte Prioritario</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">Gestión de Redes Ilimitadas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botón derecho */}
                    <div className="flex-shrink-0">
                      <Link to="/contacto">
                        <Button 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl"
                        >
                          Contáctanos
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              ¿Buscas un producto para probar antes de suscribirte?
            </h2>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
              Justo por esa razón desarrollamos el producto perfecto para ti: Su precio se descuenta al 100% y es la mejor manera de comenzar.
            </p>
            <div className="flex justify-center">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                  Conoce nuestro Impulso Estratégico
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Resolvemos las dudas más comunes sobre nuestros planes de suscripción y servicios.
            </p>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg lg:text-xl font-semibold text-foreground pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          <ChevronDown 
                            className={`h-5 w-5 text-primary transition-transform duration-500 ease-out ${
                              expandedFAQ === index ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        expandedFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-border/50 pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
          
          {/* Botones de acción al final de FAQ */}
          <FadeIn delay={0.6} className="text-center mt-12">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                onClick={() => {
                  const impulsosSection = document.querySelector('[data-section="nuestros-impulsos"]');
                  if (impulsosSection) {
                    impulsosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl w-full sm:w-56"
              >
                Ver Planes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/contacto" className="w-full sm:w-56">
                <Button variant="ghost" size="lg" className="px-10 py-4 text-lg font-semibold rounded-xl w-full text-primary border border-primary hover:bg-primary/10">
                  Tengo Otra Pregunta
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Suscripciones;