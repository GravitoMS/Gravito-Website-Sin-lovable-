#!/bin/bash

# Replace all FadeInUp with FadeIn in all page files
find src/pages -name "*.tsx" -exec sed -i 's/FadeInUp/FadeIn/g' {} \;

# Remove all framer-motion props that aren't supported by SimpleAnimations
find src/pages -name "*.tsx" -exec sed -i '/initial={{ opacity: 0, y: [0-9]\+ }}/d' {} \;
find src/pages -name "*.tsx" -exec sed -i '/animate={{ opacity: 1, y: 0 }}/d' {} \;
find src/pages -name "*.tsx" -exec sed -i '/transition={{ duration: [0-9.]\+[^}]*}}/d' {} \;
find src/pages -name "*.tsx" -exec sed -i '/whileInView={{ opacity: 1, y: 0 }}/d' {} \;
find src/pages -name "*.tsx" -exec sed -i '/viewport={{ once: true }}/d' {} \;

echo "Fixed all FadeInUp references"