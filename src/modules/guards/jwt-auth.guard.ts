import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const excludedRoutes = ['/auth/register', '/auth/login']; // Ваши публичные маршруты

    // Проверка, если текущий маршрут в списке исключений
    if (excludedRoutes.includes(request.url)) {
      return true;
    }

    // добавить свою логику для проверки токена
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) return false;

      // Валидация токена
      this.jwtService.verify(token);
      return true; // Если токен валиден
    } catch (error) {
      return false; // Если токен невалиден
    }
  }
}

// ----- defualt setting -------
// import { Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {}
