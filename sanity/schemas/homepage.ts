import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero (En-tête)' },
    { name: 'about', title: 'À propos' },
    { name: 'amenities', title: 'Équipements' },
    { name: 'experiences', title: 'Expériences' },
    { name: 'pricing', title: 'Tarifs' },
    { name: 'location', title: 'Localisation' },
  ],
  fields: [
    // HERO SECTION
    defineField({
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Accroche',
      type: 'string',
      group: 'hero',
      description: 'Ex: "Your Private Tropical Paradise"',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description',
      type: 'text',
      group: 'hero',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Image de fond',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideo',
      title: 'Vidéo de fond (optionnel)',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/*' },
      description: 'Si renseigné, remplace l\'image de fond',
    }),
    defineField({
      name: 'heroCta',
      title: 'Texte du bouton principal',
      type: 'string',
      group: 'hero',
      initialValue: 'Book Your Stay',
    }),
    defineField({
      name: 'heroCtaSecondary',
      title: 'Texte du bouton secondaire',
      type: 'string',
      group: 'hero',
      initialValue: 'Explore the Villa',
    }),
    defineField({
      name: 'heroCards',
      title: 'Cartes de présentation',
      type: 'array',
      group: 'hero',
      description: '4 cartes colorées pour mettre en avant vos atouts (emplacement, offres, nature, services)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type de carte',
              type: 'string',
              options: {
                list: [
                  { title: '📍 Emplacement (blanc)', value: 'location' },
                  { title: '🔥 Offre spéciale (rouge)', value: 'offer' },
                  { title: '🌿 Nature/Détente (vert)', value: 'nature' },
                  { title: '✨ Services premium (sombre)', value: 'service' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              options: {
                list: [
                  { title: 'Pin/Localisation', value: 'map-pin' },
                  { title: 'Plage', value: 'umbrella-beach' },
                  { title: 'Marche', value: 'footprints' },
                  { title: 'Tag/Réduction', value: 'tag' },
                  { title: 'Petit-déjeuner', value: 'coffee' },
                  { title: 'Cadeau', value: 'gift' },
                  { title: 'Feuille', value: 'leaf' },
                  { title: 'Lotus/Yoga', value: 'flower' },
                  { title: 'Jardin', value: 'tree-palm' },
                  { title: 'Soleil', value: 'sun' },
                  { title: 'Climatisation', value: 'snowflake' },
                  { title: 'WiFi', value: 'wifi' },
                  { title: 'Transport', value: 'car' },
                  { title: 'Avion', value: 'plane' },
                  { title: 'Étoile', value: 'star' },
                ],
              },
            },
            {
              name: 'text',
              title: 'Texte principal',
              type: 'string',
              validation: (Rule) => Rule.required().max(50),
              description: 'Ex: "5 min de la plage", "-15% pour 3+ nuits"',
            },
            {
              name: 'subtext',
              title: 'Sous-texte (optionnel)',
              type: 'string',
              description: 'Ex: "Plage de Ahangama", "Wi-Fi haut débit"',
            },
          ],
          preview: {
            select: { title: 'text', type: 'type' },
            prepare: ({ title, type }) => ({
              title: title,
              subtitle: type === 'location' ? '📍 Emplacement' : type === 'offer' ? '🔥 Offre' : type === 'nature' ? '🌿 Nature' : '✨ Services',
            }),
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ABOUT SECTION
    defineField({
      name: 'aboutTitle',
      title: 'Titre section À propos',
      type: 'string',
      group: 'about',
      initialValue: 'Welcome to Athmaya',
    }),
    defineField({
      name: 'aboutSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'about',
    }),
    defineField({
      name: 'aboutDescription',
      title: 'Description',
      type: 'text',
      group: 'about',
      rows: 5,
    }),
    defineField({
      name: 'aboutImage',
      title: 'Image principale (fallback)',
      type: 'image',
      group: 'about',
      options: { hotspot: true },
      description: 'Utilisée si aucune image dans le carrousel',
    }),
    defineField({
      name: 'aboutImages',
      title: 'Images du carrousel',
      type: 'array',
      group: 'about',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images qui défilent automatiquement (3-6 images recommandées)',
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'aboutHighlights',
      title: 'Points forts',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              options: {
                list: [
                  { title: 'Palmier', value: 'palmtree' },
                  { title: 'Vagues', value: 'waves' },
                  { title: 'Groupe', value: 'users' },
                  { title: 'Cœur', value: 'heart' },
                  { title: 'Piscine', value: 'pool' },
                  { title: 'Soleil', value: 'sun' },
                  { title: 'Cuisine', value: 'utensils' },
                  { title: 'WiFi', value: 'wifi' },
                  { title: 'Parking', value: 'car' },
                  { title: 'Avion', value: 'plane' },
                ],
              },
            },
            { name: 'title', title: 'Titre', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
          preview: {
            select: { title: 'title', icon: 'icon' },
            prepare: ({ title, icon }) => ({
              title: title,
              subtitle: icon,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // AMENITIES SECTION
    defineField({
      name: 'amenitiesTitle',
      title: 'Titre section Équipements',
      type: 'string',
      group: 'amenities',
      initialValue: 'Villa Amenities',
    }),
    defineField({
      name: 'amenitiesSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'amenities',
    }),

    // EXPERIENCES SECTION
    defineField({
      name: 'experiencesTitle',
      title: 'Titre section Expériences',
      type: 'string',
      group: 'experiences',
      initialValue: 'Local Experiences',
    }),
    defineField({
      name: 'experiencesSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'experiences',
    }),
    defineField({
      name: 'experiencesDescription',
      title: 'Description',
      type: 'text',
      group: 'experiences',
      rows: 3,
    }),

    // PRICING SECTION
    defineField({
      name: 'pricingTitle',
      title: 'Titre section Tarifs',
      type: 'string',
      group: 'pricing',
      initialValue: 'Rates & Packages',
    }),
    defineField({
      name: 'pricingSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'pricingDescription',
      title: 'Description',
      type: 'text',
      group: 'pricing',
      rows: 2,
    }),
    defineField({
      name: 'pricingInclusions',
      title: 'Ce qui est inclus',
      type: 'array',
      group: 'pricing',
      of: [{ type: 'string' }],
      description: 'Liste des services inclus dans le prix',
    }),
    defineField({
      name: 'pricingNotes',
      title: 'Notes importantes',
      type: 'array',
      group: 'pricing',
      of: [{ type: 'string' }],
      description: 'Ex: "50% deposit required", "Free cancellation up to 14 days"',
    }),

    // LOCATION SECTION
    defineField({
      name: 'locationTitle',
      title: 'Titre section Localisation',
      type: 'string',
      group: 'location',
      initialValue: 'Location',
    }),
    defineField({
      name: 'locationSubtitle',
      title: 'Sous-titre',
      type: 'string',
      group: 'location',
    }),
    defineField({
      name: 'locationDescription',
      title: 'Description',
      type: 'text',
      group: 'location',
      rows: 3,
    }),
    defineField({
      name: 'nearbyPlaces',
      title: 'Lieux à proximité',
      type: 'array',
      group: 'location',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom', type: 'string' },
            { name: 'distance', title: 'Distance', type: 'string' },
            { name: 'time', title: 'Temps de trajet', type: 'string' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'distance' },
          },
        },
      ],
    }),
    defineField({
      name: 'gettingHere',
      title: 'Comment venir',
      type: 'object',
      group: 'location',
      fields: [
        { name: 'fromAirport', title: 'Depuis l\'aéroport', type: 'text', rows: 2 },
        { name: 'byTrain', title: 'En train', type: 'text', rows: 2 },
        { name: 'byBus', title: 'En bus', type: 'text', rows: 2 },
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Page d\'accueil',
      subtitle: 'Contenu principal du site',
    }),
  },
})
