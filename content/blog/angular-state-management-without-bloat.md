---
title: Angular State Management Without the Bloat
description: How I manage state in Angular applications without heavy libraries — using signals, services, and smart component design to keep things simple, fast, and maintainable.
date: 2026-01-15
image: https://images.pexels.com/photos/11035543/pexels-photo-11035543.jpeg
minRead: 5
author:
  name: Edward Omondi
  avatar:
    src: /images/edward-profile.png
    alt: Edward Omondi
---

State management is where many Angular projects become unnecessarily complex. After building several production Angular applications — including the Aims property management system and Herdwise — here's the approach I've settled on.

## Start Simple: Services + Observables

For most application state, a well-designed service with `BehaviorSubject` observables is all you need. Components subscribe to the stream, the service manages transitions — no store libraries required.

```typescript
@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUser$ = new BehaviorSubject<User | null>(null);

  getUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  setUser(user: User): void {
    this.currentUser$.next(user);
  }
}
```

## Angular Signals (Angular 16+)

Angular's built-in signals are now my first choice for component-level and simple shared state. They're synchronous, fine-grained, and require zero boilerplate:

```typescript
export class DashboardComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

## When to Reach for More

Only introduce a state management library if you genuinely need time-travel debugging, complex cross-module state sharing, or a very large team that benefits from strict conventions. For most projects I've worked on — including Aims and Herdwise — that bar is never reached.

The real win is keeping your components thin. Push logic into services, keep templates declarative, and your application stays testable and understandable even as it grows.

## OnPush Change Detection

Pair this approach with `ChangeDetectionStrategy.OnPush` on all components. Combined with signals or observables, this gives you near-optimal rendering performance without any manual optimisation.

```typescript
@Component({
  selector: "app-property-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
})
export class PropertyCardComponent {}
```

Keep it simple. Reach for complexity only when simple provably breaks.
