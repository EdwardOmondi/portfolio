export default defineAppConfig({
  global: {
    picture: {
      dark: '/images/edward-profile.jpg',
      light: '/images/edward-profile.jpg',
      alt: 'Edward Omondi'
    },
    meetingLink: 'mailto:ewomondi@gmail.com',
    email: 'ewomondi@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Edward Omondi • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://linkedin.com/in/edwardomondi-6644b7a8/',
      'target': '_blank',
      'aria-label': 'Edward on LinkedIn'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/EdwardOmondi',
      'target': '_blank',
      'aria-label': 'Edward on GitHub'
    }]
  }
})
