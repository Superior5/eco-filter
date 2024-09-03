module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ],
  shortcuts: {
    'input-1': 'rounded-6px md:h-45px h-40px border-solid border border-rarely-1 py-4px px-16px',
    'h-2': 'font-mulish xl:text-24px text-20px font-bold'
  },
  theme: {
    extend: {
      backgroundImage: {
        'sert-desc': "url('@/assets/images/sections/5/bg-desc.png')",
        'sert-laptop': "url('@/assets/images/sections/5/bg-laptop.png')",
        'sert-mobile': "url('@/assets/images/sections/5/bg-mobile.png')",
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
        ptsans: ['PT Sans', 'sans-serif'],
        notosans: ['Noto Sans', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        regular: {
          0: '#E65100',
          1: '#304FFE',
          2: '#50CE00',
          3: '#FFF7F1',
          4: '#FF5252',
          5: '#00D085',
          6: '#64DD17'
        },
        rarely: {
          0: '#BDBDBD',
          1: '#9E9E9E',
          2: '#EAEAEA',
          3: '#4F4F4F',
          4: '#F5F5F5',
          5: '#E1FDD3',
          6: '#E0E0E0'
        }
      },
    },
    container: {
      center: true,
      padding: {
        'DEFAULT': '15px',
        'lg': '20px',
      }
    },
    borderRadius: {
    },
    boxShadow: {
      0: '0px 1px 2px 0px rgba(0, 0, 0, 0.20), 0px 0.1px 0.3px 0px rgba(0, 0, 0, 0.10)',
      1: '0px 0px 40px 0px rgba(0, 0, 0, 0.15)',
      2: '0px 0px 39px 0px rgba(0, 0, 0, 0.20)',
      3: '0px 2px 4px 0px rgba(0, 0, 0, 0.03), 0px 7px 7px 0px rgba(0, 0, 0, 0.03), 0px 16px 9px 0px rgba(0, 0, 0, 0.02), 0px 28px 11px 0px rgba(0, 0, 0, 0.00), 0px 44px 12px 0px rgba(0, 0, 0, 0.00)',
      4: '0px 0px 6px rgba(0, 0, 0, 0.25)',
      5: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)'
    },
    spacing: {
    },
    backgroundImage: {
      // 0: 'url(@/assets/imgs/main-bg.jpg)'
    }
  },
  plugins: [
    require('windicss/plugin/line-clamp'),
  ]
}
