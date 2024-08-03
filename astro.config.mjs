import { defineConfig, squooshImageService } from 'astro/config'
import viteSassGlob from 'vite-plugin-sass-glob-import'
import icon from 'astro-icon'


// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  // site: 'https://htmlonelove.github.io',
  compressHTML: false,
  output: 'static',
  publicDir: './public',
  build: {
    format: 'file', // вытаскивает вложенные страницы в корень src/pages/subpage/subpage.html => dist/subpage.html
    assetsPrefix: '.', // добавляет `.` в пути скриптов и стилей
    // inlineStylesheets: 'never', // запрещает инлайн стилей
  },
  image: {
    service: squooshImageService(),
  },
  integrations: [
    icon({
      svgoOptions: {
        plugins: [
          'preset-default'
        ],
      },
    })
  ],
  vite: {
    build: {
      minify: false,
      assetsInlineLimit: 0, // запрещает инлайн скриптов. по дефолту инлайнит скрипты в html
      cssCodeSplit: true, // css в один файл
      rollupOptions: {
        output: {
          entryFileNames: 'scripts-[hash].js',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1)
            if (/css/.test(extType)) {
              return 'assets/css/styles-[hash][extname]'
            } else if (
              /png|jpe?g|svg|webp|avif|gif|tiff|bmp|ico/i.test(extType)
            ) {
              return 'assets/img/[name]-[hash][extname]'
            } else {
              return 'assets/[name]-[hash][extname]'
            }
          },
        },
      },
    },
    plugins: [
      viteSassGlob()
    ],
  },
})
