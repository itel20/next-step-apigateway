import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AccountService } from './account.service';
import { Authority } from 'app/config/authority.constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const NoAuthGuard: CanActivateFn = (): Observable<boolean> => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.identity().pipe(
    map(account => {
      if (account && account.authorities && account.authorities.length > 0) {
        const role = account.authorities[0]; // ✅ string

        // 🔹 Redirection selon le rôle
        if (role === 'ROLE_ADMIN') {
          router.navigate(['/admin/dashboard']);
        } else {
          router.navigate(['/home']);
        }

        return false; // Bloque l'accès à /login si déjà connecté
      }

      return true; // Autorise l'accès au login si non connecté
    }),
  );
};
