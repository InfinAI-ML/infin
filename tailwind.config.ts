import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			rosewater: '#dc8a78',
  			flamingo: '#dd7878',
  			pink: '#ea76cb',
  			mauve: '#8839ef',
  			red: '#d20f39',
  			maroon: '#e64553',
  			peach: '#fe640b',
  			yellow: '#df8e1d',
  			green: '#40a02b',
  			teal: '#179299',
  			sky: '#04a5e5',
  			sapphire: '#209fb5',
  			blue: '#1e66f5',
  			lavender: '#7287fd',
  			text: '#4c4f69',
  			subtext1: '#5c5f77',
  			subtext0: '#6c6f85',
  			overlay2: '#7c7f93',
  			overlay1: '#8c8fa1',
  			overlay0: '#9ca0b0',
  			surface2: '#acb0be',
  			surface1: '#bcc0cc',
  			surface0: '#ccd0da',
  			base: '#eff1f5',
  			mantle: '#e6e9ef',
  			crust: '#dce0e8',
  			latte: '#eff1f5',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		opacity: {
  			'15': '0.15'
  		},
  		backgroundImage: {
  			'cat-pattern': "url('/images/cat-pattern.png')"
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    'bg-sapphire',
    'bg-mauve',
    'bg-teal',
    'bg-peach',
    'bg-pink',
    'bg-lavender',
    'bg-rosewater',
    'bg-flamingo',
    'shadow-sapphire/20',
    'shadow-mauve/20',
    'shadow-teal/20',
    'shadow-peach/20',
    'shadow-pink/20',
    'shadow-lavender/20',
    'text-sapphire',
    'text-mauve',
    'text-teal',
    'text-peach',
    'text-pink',
    'text-lavender',
    'text-latte',
    'text-text',
    'text-subtext0',
    'text-subtext1',
    'border-lavender',
    'border-pink',
    'border-surface0',
  ],
} satisfies Config;
