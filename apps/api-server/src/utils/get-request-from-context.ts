import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export default function getRequestFromContext(context: ExecutionContext) {
  const request =
  context.getType() === 'http'
    ? context.switchToHttp().getRequest()
    : GqlExecutionContext.create(context).getContext().req;
  return request;
}
