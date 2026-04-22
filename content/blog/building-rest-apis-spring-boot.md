---
title: Building Production-Ready REST APIs with Spring Boot
description: A practical guide to designing and implementing scalable REST APIs using Spring Boot — covering layered architecture, validation, exception handling, and security patterns I use in production.
date: 2026-02-10
image: https://kambei.dev/assets/img/posts/spring_logos.png
minRead: 7
author:
  name: Edward Omondi
  avatar:
    src: /images/edward-profile.png
    alt: Edward Omondi
---

After years of building Spring Boot APIs for production systems — from gift card platforms to IoT-connected web applications — I've developed patterns that consistently produce clean, maintainable, and scalable REST services. Here's what I've learned.

## Layer Your Application Strictly

The most important thing you can do is enforce strict layering: **Controller → Service → Repository**. Controllers handle HTTP concerns only. Services contain business logic. Repositories abstract data access. Mixing these creates code that's impossible to test or maintain at scale.

## Validate at the Boundary

Use `@Valid` and Bean Validation annotations on your request DTOs — not your entities. Your API surface is where bad data enters; that's where validation belongs. Never let invalid data reach your service layer.

```java
public record CreateGiftCardRequest(
    @NotBlank String recipientEmail,
    @Positive BigDecimal amount,
    @NotNull LocalDate expiryDate
) {}
```

## Centralise Exception Handling

A `@ControllerAdvice` class with `@ExceptionHandler` methods gives you one place to map exceptions to consistent HTTP responses. This keeps controllers clean and ensures uniform error payloads across your entire API.

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

## Secure from Day One

Integrating Keycloak for OAuth 2.0 authentication is something I set up at project inception, not as an afterthought. Spring Security's resource server configuration makes it straightforward to protect endpoints and extract JWT claims for authorisation:

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

## Use DTOs, Not Entities

Never expose JPA entities directly from your API. DTOs give you control over your API contract independent of your database schema, prevent accidental field exposure, and eliminate lazy-loading exceptions in responses.

These patterns have served me well across multiple production deployments. The key is consistency — apply them uniformly from the start, and your API will stay maintainable as it grows.
