---
title: Securing Web Apps with Keycloak and OAuth 2.0
description: A practical walkthrough of integrating Keycloak as an OAuth 2.0/OpenID Connect provider with Spring Boot backends and Angular frontends — based on real production experience across multiple applications.
date: 2025-11-20
image: https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 8
author:
  name: Edward Omondi
  avatar:
    src: /images/edward-profile.png
    alt: Edward Omondi
---

Authentication is one of those things you really don't want to get wrong. After implementing Keycloak across multiple production systems at Technovation Ventures, I've developed a reliable pattern for integrating it with Spring Boot backends and Angular frontends.

## Why Keycloak?

Keycloak gives you a full OAuth 2.0 and OpenID Connect identity provider you can self-host. You get user management, social logins, MFA, and fine-grained authorisation — without building any of it yourself. For B2B SaaS or multi-tenant systems, it's hard to beat.

## Spring Boot Configuration

Add the Spring Security OAuth2 resource server dependency and configure your `application.yml`:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://your-keycloak-domain/realms/your-realm
```

Then configure your security filter chain to protect routes:

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**").permitAll()
            .anyRequest().authenticated())
        .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
        .build();
}
```

## Angular HTTP Interceptor

On the frontend, an HTTP interceptor attaches the JWT to every outgoing request automatically:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(KeycloakService).getToken();
  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
```

## Extracting Roles from JWT

Keycloak embeds roles in JWT claims. On the Spring Boot side, extract these in a custom JWT converter to use them with `@PreAuthorize`:

```java
@PreAuthorize("hasRole('admin')")
public ResponseEntity<List<User>> getAllUsers() { ... }
```

## Multi-Tenancy

For multi-tenant applications like Cardly, each organisation gets its own Keycloak realm. The backend reads the realm from the JWT issuer claim, allowing a single API to serve multiple tenants with complete data isolation.

This setup has been running in production across several projects — it's robust, scales well, and keeps auth cleanly separated from business logic.
