import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				text: 'var(--color-text-primary)',
  				bg: 'var(--color-bg-primary)',
  				accent: 'var(--color-accent)',
  				surface: 'var(--color-surface)',
  				'accent-light': 'var(--color-accent-light)',
  				neutral: 'var(--color-neutral)',
  				'botanical-1': 'var(--color-botanical-1)',
  				'botanical-2': 'var(--color-botanical-2)'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'var(--font-heading)'
  			],
  			subheading: [
  				'var(--font-subheading)'
  			],
  			body: [
  				'var(--font-body)'
  			],
  			ui: [
  				'var(--font-ui)'
  			]
  		},
  		spacing: {
  			section: '96px',
  			subsection: '48px'
  		},
  		maxWidth: {
  			site: '1200px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.3s ease-out',
  			'accordion-up': 'accordion-up 0.3s ease-out'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
};
