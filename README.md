# Sistema de Suscripciones Premium

Prueba de concepto en TypeScript para gestionar usuarios, suscripciones y
pagos aplicando patrones de diseño, MVC y principios SOLID.

## Ejecutar

```bash
npm install
npm run dev
npm test
npm run typecheck
```

`npm run dev` ejecuta automáticamente el flujo solicitado: registra un usuario,
crea un plan premium mediante una fábrica, procesa el pago, persiste la factura
y notifica a los observadores.

## Patrones implementados

- **Singleton:** `DatabaseConnection` conserva usuarios, suscripciones y
  facturas en una única base en memoria.
- **Factory Method:** `PlanFactory` crea planes y `NotificationFactory` elige
  Email, SMS o Push según la preferencia del usuario.
- **Repository:** las interfaces de repositorio aíslan la persistencia de la
  lógica de negocio.
- **Observer:** `PaymentService` notifica el pago completado a notificaciones,
  métricas y control de acceso.
- **MVC:** los controladores coordinan servicios y `ConsoleView` presenta el
  resultado.

## SOLID

Cada capa tiene una responsabilidad específica. Los controladores y servicios
reciben abstracciones por constructor. Los planes son sustituibles mediante la
clase base `Plan`, las interfaces son pequeñas y un nuevo procesador de pago
puede agregarse implementando `IPaymentProcessor`. Las fábricas aceptan nuevos
creadores en su constructor, por lo que es posible sumar planes o canales sin
modificar sus clases.

El UML puede verse directamente en
[docs/diagrama-clases.md](docs/diagrama-clases.md). También se incluye la fuente
[PlantUML](docs/diagrama-clases.puml).
