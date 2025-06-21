import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestService } from 'src/service/request.service';
// middleware are only for hhtp request, socket k lie we will have to use custom guard only

// this was an approach being tried to use setter and getter for getting current user, but socket k lie we cam't use middleware (only for http request), so we will use the earlier approach
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly requestService: RequestService,
    private readonly jwtService: JwtService,
  ) {}
  use(req: any, res: Response, next: (error?: Error | any) => void) {
    console.log('Authentication middleware');
    const authHeader = req.headers['authorization'];
    console.log('Authentication middleware', authHeader);
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token); // Replace with your secret key
      req['user'] = decoded; // Attach decoded user info to the request object
      const userId = req.user;
      this.requestService.setUser(userId);
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
