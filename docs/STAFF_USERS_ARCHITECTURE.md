# Análisis y Propuesta de Arquitectura: Staff y Users

## 📊 Análisis de la Situación Actual

### Estructura Actual

#### **Staff (Empleados)**
**Propósito**: Gestión de información de empleados y nómina
- ✅ Información personal: nombre, email, teléfonos, dirección, fotos
- ✅ Información laboral: código, fecha inicio, calendario
- ✅ Información de nómina: salario, TSS, AFP, descuentos, comisiones, horas trabajadas
- ⚠️ Campo `role` redundante (duplicado con sistema de roles de User)

#### **User (Usuarios)**
**Propósito**: Credenciales de acceso y permisos
- ✅ Credenciales: email, password, autenticación 2FA
- ✅ Estado: activo/inactivo
- ✅ Sistema de roles: many-to-many con tabla `roles`
- ⚠️ Duplicación: `name` y `email` también están en Staff

### Relación Actual
```
 

### Problemas Identificados

1. **Duplicación de Datos**
   - `name` y `email` están en ambas tablas
   - `role` en Staff es redundante con roles de User
   - Riesgo de inconsistencia de datos

2. **Separación de Responsabilidades Confusa**
   - Staff tiene campo `role` que no debería tener
   - User tiene `name` que debería venir de Staff
   - No está claro qué información va en cada modelo

3. **Flujo de Creación Complejo**
   - Para crear un User, primero debe existir un Staff
   - Dos pasos separados para una operación relacionada
   - No hay forma de crear Staff + User en una sola operación

4. **Falta de Claridad en Roles**
   - `role` en Staff parece ser un campo legacy
   - Sistema de roles en User es el correcto pero no se usa consistentemente
   - Confusión sobre qué rol usar para filtrar/buscar

## 🎯 Propuesta de Arquitectura Mejorada

### Principios de Diseño

1. **Separación de Responsabilidades**
   - **Staff**: Información de empleado y nómina (sin credenciales)
   - **User**: Credenciales de acceso y permisos (sin información de nómina)

2. **Single Source of Truth**
   - Información personal (nombre, email) solo en Staff
   - User referencia a Staff, no duplica datos

3. **Flexibilidad**
   - Un Staff puede existir sin User (empleado sin acceso al sistema)
   - Un User siempre debe estar vinculado a un Staff (para usuarios internos)

### Estructura Propuesta

#### **Staff (Empleados)**
```
Campos:
- Información Personal:
  • id (UUID)
  • name
  • email
  • personal_phone
  • fleet_phone
  • id_number
  • address
  • id_photo_url
  • employee_photo_url

- Información Laboral:
  • code
  • start_date
  • calendar_id
  • access_key (para sistemas externos)

- Información de Nómina:
  • salary
  • tss
  • afp
  • loans
  • work_error_deduction
  • other_deductions
  • discount
  • required_hours
  • worked_hours
  • overtime_value
  • total_hours_value
  • income
  • commission
  • commission_base
  • is_payroll_taxable
  • tss_deduction_schedule (JSON)
  • afp_deduction_schedule (JSON)

- Relaciones:
  • hasOne(User) - credenciales de acceso
  • hasOne(Calendar) - calendario de trabajo
```

#### **User (Usuarios)**
```
Campos:
- Credenciales:
  • id (auto-increment)
 usuarios internos)
  • email (debe coincidir con Staff.email si staff_id existe)
  • password
  • is_active
  • email_verified_at
  • two_factor_secret
  • two_factor_recovery_codes

- Relaciones:
  • belongsTo(Staff) - empleado asociado
  • belongsToMany(Role) - roles y permisos
```

### Cambios Necesarios

#### 1. Eliminar Duplicación
- ❌ Remover `name` de tabla `users` (usar `staff.name`)
- ❌ Remover `role` de tabla `staff` (usar `user.roles`)
- ✅ Mantener `email` en `users` solo para usuarios externos (si aplica)

#### 2. Mejorar Relaciones
- ✅ `staff_id` en `users` debe ser requerido para usuarios internos
- ✅ Validar que `user.email` coincida con `staff.email` cuando existe `staff_id`
- ✅ Agregar índices para mejorar rendimiento

#### 3. Flujo de Creación Unificado
- ✅ Crear Staff y User en una sola operación
- ✅ Opción de crear solo Staff (sin acceso al sistema)
- ✅ Opción de crear User para Staff existente

## 📋 Plan de Implementación

### Fase 1: Preparación y Análisis (1-2 días)
- [ ] Documentar todos los lugares donde se usa `staff.role`
- [ ] Identificar dependencias de `user.name`
- [ ] Crear script de migración de datos
- [ ] Backup de base de datos

### Fase 2: Migración de Base de Datos (2-3 días)
- [ ] Crear migración para eliminar `role` de `staff`
- [ ] Crear migración para eliminar `name` de `users`
- [ ] Migrar datos existentes:
  - Asignar roles de `staff.role` a `user.roles` donde exista User
  - Sincronizar `user.name` con `staff.name` antes de eliminar
- [ ] Agregar validaciones y constraints

### Fase 3: Actualización de Modelos (1 día)
- [ ] Actualizar modelo `Staff`:
  - Remover `role` de fillable
  - Agregar método `getRoleAttribute()` que obtenga de User
  - Agregar scope `withUserRole()`
- [ ] Actualizar modelo `User`:
  - Remover `name` de fillable
  - Agregar accessor `getNameAttribute()` que obtenga de Staff
  - Agregar validación en mutator de `email`

### Fase 4: Actualización de Controladores (2-3 días)
- [ ] `StaffController`:
  - Remover validación de `role`
  - Agregar opción de crear User junto con Staff
  - Actualizar métodos para usar roles de User
- [ ] `UserController`:
  - Actualizar para usar `staff.name` en lugar de `user.name`
  - Validar que email coincida con Staff.email
  - Mejorar flujo de creación

### Fase 5: Actualización de Frontend (3-4 días)
- [ ] `staff/index.tsx`:
  - Obtener roles desde `staff.user.roles` en lugar de `staff.role`
  - Mostrar indicador si Staff tiene User o no
  - Agregar botón "Crear Usuario" para Staff sin User
- [ ] `staff/components/CreateStaffDialog.tsx`:
  - Remover campo `role`
  - Agregar opción "Crear cuenta de usuario" con checkbox
  - Si se marca, mostrar campos de User (email, password, rol)
- [ ] `staff/components/EditStaffDialog.tsx`:
  - Remover campo `role`
  - Mostrar información de User si existe
  - Agregar botón para crear User si no existe
- [ ] `users/index.tsx`:
  - Mostrar `staff.name` en lugar de `user.name`
  - Filtrar por roles de User, no de Staff
- [ ] `users/components/CreateUserDialog.tsx`:
  - Validar que email coincida con Staff.email
  - Pre-llenar email desde Staff seleccionado

### Fase 6: Actualización de Consultas y Filtros (2 días)
- [ ] Buscar y actualizar todas las consultas que usan `staff.role`
- [ ] Actualizar filtros para usar `user.roles` en lugar de `staff.role`
- [ ] Actualizar scopes y métodos de búsqueda

### Fase 7: Testing y Validación (2-3 días)
- [ ] Probar creación de Staff con User
- [ ] Probar creación de Staff sin User
- [ ] Probar creación de User para Staff existente
- [ ] Validar que filtros por rol funcionen correctamente
- [ ] Validar que no haya datos duplicados o inconsistentes
- [ ] Probar migración de datos existentes

### Fase 8: Documentación y Limpieza (1 día)
- [ ] Actualizar documentación de API
- [ ] Actualizar comentarios en código
- [ ] Remover código legacy/comentado
- [ ] Crear guía de uso para desarrolladores

## 🔄 Flujos de Trabajo Propuestos

### Flujo 1: Crear Empleado con Acceso al Sistema
```
1. Usuario completa formulario de Staff:
   - Información personal
   - Información laboral
   - Información de nómina
   - ✅ Marca "Crear cuenta de usuario"

2. Sistema muestra campos adicionales:
   - Email (pre-llenado desde Staff.email)
   - Password
   - Rol

3. Sistema crea:
   - Staff en tabla `staff`
   - User en tabla `users` vinculado a Staff
   - Asigna rol a User

4. Resultado:
   - Empleado creado con acceso al sistema
```

### Flujo 2: Crear Empleado sin Acceso al Sistema
```
1. Usuario completa formulario de Staff:
   - Información personal
   - Información laboral
   - Información de nómina
   - ❌ NO marca "Crear cuenta de usuario"

2. Sistema crea:
   - Solo Staff en tabla `staff`

3. Resultado:
   - Empleado creado sin acceso al sistema
   - Puede crear User después desde página de Usuarios
```

### Flujo 3: Crear Usuario para Empleado Existente
```
1. Usuario va a página de Usuarios
2. Selecciona "Crear Usuario"
3. Selecciona Staff sin User de la lista
4. Completa:
   - Email (pre-llenado desde Staff.email)
   - Password
   - Rol

5. Sistema crea:
   - User vinculado a Staff existente
   - Asigna rol

6. Resultado:
   - Usuario creado para empleado existente
```

## 📊 Beneficios de la Propuesta

1. **Claridad**: Separación clara entre información de empleado y credenciales
2. **Consistencia**: Single source of truth para datos
3. **Flexibilidad**: Empleados pueden existir sin acceso al sistema
4. **Mantenibilidad**: Menos duplicación, más fácil de mantener
5. **Escalabilidad**: Fácil agregar nuevos campos sin afectar la otra entidad
6. **Seguridad**: Mejor control de acceso y permisos

## ⚠️ Consideraciones

1. **Migración de Datos**: Necesita script cuidadoso para migrar datos existentes
2. **Compatibilidad**: Algunos lugares del código pueden depender de `staff.role`
3. **Testing**: Requiere testing exhaustivo para asegurar que nada se rompa
4. **Rollback**: Plan de rollback en caso de problemas

## 🎯 Métricas de Éxito

- ✅ Eliminación completa de duplicación de datos
- ✅ Todos los roles gestionados desde User.roles
- ✅ Flujo de creación unificado funcionando
- ✅ Sin errores en producción después de migración
- ✅ Mejora en rendimiento de consultas

