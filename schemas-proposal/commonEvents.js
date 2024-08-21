export default {
  title: 'Aktiviteter',
  name: 'commonEvents',
  type: 'document',
  fields: [
    {
      title: 'Aktivitets navn',
      name: 'name',
      type: 'string',
      description: 'Navn på denne aktiviteten, e.g; møte, samling eller fritidsaktivitet',
      validation: (rule) => rule.required().min(10).max(30),
    },
  ],
}
