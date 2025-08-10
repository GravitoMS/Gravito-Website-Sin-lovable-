// Plugin de ESLint personalizado para validar colores de Gravito
// Este plugin detecta el uso de colores no autorizados fuera del sistema centralizado

const AUTHORIZED_COLORS = [
  // Colores del sistema centralizado
  'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info',
  'card', 'border', 'foreground', 'muted', 'background', 'white', 'black', 'transparent',
  
  // Variaciones autorizadas
  'primary-50', 'primary-100', 'primary-200', 'primary-300', 'primary-400',
  'primary-500', 'primary-600', 'primary-700', 'primary-800', 'primary-900', 'primary-950',
  
  'secondary-50', 'secondary-100', 'secondary-200', 'secondary-300', 'secondary-400',
  'secondary-500', 'secondary-600', 'secondary-700', 'secondary-800', 'secondary-900', 'secondary-950',
  
  'accent-50', 'accent-100', 'accent-200', 'accent-300', 'accent-400',
  'accent-500', 'accent-600', 'accent-700', 'accent-800', 'accent-900', 'accent-950',
];

// Colores NO autorizados que deben ser reemplazados
const UNAUTHORIZED_COLORS = [
  'green-50', 'green-100', 'green-200', 'green-300', 'green-400',
  'green-500', 'green-600', 'green-700', 'green-800', 'green-900', 'green-950',
  
  'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400',
  'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900', 'gray-950',
  
  'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400',
  'blue-500', 'blue-600', 'blue-700', 'blue-800', 'blue-900', 'blue-950',
  
  'red-50', 'red-100', 'red-200', 'red-300', 'red-400',
  'red-500', 'red-600', 'red-700', 'red-800', 'red-900', 'red-950',
  
  'yellow-50', 'yellow-100', 'yellow-200', 'yellow-300', 'yellow-400',
  'yellow-500', 'yellow-600', 'yellow-700', 'yellow-800', 'yellow-900', 'yellow-950',
];

module.exports = {
  meta: {
    name: 'gravito-colors',
    version: '1.0.0',
    description: 'Plugin para validar colores del sistema centralizado de Gravito',
  },
  
  rules: {
    'no-unauthorized-colors': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Prohibir el uso de colores no autorizados fuera del sistema centralizado',
          category: 'Best Practices',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
          unauthorizedColor: 'Color no autorizado "{{color}}". Use colores del sistema centralizado: {{authorizedColors}}',
        },
      },
      
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              // Buscar clases de Tailwind con colores no autorizados
              const tailwindClasses = node.value.split(' ');
              
              tailwindClasses.forEach(className => {
                UNAUTHORIZED_COLORS.forEach(unauthorizedColor => {
                  if (className.includes(unauthorizedColor)) {
                    context.report({
                      node,
                      messageId: 'unauthorizedColor',
                      data: {
                        color: unauthorizedColor,
                        authorizedColors: AUTHORIZED_COLORS.slice(0, 10).join(', ') + '...',
                      },
                      suggest: [
                        {
                          desc: `Reemplazar ${unauthorizedColor} con primary-800`,
                          fix: (fixer) => {
                            const newValue = node.value.replace(
                              new RegExp(unauthorizedColor, 'g'),
                              'primary-800'
                            );
                            return fixer.replaceText(node, `'${newValue}'`);
                          },
                        },
                        {
                          desc: `Reemplazar ${unauthorizedColor} con secondary-800`,
                          fix: (fixer) => {
                            const newValue = node.value.replace(
                              new RegExp(unauthorizedColor, 'g'),
                              'secondary-800'
                            );
                            return fixer.replaceText(node, `'${newValue}'`);
                          },
                        },
                      ],
                    });
                  }
                });
              });
            }
          },
          
          TemplateLiteral(node) {
            node.quasis.forEach(quasi => {
              if (quasi.value.raw) {
                const tailwindClasses = quasi.value.raw.split(' ');
                
                tailwindClasses.forEach(className => {
                  UNAUTHORIZED_COLORS.forEach(unauthorizedColor => {
                    if (className.includes(unauthorizedColor)) {
                      context.report({
                        node,
                        messageId: 'unauthorizedColor',
                        data: {
                          color: unauthorizedColor,
                          authorizedColors: AUTHORIZED_COLORS.slice(0, 10).join(', ') + '...',
                        },
                      });
                    }
                  });
                });
              }
            });
          },
        };
      },
    },
    
    'use-centralized-colors': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Sugerir el uso de colores del sistema centralizado',
          category: 'Best Practices',
          recommended: true,
        },
        schema: [],
        messages: {
          suggestCentralizedColor: 'Considere usar colores del sistema centralizado en lugar de colores personalizados',
        },
      },
      
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string' && node.value.includes('#')) {
              // Detectar colores hexadecimales personalizados
              context.report({
                node,
                messageId: 'suggestCentralizedColor',
                suggest: [
                  {
                    desc: 'Usar primary.500 del sistema centralizado',
                    fix: (fixer) => {
                      return fixer.replaceText(node, "'primary.500'");
                    },
                  },
                ],
              });
            }
          },
        };
      },
    },
  },
};
