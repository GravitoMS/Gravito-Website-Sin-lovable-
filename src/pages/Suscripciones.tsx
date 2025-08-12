import React, { useState, useMemo, lazy, Suspense } from 'react';
import { Info, Check, ArrowRight, CheckCircle, X } from 'lucide-react';
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
          tooltipContent: "- Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n\n- Identificación de contenido con mejor y peor rendimiento\n\n- Observaciones generales del primer mes\n\n- Calificación general y meta para el mes siguiente\n\n-Auditoría inicial por plataforma\n\n-Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n\n-Benchmarking inicial\n\n-Datos internos: \nobjetivo SMART, insights clave, recomendaciones accionables, propuesta creativa, pilares de contenido, KPIs, bloqueos, activaciones clave y prioridades del mes siguiente"
        },
        {
          levelNumber: 2,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "- Recopilación de datos iniciales y métricas clave por plataforma: Alcance, impresiones, engagement, clics, seguidores adquiridos.\n\n- Identificación de contenido con mejor y peor rendimiento\n\n- Observaciones generales del primer mes\n\n- Calificación general y meta para el mes siguiente\n\n-Auditoría inicial por plataforma\n\n-Quick Wins: áreas de oportunidad y acciones inmediatas recomendadas\n\n-Benchmarking inicial\n\n-Datos internos: \nobjetivo SMART, insights clave, recomendaciones accionables, propuesta creativa, pilares de contenido, KPIs, bloqueos, activaciones clave y prioridades del mes siguiente"
        },
        {
          levelNumber: 3,
          displayType: "checkmark",
          displayText: "",
          tooltipContent: "Nivel 1/2 +\n\n- Benchmarking exhaustivo \n\n-Estrategia derivada del análisis FODA \n(FO, DO, FA, DA)"
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
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\nFacebook Pages: Páginas, Reels y Stories.\nInstagram: Publicaciones, Reels y Stories.\nLinkedIn: Perfil personal y Páginas.\nThreads: Publicaciones e Hilos.\nX: Posts y retweets\nPinterest: Pins y boards"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 2 Plataformas a elegir.",
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\nFacebook Pages: Páginas, Reels y Stories.\nInstagram: Publicaciones, Reels y Stories.\nLinkedIn: Perfil personal y Páginas.\nThreads: Publicaciones e Hilos.\nX: Posts y retweets\nPinterest: Pins y boards"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Hasta 3 Plataformas a elegir.",
          tooltipContent: "Gestión integral del ciclo de vida del contenido y la comunidad en las plataformas seleccionadas.\n\nPlataformas a elegir:\nFacebook Pages: Páginas, Reels y Stories.\nInstagram: Publicaciones, Reels y Stories.\nLinkedIn: Perfil personal y Páginas.\nThreads: Publicaciones e Hilos.\nX: Posts y retweets\nPinterest: Pins y boards"
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
          tooltipContent: "Incluye:\n\nInfografías visuales\n\nPublicaciones promocionales\n\nContenido de branding\n\nFrases sobre imagen\n\nMotion graphics o animaciones breves\n\nEntre Otros…"
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Hasta 8 Diseños para Redes/mes",
          tooltipContent: "Incluye:\n\nInfografías visuales\n\nPublicaciones promocionales\n\nContenido de branding\n\nFrases sobre imagen\n\nMotion graphics o animaciones breves\n\nEntre Otros…"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Diseños ilimitados",
          tooltipContent: "Incluye:\n\nInfografías visuales\n\nPublicaciones promocionales\n\nContenido de branding\n\nFrases sobre imagen\n\nMotion graphics o animaciones breves\n\nEntre Otros…"
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
          tooltipContent: "Las horas aplican solo con studios/fotógrafos recomendados\n\nSe puede dividir en 3 sesiones de 1 hr/sesión\n\nPuedes elegir entre autoagendamiento o tu tomar las sesiones cada que lo necesites"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Nivel 2 + 4 horas de sesión/mes + Prioridad de agenda",
          tooltipContent: "Las horas aplican solo con studios/fotógrafos recomendados\n\nSe puede dividir en sesiones más cortas\n\nPuedes elegir entre autoagendamiento o tu tomar las sesiones cada que lo necesites"
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
          tooltipContent: "Todos los eventos que se realicen serán personalizados para adaptarse al contexto de tu negocio por lo que estos eventos pueden variar dependiendo de tu marca y diversos factores externos.\n\nAlgunos ejemplos son:\n\n* Desafíos virales en redes sociales\n* Códigos de descuento escondidos\n* Giveaways o sorteos\n* Campañas de \"comenta y gana\"\n* Cupones por referidos\n\nPor mencionar algunos…."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Todo el Nivel 1 + Eventos Avanzados",
          tooltipContent: "Todos los eventos que se realicen serán personalizados para adaptarse al contexto de tu negocio por lo que estos eventos pueden variar dependiendo de tu marca y diversos factores externos.\n\nAlgunos ejemplos son:\n\n* Programas de fidelidad con dinámicas\n* Códigos de descuento escondidos\n* Regalos sorpresa por interacción\n* Campañas con influencers\n* Miércoles de casino\n\nPor mencionar algunos…."
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
          tooltipContent: "- Resumen de datos generales del último mes por plataforma\n- Métricas clave: alcance, impresiones, engagement, clics, crecimiento de seguidores\n- Observaciones cualitativas de la semana\n- Calificación general del desempeño\n- Análisis de performance por plataforma\n- Comparativa de contenido propuesto vs. resultados\n- Meta general para el próximo mes y justificación\n- Datos internos: objetivo SMART, insights clave, recomendaciones, etc."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Diagnóstico Avanzado",
          tooltipContent: "Nivel 1 +\n- Análisis de sentimiento: observaciones, oportunidades de contenido, etc.\n- Radar competitivo: comparación con el principal competidor\n- Priorización de acciones para el mes siguiente"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Diagnóstico GMS+",
          tooltipContent: "Nivel 2 +\n- Pruebas A/B propuestas para el mes siguiente\n- Tabla de pendientes: tareas no realizadas, razón y acción correctiva\n- Resumen de avances: mejores resultados, metas, campañas activas, diagnóstico clave y resumen ejecutivo"
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
          tooltipContent: "- Registro semanal de publicaciones por plataforma\n- Seguimiento de publicaciones en Google My Business\n- Resumen de campañas UGC con creadores/influencers\n- Calendario de campañas ADS (opcional)\n- Resumen mensual: objetivos SMART, pilares de contenido, KPIs, etc."
        },
        {
          levelNumber: 2,
          displayType: "text",
          displayText: "Informe de gestión Avanzado",
          tooltipContent: "Nivel 1 +\n- Registro de métricas post-publicación (48h) para cada contenido\n- Resumen del objetivo táctico de cada post y copy específico.\n- Detalle de resultados y aprendizajes de colaboraciones y UGC.\n- Resumen cualitativo mensual más detallado"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Informe de gestión GMS+",
          tooltipContent: "Nivel 2 +\n- Planificación y registro de campañas ADS y UGC con mayor profundidad\n- Análisis estratégico de resultados: inversión, ROI, etc.\n- Resumen ejecutivo mensual con énfasis en la toma de decisiones."
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
          tooltipContent: "Resumen general del trimestre:\n\n-Video análisis Personal\n\n-Principales logros, métricas estrella, observaciones clave\n\n-Datos generales trimestrales por plataforma\n\n-Tendencia general y comentarios adicionales por plataforma\nResultados de Google My Business y colaboraciones y campañas UGC\n\n-Benchmarking: comparación de posts destacados y aprendizajes clave con el principal competidor\n\n-Resumen de logros, aprendizajes tácticos y observaciones de la comunidad\n\n-Valoración estratégica trimestral\n\n-Conclusiones finales y enfoque para el próximo trimestre\n\n-Espacio para feedback del cliente y fecha sugerida para la próxima revisión"
        },
        {
          levelNumber: 3,
          displayType: "text",
          displayText: "Informe Trimestral GMS+",
          tooltipContent: "Nivel 2 +\n\nVideo análisis personal y resumen ejecutivo del trimestre\n\nRecomendación principal para el próximo trimestre\n\nDatos generales trimestrales para más plataformas (hasta 3 o más)\nObjetivos SMART de cada mes: KPI principal/secundario, meta, resultado y análisis de cumplimiento\n\nAnálisis de pruebas A/B realizadas cada mes: hipótesis, grupos, KPI, duración, aprendizajes clave\n\nAnálisis de sentimiento y oportunidades: insight principal, impacto estimado, justificación y oportunidades de contenido/formato sugerido\n\nBenchmarking más profundo: estrategias y tácticas, gap analysis (dónde se superó y dónde no al competidor), insight clave y acción estratégica para cerrar brechas\n\nAcciones correctivas y gestión de bloqueos: recomendaciones, justificación, impacto, acción propuesta y decisiones del cliente por mes\n\nConclusiones finales y próximos pasos detallados (GMS y cliente), aprendizajes clave y resumen del trimestre"
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
      serviceName: "Linea del Tiempo",
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
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center">
            <FadeIn delay={0.1} className="text-4xl lg:text-6xl font-black text-foreground mb-8">
              SUSCRIPCIONES
            </FadeIn>
            <FadeIn delay={0.2} className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Planes mensuales escalables diseñados para acompañar tu negocio en cada etapa de su crecimiento digital.
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Features Table */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Compara Características Entre Planes
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
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-3 py-1"
                          >
                            Ver Precio
                          </Button>
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
                                <p>{service.serviceDescription}</p>
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
                                    <p>{levelDetail.tooltipContent}</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Comienza tu Transformación Digital Hoy
            </h2>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
              No dejes que el tiempo siga siendo un obstáculo para tu crecimiento. Solicita tu Impulso Estratégico y descubre cómo podemos ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/estrategia">
                <Button variant="hero-yellow" size="lg" className="text-lg px-10 py-8">
                  Solicitar Impulso Estratégico
                </Button>
              </Link>
              <Link to="/contacto">
                <Button variant="outline" size="lg" className="text-lg px-10 py-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contactar Ahora
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