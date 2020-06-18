import { createLogger, format, transports } from 'winston'

const { combine, printf } = format

const myFormat = printf(({ level, message }) => {
  const atualDate = new Date()
  return `${level}: ${message} - ${atualDate.toLocaleString('pt-br')}`
})

const logger = createLogger({
  format: combine(format.splat(), myFormat),
  transports: [new transports.Console()],
})

export default logger
