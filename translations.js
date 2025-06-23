// translations.js - Language switcher for Liz Preciado Fincas
const translations = {
  es: {
    // Page title
    pageTitle: "Liz Preciado - Fincas Colombianas de Lujo | Retiros Premium en el Campo",
    
    // Navigation
    luxuryFincas: "Fincas de Lujo",
    experiences: "Experiencias",
    gallery: "Galería",
    testimonials: "Testimonios",
    about: "Acerca de",
    bookNow: "Reservar Ahora",
    
    // Contact
    whatsappLabel: "WhatsApp:",
    
    // Breadcrumb
    breadcrumbHome: "Inicio",
    breadcrumbColombia: "Colombia",
    breadcrumbMedellin: "Medellín",
    
    // Hero Section
    heroTitle: "Fincas Colombianas de Lujo",
    heroSubtitle: "creadas para tus sueños",
    heroDescription: "Descubre retiros campestres impresionantes en las ubicaciones más exclusivas de Medellín. Experimenta la auténtica hospitalidad colombiana con lujo y comodidad sin paralelo.",
    
    // CTAs
    ctaExplore: "Explorar Fincas de Lujo",
    ctaWhatsapp: "WhatsApp",
    scrollToExplore: "Desplázate para Explorar",
    
    // Services
    premiumFincas: "Fincas Premium",
    luxuryAmenities: "Amenidades de Lujo",
    exclusiveLocations: "Ubicaciones Exclusivas",
    customExperiences: "Experiencias Personalizadas",
    eventPlanning: "Planificación de Eventos",
    conciergeServices: "Servicios de Conserjería",
    privateTours: "Tours Privados",
    vipPackages: "Paquetes VIP",
    
    // Collection
    exclusiveCollection: "Nuestra Colección Exclusiva",
    exclusiveCollectionDesc: "Fincas de lujo seleccionadas en las ubicaciones más prestigiosas de Colombia",
    
    // Property details
    beds: "camas",
    baths: "baños",
    night: "noche",
    
    // Footer
    footerTagline: "Fincas Colombianas de Lujo",
    footerDescription: "Tu puerta de entrada al lujo auténtico en el campo colombiano.",
    contactTitle: "Contacto",
    footerCopyright: "Fincas de Liz Preciado. Todos los derechos reservados."
  },
  en: {
    // Page title
    pageTitle: "Liz Preciado - Luxury Colombian Fincas | Premium Countryside Retreats",
    
    // Navigation
    luxuryFincas: "Luxury Fincas",
    experiences: "Experiences",
    gallery: "Gallery",
    testimonials: "Testimonials",
    about: "About",
    bookNow: "Book Now",
    
    // Contact
    whatsappLabel: "WhatsApp:",
    
    // Breadcrumb
    breadcrumbHome: "Home",
    breadcrumbColombia: "Colombia",
    breadcrumbMedellin: "Medellín",
    
    // Hero Section
    heroTitle: "Luxury Colombian Fincas",
    heroSubtitle: "crafted for your dreams",
    heroDescription: "Discover breathtaking countryside retreats in Medellín's most exclusive locations. Experience authentic Colombian hospitality with unparalleled luxury and comfort.",
    
    // CTAs
    ctaExplore: "Explore Luxury Fincas",
    ctaWhatsapp: "WhatsApp",
    scrollToExplore: "Scroll to Explore",
    
    // Services
    premiumFincas: "Premium Fincas",
    luxuryAmenities: "Luxury Amenities",
    exclusiveLocations: "Exclusive Locations",
    customExperiences: "Custom Experiences",
    eventPlanning: "Event Planning",
    conciergeServices: "Concierge Services",
    privateTours: "Private Tours",
    vipPackages: "VIP Packages",
    
    // Collection
    exclusiveCollection: "Our Exclusive Collection",
    exclusiveCollectionDesc: "Handpicked luxury fincas in Colombia's most prestigious locations",
    
    // Property details
    beds: "beds",
    baths: "baths",
    night: "night",
    
    // Footer
    footerTagline: "Luxury Colombian Fincas",
    footerDescription: "Your gateway to authentic luxury in Colombia's countryside.",
    contactTitle: "Contact",
    footerCopyright: "Liz Preciado's Fincas. All rights reserved."
  }
};

// Language switcher functionality
class LanguageSwitcher {
  constructor() {
    // Default to Spanish, but check localStorage for saved preference
    this.currentLanguage = localStorage.getItem('language') || 'es';
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateContent();
    this.updateActiveButton();
    this.updateHtmlLang();
  }
  
  setupEventListeners() {
    // Add event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchLanguage(e.target.dataset.lang);
      });
    });
  }
  
  switchLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    
    this.updateActiveButton();
    this.updateContent();
    this.updateHtmlLang();
  }
  
  updateActiveButton() {
    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
    });
  }
  
  updateHtmlLang() {
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
  }
  
  updateContent() {
    const texts = translations[this.currentLanguage];
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.dataset.translate;
      if (texts[key]) {
        // Handle title separately as it needs to update document.title
        if (key === 'pageTitle') {
          document.title = texts[key];
        }
        element.textContent = texts[key];
      }
    });
    
    // Update placeholders if any
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
      const key = element.dataset.translatePlaceholder;
      if (texts[key]) {
        element.placeholder = texts[key];
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LanguageSwitcher();
});

// Add CSS for language switcher
const switcherCSS = `
.language-switcher {
  display: flex;
  gap: 2px;
  margin-right: 20px;
  order: -1;
}

.lang-btn {
  padding: 6px 12px;
  border: 2px solid #d4a574;
  background: transparent;
  color: #d4a574;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.lang-btn:hover {
  background: rgba(212, 165, 116, 0.1);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: #d4a574;
  color: white;
  box-shadow: 0 2px 8px rgba(212, 165, 116, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .language-switcher {
    position: absolute;
    top: 15px;
    right: 15px;
    margin-right: 0;
  }
  
  .lang-btn {
    padding: 4px 8px;
    font-size: 12px;
  }
}

/* Adjust header layout to accommodate language switcher */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.nav-container nav {
  flex: 1;
  display: flex;
  justify-content: center;
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = switcherCSS;
document.head.appendChild(style);