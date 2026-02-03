<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InventoryProduct;
use App\Models\InventoryWarehouse;
use App\Models\InventoryStock;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Crea productos de piezas de electrodomésticos con imágenes
     */
    public function run(): void
    {
        $warehouse = InventoryWarehouse::where('active', true)->first();

        // Productos de piezas de electrodomésticos
        $products = [
            // Motores
            [
                'name' => 'Motor de Lavadora LG 1/2 HP',
                'description' => 'Motor universal para lavadora LG, 1/2 HP, 110V. Compatible con modelos WM2016CW, WM2077CW, WM2277HW.',
                'category' => 'Motores',
                'brand' => 'LG',
                'model' => 'LG-MOT-500',
                'sku' => 'MOT-LG-500',
                'barcode' => '8801234567890',
                'unit_measure' => 'unidad',
                'purchase_price' => 4500.00,
                'sale_price' => 6500.00,
                'tax_percentage' => 18.00,
                'min_stock' => 2,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=500&fit=crop',
                'initial_stock' => 5,
            ],
            [
                'name' => 'Motor Compresor Refrigerador Samsung',
                'description' => 'Compresor para refrigerador Samsung, 1/4 HP, R-134a. Compatible con modelos RT18M, RT21M, RS25J.',
                'category' => 'Motores',
                'brand' => 'Samsung',
                'model' => 'SAM-COMP-250',
                'sku' => 'COMP-SAM-250',
                'barcode' => '8801234567891',
                'unit_measure' => 'unidad',
                'purchase_price' => 8500.00,
                'sale_price' => 12000.00,
                'tax_percentage' => 18.00,
                'min_stock' => 1,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&h=500&fit=crop',
                'initial_stock' => 3,
            ],

            // Tarjetas Electrónicas
            [
                'name' => 'Tarjeta Control Lavadora LG',
                'description' => 'Tarjeta de control principal para lavadora LG. Controla ciclos de lavado, temperatura y velocidad. Compatible con modelos 2015-2020.',
                'category' => 'Tarjetas',
                'brand' => 'LG',
                'model' => 'LG-PCB-100',
                'sku' => 'PCB-LG-100',
                'barcode' => '8801234567892',
                'unit_measure' => 'unidad',
                'purchase_price' => 3200.00,
                'sale_price' => 5500.00,
                'tax_percentage' => 18.00,
                'min_stock' => 2,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
                'initial_stock' => 4,
            ],
            [
                'name' => 'Tarjeta Display Refrigerador Samsung',
                'description' => 'Tarjeta display digital para refrigerador Samsung. Controla temperatura y funciones especiales. LED azul.',
                'category' => 'Tarjetas',
                'brand' => 'Samsung',
                'model' => 'SAM-DISP-200',
                'sku' => 'DISP-SAM-200',
                'barcode' => '8801234567893',
                'unit_measure' => 'unidad',
                'purchase_price' => 2800.00,
                'sale_price' => 4800.00,
                'tax_percentage' => 18.00,
                'min_stock' => 2,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&h=500&fit=crop',
                'initial_stock' => 6,
            ],

            // Resistencias
            [
                'name' => 'Resistencia Secadora Whirlpool 5000W',
                'description' => 'Elemento calefactor para secadora Whirlpool, 5000W, 220V. Incluye termostato de seguridad.',
                'category' => 'Resistencias',
                'brand' => 'Whirlpool',
                'model' => 'WP-RES-5000',
                'sku' => 'RES-WP-5000',
                'barcode' => '8801234567894',
                'unit_measure' => 'unidad',
                'purchase_price' => 1800.00,
                'sale_price' => 3200.00,
                'tax_percentage' => 18.00,
                'min_stock' => 3,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
                'initial_stock' => 8,
            ],
            [
                'name' => 'Resistencia Descongelador Refrigerador',
                'description' => 'Resistencia de descongelación universal para refrigerador. 110V, 200W. Compatible con LG, Samsung, Whirlpool.',
                'category' => 'Resistencias',
                'brand' => 'Genérico',
                'model' => 'GEN-DESFR-200',
                'sku' => 'DESFR-GEN-200',
                'barcode' => '8801234567895',
                'unit_measure' => 'unidad',
                'purchase_price' => 450.00,
                'sale_price' => 950.00,
                'tax_percentage' => 18.00,
                'min_stock' => 5,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=500&fit=crop',
                'initial_stock' => 12,
            ],

            // Filtros
            [
                'name' => 'Filtro de Agua Refrigerador Samsung',
                'description' => 'Filtro de agua original Samsung HAF-CIN. Reduce cloro, sedimentos y contaminantes. Duración 6 meses.',
                'category' => 'Filtros',
                'brand' => 'Samsung',
                'model' => 'HAF-CIN',
                'sku' => 'FILT-SAM-CIN',
                'barcode' => '8801234567896',
                'unit_measure' => 'unidad',
                'purchase_price' => 1200.00,
                'sale_price' => 2200.00,
                'tax_percentage' => 18.00,
                'min_stock' => 4,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=500&h=500&fit=crop',
                'initial_stock' => 10,
            ],
            [
                'name' => 'Filtro Pelusa Lavadora LG',
                'description' => 'Filtro atrapa pelusa para lavadora LG. Malla fina de acero inoxidable. Fácil limpieza.',
                'category' => 'Filtros',
                'brand' => 'LG',
                'model' => 'LG-LINT-01',
                'sku' => 'LINT-LG-01',
                'barcode' => '8801234567897',
                'unit_measure' => 'unidad',
                'purchase_price' => 280.00,
                'sale_price' => 650.00,
                'tax_percentage' => 18.00,
                'min_stock' => 6,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500&h=500&fit=crop',
                'initial_stock' => 15,
            ],

            // Repuestos Generales
            [
                'name' => 'Termostato Universal Refrigerador',
                'description' => 'Termostato mecánico universal para refrigerador. Rango -10°C a +10°C. Compatible con mayoría de marcas.',
                'category' => 'Repuestos Generales',
                'brand' => 'Genérico',
                'model' => 'TERM-UNI-01',
                'sku' => 'TERM-GEN-01',
                'barcode' => '8801234567898',
                'unit_measure' => 'unidad',
                'purchase_price' => 650.00,
                'sale_price' => 1350.00,
                'tax_percentage' => 18.00,
                'min_stock' => 4,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=500&fit=crop',
                'initial_stock' => 10,
            ],
            [
                'name' => 'Bomba Drenaje Lavadora Universal',
                'description' => 'Bomba de drenaje universal para lavadora. 110V, 60Hz. Compatible con LG, Samsung, Whirlpool, Mabe.',
                'category' => 'Repuestos Generales',
                'brand' => 'Genérico',
                'model' => 'PUMP-UNI-01',
                'sku' => 'PUMP-GEN-01',
                'barcode' => '8801234567899',
                'unit_measure' => 'unidad',
                'purchase_price' => 850.00,
                'sale_price' => 1650.00,
                'tax_percentage' => 18.00,
                'min_stock' => 3,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
                'initial_stock' => 7,
            ],
            [
                'name' => 'Correa Lavadora Universal',
                'description' => 'Correa de transmisión universal para lavadora. Caucho reforzado. Longitud 1270mm. Compatible con múltiples modelos.',
                'category' => 'Repuestos Generales',
                'brand' => 'Genérico',
                'model' => 'BELT-UNI-1270',
                'sku' => 'BELT-GEN-1270',
                'barcode' => '8801234567800',
                'unit_measure' => 'unidad',
                'purchase_price' => 180.00,
                'sale_price' => 450.00,
                'tax_percentage' => 18.00,
                'min_stock' => 8,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
                'initial_stock' => 20,
            ],
            [
                'name' => 'Válvula Entrada Agua Lavadora',
                'description' => 'Válvula solenoide de entrada de agua para lavadora. 2 vías, 110V. Rosca estándar 3/4".',
                'category' => 'Repuestos Generales',
                'brand' => 'Genérico',
                'model' => 'VALVE-UNI-2W',
                'sku' => 'VALVE-GEN-2W',
                'barcode' => '8801234567801',
                'unit_measure' => 'unidad',
                'purchase_price' => 420.00,
                'sale_price' => 900.00,
                'tax_percentage' => 18.00,
                'min_stock' => 5,
                'active' => true,
                'image_url' => 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&h=500&fit=crop',
                'initial_stock' => 12,
            ],
        ];

        $createdCount = 0;
        $stockCount = 0;

        foreach ($products as $productData) {
            // Extraer initial_stock antes de crear el producto
            $initialStock = $productData['initial_stock'] ?? 0;
            unset($productData['initial_stock']);

            // Asegurar que tenga un ID UUID
            if (!isset($productData['id'])) {
                $productData['id'] = Str::uuid()->toString();
            }

            // Crear el producto
            $product = InventoryProduct::create($productData);
            $createdCount++;

            // Crear stock inicial si hay almacén
            if ($warehouse && $initialStock > 0) {
                InventoryStock::create([
                    'id' => Str::uuid()->toString(),
                    'product_id' => $product->id,
                    'warehouse_id' => $warehouse->id,
                    'current_stock' => $initialStock,
                    'reserved_stock' => 0,
                ]);
                $stockCount++;
            }
        }

        $this->command->info('✅ Productos de electrodomésticos creados exitosamente.');
        $this->command->info("   - Productos creados: {$createdCount}");
        $this->command->info("   - Registros de stock: {$stockCount}");
        $this->command->info('   - Categorías: Motores, Tarjetas, Resistencias, Filtros, Repuestos');
        $this->command->info('   - Marcas: LG, Samsung, Whirlpool, Genérico');
    }
}
