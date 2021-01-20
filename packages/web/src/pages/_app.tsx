import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Base, theme } from '../styles'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Base>
          <Component {...pageProps} />
        </Base>
      </ThemeProvider>
    </>
  )
}
