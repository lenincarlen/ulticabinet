-- Script SQL para asignar técnicos a órdenes de servicio
-- Ejecutar desde la línea de comandos: sqlite3 database/database.sqlite < database/scripts/assign_technicians.sql

-- Primero, veamos los técnicos disponibles
SELECT 'Técnicos disponibles:' as info;
SELECT s.id as staff_id, s.name, s.email 
FROM staff s
INNER JOIN technicians t ON t.staff_id = s.id
WHERE t.is_active = 1 AND t.is_available = 1;

-- Ver órdenes sin técnico asignado
SELECT 'Órdenes sin técnico:' as info;
SELECT id, service_order_number, customer_name, status, assigned_to_id
FROM service_orders
WHERE assigned_to_id IS NULL OR assigned_to_id = '';

-- Asignar técnicos aleatoriamente a órdenes sin asignar
-- Obtener IDs de técnicos disponibles
-- Roberto López: f12485c6-b5b4-4048-8bfe-e45a88030842
-- Pedro Ramírez: 45160076-2a7a-401f-bb44-78015b82ad8b
-- Miguel Torres: 4cca6d2b-93ca-4caf-aa99-8637dca9d78a

-- Asignar Roberto López a las primeras órdenes sin asignar
UPDATE service_orders
SET assigned_to_id = 'f12485c6-b5b4-4048-8bfe-e45a88030842',
    attended_by_id = 'f12485c6-b5b4-4048-8bfe-e45a88030842'
WHERE assigned_to_id IS NULL OR assigned_to_id = ''
LIMIT 10;

-- Asignar Pedro Ramírez a las siguientes órdenes
UPDATE service_orders
SET assigned_to_id = '45160076-2a7a-401f-bb44-78015b82ad8b',
    attended_by_id = '45160076-2a7a-401f-bb44-78015b82ad8b'
WHERE assigned_to_id IS NULL OR assigned_to_id = ''
LIMIT 10;

-- Asignar Miguel Torres a las siguientes órdenes
UPDATE service_orders
SET assigned_to_id = '4cca6d2b-93ca-4caf-aa99-8637dca9d78a',
    attended_by_id = '4cca6d2b-93ca-4caf-aa99-8637dca9d78a'
WHERE assigned_to_id IS NULL OR assigned_to_id = ''
LIMIT 10;

-- Verificar asignaciones
SELECT 'Órdenes después de asignar:' as info;
SELECT so.id, so.service_order_number, so.customer_name, s.name as tecnico_asignado
FROM service_orders so
LEFT JOIN staff s ON s.id = so.assigned_to_id
ORDER BY so.created_at DESC
LIMIT 20;

