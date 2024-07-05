import { HttpStatus } from '@nestjs/common'

interface ResponseData<T> {
  // Below just informs IDE and/or TS-compiler (it's set in `.js` file).
  message: string
  statusCode: HttpStatus
  data: T
}

export { ResponseData }
