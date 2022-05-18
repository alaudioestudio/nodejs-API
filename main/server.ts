/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import 'dotenv/config'

(async (): Promise<void> => {
  const app = (await import('./config/app')).default
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  app.listen(process.env.PORT || 3000, () => console.log(`Server running at http://localhost:${process.env.PORT as string}`))
})().catch(e => {
  console.log(e)
})
