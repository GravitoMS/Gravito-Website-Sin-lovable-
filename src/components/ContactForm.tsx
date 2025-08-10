import { useState } from 'react'
import { FadeIn, HoverScale } from '@/components/ui/SimpleAnimations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulación de envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Resetear formulario
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      })
    } catch (error) {
      // Error handling
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="w-full max-w-2xl mx-auto">
      <HoverScale className="bg-card border border-border/50 rounded-lg p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
          Solicita tu Cotización Gratuita
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
              Nombre *
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
              Email *
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="company" className="block text-sm font-medium text-muted-foreground mb-2">
              Empresa (opcional)
            </Label>
            <Input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
            />
          </div>

          <div>
            <Label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-2">
              Servicio de Interés *
            </Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecciona un servicio</option>
              <option value="Desarrollo Web Personalizado">Desarrollo Web Personalizado</option>
              <option value="E-commerce Avanzado">E-commerce Avanzado</option>
              <option value="Aplicaciones Web">Aplicaciones Web</option>
              <option value="Optimización SEO">Optimización SEO</option>
              <option value="Marketing Digital">Marketing Digital</option>
              <option value="Consultoría Digital">Consultoría Digital</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <Label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-2">
              Presupuesto Estimado *
            </Label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Selecciona un rango</option>
              <option value="$500 - $2,000">$500 - $2,000</option>
              <option value="$2,000 - $5,000">$2,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
              <option value="A discutir">A discutir</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
              Mensaje *
            </Label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              placeholder="Cuéntanos sobre tu proyecto..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </form>
      </HoverScale>
    </FadeIn>
  )
}

export default ContactForm