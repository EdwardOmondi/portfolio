---
title: Building a Smart Lock Controller with Raspberry Pi and Spring Boot
description: How I designed and implemented the IoT smart lock system behind Aims — a Raspberry Pi running Python, connected to a Spring Boot API, controlled via an Angular web app. Hardware meets software engineering.
date: 2025-09-05
image: https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 6
author:
  name: Edward Omondi
  avatar:
    src: /images/edward-profile.png
    alt: Edward Omondi
---

When I co-founded Aims — a property management platform for short-term rentals — the core challenge was bridging a web application with a physical solenoid lock. The solution: a Raspberry Pi running Python, communicating with our Spring Boot backend via REST. My Mechatronics Engineering background made this feel natural, but there were still plenty of engineering decisions to get right.

## The Architecture

The system has three clear layers:

1. **Angular Web App**: Hosts manage properties, create bookings, and issue time-bound access codes
2. **Spring Boot API**: Validates access requests, maintains lock state in PostgreSQL, and exposes device commands
3. **Raspberry Pi (Python)**: Polls the API and controls the GPIO pin connected to the solenoid lock

This separation means the Pi is as dumb as possible — it just asks "should I unlock?" and acts accordingly. All business logic stays in the API.

## Raspberry Pi GPIO Control

The Pi runs a lightweight Python script that polls the Spring Boot API for unlock commands:

```python
import RPi.GPIO as GPIO
import requests
import time

LOCK_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(LOCK_PIN, GPIO.OUT)

def check_and_unlock():
    response = requests.get(
        'https://api.aims.homes/lock/status',
        headers={'X-Device-Key': DEVICE_KEY}
    )
    if response.json().get('unlock'):
        GPIO.output(LOCK_PIN, GPIO.HIGH)
        time.sleep(5)
        GPIO.output(LOCK_PIN, GPIO.LOW)

while True:
    check_and_unlock()
    time.sleep(2)
```

## Security Considerations

The device key is rotated periodically and stored in environment variables on the Pi — never hardcoded. The API endpoint validates the key and checks that the requesting device is registered to the specific lock unit before issuing any command. All communication is over HTTPS.

## Lessons Learned

**Polling works fine** for a lock system where a 2-second response lag is acceptable. For lower latency, WebSockets or MQTT would be the next step — something worth considering as Aims scales.

**Always handle GPIO cleanup on process exit.** A floating GPIO pin can cause unexpected lock behaviour. Register a `GPIO.cleanup()` call on `SIGTERM` and `SIGINT`.

**The Pi needs a watchdog.** A hung Python process means a lock that never responds. We run the script as a `systemd` service with `Restart=always` and a hardware watchdog timer enabled.

Seeing a physical lock respond to a button press in a web app you built end-to-end — that never gets old.
