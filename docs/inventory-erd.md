# Diagrama ERD - Sistema de Inventario y Facturación

## Diagrama Mermaid

```mermaid
erDiagram
    %% Catálogo Base
    INVENTORY_CATEGORIES ||--o{ INVENTORY_PRODUCTS : "tiene"
    INVENTORY_BRANDS ||--o{ INVENTORY_PRODUCTS : "tiene"
    INVENTORY_SUPPLIERS ||--o{ INVENTORY_PURCHASES : "provee"
    INVENTORY_WAREHOUSES ||--o{ INVENTORY_STOCKS : "almacena"
    INVENTORY_WAREHOUSES ||--o{ INVENTORY_INVOICES : "vende_desde"
    INVENTORY_WAREHOUSES ||--o{ INVENTORY_TRANSFERS : "origen"
    INVENTORY_WAREHOUSES ||--o{ INVENTORY_TRANSFERS : "destino"

    %% Productos y Lotes
    INVENTORY_PRODUCTS ||--o{ INVENTORY_LOTS : "tiene"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_SERIES : "tiene"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_STOCKS : "tiene"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_MOVEMENTS : "mueve"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_INVOICE_ITEMS : "factura"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_PURCHASE_ITEMS : "compra"
    INVENTORY_PRODUCTS ||--o{ SERVICE_ORDER_PARTS : "usa_en"
    INVENTORY_LOTS ||--o{ INVENTORY_SERIES : "contiene"
    INVENTORY_LOTS ||--o{ INVENTORY_MOVEMENTS : "en"
    INVENTORY_LOTS ||--o{ INVENTORY_INVOICE_ITEMS : "en"
    INVENTORY_LOTS ||--o{ INVENTORY_PURCHASE_ITEMS : "en"

    %% Inventario
    INVENTORY_STOCKS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_STOCKS }o--|| INVENTORY_WAREHOUSES : "almacen"
    INVENTORY_MOVEMENTS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_MOVEMENTS }o--|| INVENTORY_WAREHOUSES : "almacen"
    INVENTORY_MOVEMENTS }o--o| INVENTORY_LOTS : "lote"
    INVENTORY_MOVEMENTS }o--o| USERS : "usuario"

    %% Facturación
    CUSTOMERS ||--o{ INVENTORY_INVOICES : "compra"
    INVENTORY_INVOICES ||--o{ INVENTORY_INVOICE_ITEMS : "contiene"
    INVENTORY_INVOICES ||--o{ INVENTORY_PAYMENTS : "paga"
    INVENTORY_INVOICES ||--o{ INVENTORY_RETURNS : "devuelve"
    INVENTORY_INVOICES }o--o| SERVICE_ORDERS : "genera_desde"
    INVENTORY_INVOICES }o--|| INVENTORY_WAREHOUSES : "almacen"
    INVENTORY_INVOICE_ITEMS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_INVOICE_ITEMS }o--o| INVENTORY_LOTS : "lote"

    %% Compras
    INVENTORY_SUPPLIERS ||--o{ INVENTORY_PURCHASES : "provee"
    INVENTORY_PURCHASES ||--o{ INVENTORY_PURCHASE_ITEMS : "contiene"
    INVENTORY_PURCHASE_ITEMS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_PURCHASE_ITEMS }o--o| INVENTORY_LOTS : "lote"

    %% Transferencias
    INVENTORY_TRANSFERS ||--o{ INVENTORY_TRANSFER_ITEMS : "contiene"
    INVENTORY_TRANSFER_ITEMS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_TRANSFER_ITEMS }o--o| INVENTORY_LOTS : "lote"

    %% Devoluciones
    INVENTORY_RETURNS ||--o{ INVENTORY_RETURN_ITEMS : "contiene"
    INVENTORY_RETURN_ITEMS }o--|| INVENTORY_PRODUCTS : "producto"
    INVENTORY_RETURN_ITEMS }o--o| INVENTORY_LOTS : "lote"

    %% Garantías
    CUSTOMERS ||--o{ INVENTORY_WARRANTIES : "tiene"
    INVENTORY_PRODUCTS ||--o{ INVENTORY_WARRANTIES : "cubre"
    INVENTORY_SERIES ||--o{ INVENTORY_WARRANTIES : "identifica"

    %% Órdenes de Servicio
    SERVICE_ORDERS ||--o{ SERVICE_ORDER_PARTS : "requiere"
    SERVICE_ORDER_PARTS }o--o| INVENTORY_PRODUCTS : "producto"
    SERVICE_ORDER_PARTS }o--o| INVENTORY_LOTS : "lote"

    %% Auditoría
    USERS ||--o{ INVENTORY_AUDITS : "realiza"
    USERS ||--o{ INVENTORY_MOVEMENTS : "registra"

    %% Entidades
    INVENTORY_CATEGORIES {
        uuid id PK
        varchar name UK
        varchar description
        boolean active
        timestamp created_at
    }

    INVENTORY_BRANDS {
        uuid id PK
        varchar name UK
        varchar country_origin
        boolean active
        timestamp created_at
    }

    INVENTORY_SUPPLIERS {
        uuid id PK
        varchar name
        varchar rnc UK
        varchar phone
        varchar email
        varchar address
        boolean active
    }

    INVENTORY_WAREHOUSES {
        uuid id PK
        varchar name UK
        varchar address
        boolean active
    }

    INVENTORY_PRODUCTS {
        uuid id PK
        varchar name
        text description
        uuid category_id FK
        uuid brand_id FK
        varchar model
        varchar sku UK
        varchar barcode UK
        varchar unit_measure
        numeric purchase_price
        numeric sale_price
        numeric tax_percentage
        int min_stock
        boolean active
        varchar image_url
    }

    INVENTORY_LOTS {
        uuid id PK
        uuid product_id FK
        varchar lot_code
        date manufacturing_date
        date expiration_date
        int warranty_months
        boolean active
    }

    INVENTORY_SERIES {
        uuid id PK
        uuid product_id FK
        uuid lot_id FK
        varchar serial_number UK
        varchar status
    }

    INVENTORY_STOCKS {
        uuid id PK
        uuid product_id FK
        uuid warehouse_id FK
        varchar location
        int current_stock
        int reserved_stock
        timestamp last_movement_at
    }

    INVENTORY_MOVEMENTS {
        uuid id PK
        uuid product_id FK
        uuid warehouse_id FK
        uuid lot_id FK
        varchar type
        int quantity
        numeric unit_cost
        varchar reference_type
        uuid reference_id
        varchar note
        bigint user_id FK
    }

    INVENTORY_INVOICES {
        uuid id PK
        varchar number UK
        uuid customer_id FK
        uuid warehouse_id FK
        uuid service_order_id FK
        timestamp date
        varchar status
        varchar currency
        numeric subtotal
        numeric discount
        numeric taxes
        numeric total
        varchar note
    }

    INVENTORY_INVOICE_ITEMS {
        uuid id PK
        uuid invoice_id FK
        uuid product_id FK
        uuid lot_id FK
        int quantity
        numeric unit_price
        numeric discount
        numeric tax_percentage
        numeric subtotal
    }

    INVENTORY_PAYMENTS {
        uuid id PK
        uuid invoice_id FK
        varchar method
        numeric amount
        varchar reference
        timestamp date
    }

    INVENTORY_PURCHASES {
        uuid id PK
        varchar number UK
        uuid supplier_id FK
        timestamp date
        varchar status
        numeric subtotal
        numeric discount
        numeric taxes
        numeric total
        varchar note
    }

    INVENTORY_PURCHASE_ITEMS {
        uuid id PK
        uuid purchase_id FK
        uuid product_id FK
        uuid lot_id FK
        int quantity
        numeric unit_cost
        numeric tax_percentage
        numeric subtotal
    }

    INVENTORY_TRANSFERS {
        uuid id PK
        uuid warehouse_origin_id FK
        uuid warehouse_destination_id FK
        varchar status
        timestamp date
        varchar note
    }

    INVENTORY_TRANSFER_ITEMS {
        uuid id PK
        uuid transfer_id FK
        uuid product_id FK
        uuid lot_id FK
        int quantity
    }

    INVENTORY_RETURNS {
        uuid id PK
        uuid invoice_id FK
        timestamp date
        varchar reason
        varchar note
    }

    INVENTORY_RETURN_ITEMS {
        uuid id PK
        uuid return_id FK
        uuid product_id FK
        uuid lot_id FK
        int quantity
    }

    INVENTORY_WARRANTIES {
        uuid id PK
        uuid customer_id FK
        uuid product_id FK
        uuid series_id FK
        date start_date
        date end_date
        varchar status
        varchar note
    }

    SERVICE_ORDER_PARTS {
        uuid id PK
        uuid service_order_id FK
        uuid product_id FK
        uuid lot_id FK
        varchar part_name
        text part_description
        int quantity
        numeric unit_price
    }

    INVENTORY_AUDITS {
        uuid id PK
        varchar entity
        uuid entity_id
        varchar action
        jsonb previous_data
        jsonb new_data
        bigint user_id FK
        timestamp created_at
    }

    INVENTORY_TAXES {
        uuid id PK
        varchar name
        numeric percentage
        boolean active
    }

    CUSTOMERS {
        uuid id PK
        varchar name
        varchar phone
        varchar email
        varchar address
    }

    SERVICE_ORDERS {
        uuid id PK
        varchar service_order_number
        uuid customer_id FK
        uuid assigned_to_id FK
    }

    USERS {
        bigint id PK
        varchar email UK
    }
```

## Descripción de Relaciones Clave

### Flujo de Venta
1. **Cliente** → **Factura** (`inventory_invoices`)
2. **Factura** → **Items** (`inventory_invoice_items`)
3. **Items** → **Productos** (`inventory_products`)
4. **Movimiento de Inventario** (tipo: `salida`) se genera automáticamente
5. **Stock** se actualiza (`current_stock` disminuye)

### Flujo de Compra
1. **Proveedor** → **Compra** (`inventory_purchases`)
2. **Compra** → **Items** (`inventory_purchase_items`)
3. **Lote** se crea si aplica (`inventory_lots`)
4. **Movimiento de Inventario** (tipo: `entrada`) se genera
5. **Stock** se actualiza (`current_stock` aumenta)

### Integración con Service Orders
- Las piezas agregadas por técnicos se almacenan en `service_order_parts`
- Al facturar, se crea `inventory_invoice` vinculada a `service_order_id`
- Los items de factura pueden referenciar productos del inventario

