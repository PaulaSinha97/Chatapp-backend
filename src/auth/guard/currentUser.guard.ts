import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); // Extract user from token
    const user = this.validateToken(token);
    if (user) {
      request.user = user; // Attach user to request
      return true;
    }
    return false;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    // use this link https://stackoverflow.com/questions/58670553/nestjs-gateway-websocket-how-to-send-jwt-access-token-through-socket-emit
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log('hereeeeefef', token, type);
    return type === 'Bearer' ? token : undefined;
  }

  private validateToken(token: string): any {
    // Add your token validation logic here
    if (!token) return null;
    console.log('tokentoken', token);
    const decodedPayload = this.jwtService.verify(token);
    console.log('decodedPayload', decodedPayload);
    const { id } = decodedPayload;
    console.log('id sent to be set', typeof id);
    // Decode token and return user payload (e.g., using JWT library)
    // return { id: 1, name: 'John Doe', role: 'admin' }; // Example user
    return id;
  }
}
