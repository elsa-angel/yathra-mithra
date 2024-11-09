// @ts-ignore
import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
// import { route } from '../../vendor/tightenco/ziggy'
import { RouteName } from 'ziggy-js'

const appName = import.meta.env.VITE_APP_NAME || 'Yathra-Mithra'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
      resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
      ),
    setup: ({ App, props }) => {
      global.route<RouteName> = (name: any, params: any, absolute: any) =>
        // @ts-ignore
        route(name, params, absolute, {
          // @ts-expect-error
          ...page.props.ziggy,
          // @ts-expect-error
          location: new URL(page.props.ziggy.location)
        })

      return <App {...props} />
    }
  })
)
