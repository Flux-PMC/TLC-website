import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },

  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: false, validation: { isRequired: true } }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog',
          validation: { isRequired: true },
        }),
        published: fields.checkbox({ label: 'Published', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),

    portfolio: collection({
      label: 'Portfolio Images',
      slugField: 'title',
      path: 'src/content/portfolio/*',
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/portfolio',
          publicPath: '/images/portfolio',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Families', value: 'families' },
            { label: 'Couples', value: 'couples' },
            { label: 'Seniors', value: 'seniors' },
            { label: 'Newborns', value: 'newborns' },
            { label: 'Maternity', value: 'maternity' },
            { label: 'Engagements', value: 'engagements' },
          ],
          defaultValue: 'families',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        order: fields.number({ label: 'Display Order' }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      slugField: 'clientName',
      path: 'src/content/testimonials/*',
      schema: {
        clientName: fields.slug({ name: { label: 'Client Name', validation: { isRequired: true } } }),
        sessionType: fields.select({
          label: 'Session Type',
          options: [
            { label: 'Families', value: 'families' },
            { label: 'Couples', value: 'couples' },
            { label: 'Seniors', value: 'seniors' },
            { label: 'Newborns', value: 'newborns' },
            { label: 'Maternity', value: 'maternity' },
            { label: 'Engagements', value: 'engagements' },
          ],
          defaultValue: 'families',
        }),
        quote: fields.text({ label: 'Quote', multiline: true, validation: { isRequired: true } }),
        date: fields.date({ label: 'Date' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
      },
    }),

    faq: collection({
      label: 'FAQ Items',
      slugField: 'question',
      path: 'src/content/faq/*',
      schema: {
        question: fields.slug({ name: { label: 'Question', validation: { isRequired: true } } }),
        answer: fields.text({ label: 'Answer', multiline: true, validation: { isRequired: true } }),
        order: fields.number({ label: 'Display Order' }),
        published: fields.checkbox({ label: 'Published', defaultValue: true }),
      },
    }),
  },

  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings/site',
      schema: {
        siteTitle: fields.text({ label: 'Site Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        phone: fields.text({ label: 'Phone Number' }),
        email: fields.text({ label: 'Email Address' }),
        calendlyUrl: fields.text({ label: 'Calendly URL' }),
        chatbotUrl: fields.text({ label: 'Chatbot URL' }),
      },
    }),
  },
});
