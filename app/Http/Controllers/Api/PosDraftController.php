<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PosDraft;
use App\Models\CashRegisterSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PosDraftController extends Controller
{
    /**
     * Get all drafts for the current user's active session
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get current active session using cashier_id
        $session = CashRegisterSession::where('cashier_id', $user->id)
            ->where('is_open', true)
            ->first();

        if (!$session) {
            return response()->json([
                'drafts' => []
            ]);
        }

        $drafts = PosDraft::where('session_id', $session->id)
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'drafts' => $drafts
        ]);
    }

    /**
     * Store a new draft
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        // Get current active session - using cashier_id (not user_id)
        $session = CashRegisterSession::where('cashier_id', $user->id)
            ->where('is_open', true)
            ->first();

        if (!$session) {
            \Log::info('No session found for cashier_id: ' . $user->id);
            
            // Try to find the most recent session for this user
            $session = CashRegisterSession::where('cashier_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->first();
            
            if ($session) {
                \Log::info('Found session but is_open = ' . ($session->is_open ? 'true' : 'false'));
            } else {
                \Log::info('No sessions found at all for this cashier');
            }
        }

        if (!$session || !$session->is_open) {
            return response()->json([
                'success' => false,
                'message' => 'No hay una sesión activa. Debe abrir una sesión de caja primero.',
                'debug' => [
                    'user_id' => $user->id,
                    'session_found' => $session ? true : false,
                    'session_is_open' => $session ? $session->is_open : null,
                ]
            ], 400);
        }

        try {
            $validated = $request->validate([
                'draft_name' => 'required|string|max:255',
                'cart_items' => 'required|array',
                'customer_name' => 'nullable|string',
                'customer_id' => 'nullable|string', // Changed from uuid to string for flexibility
                'discount' => 'nullable|numeric|min:0|max:100',
                'technician_commission' => 'nullable|numeric|min:0',
                'operator_commission' => 'nullable|numeric|min:0',
                'notes' => 'nullable|string',
                'subtotal' => 'required|numeric|min:0',
                'total' => 'required|numeric|min:0',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 400);
        }

        try {
            $draft = PosDraft::create([
                'session_id' => $session->id,
                'user_id' => $user->id,
                'draft_name' => $validated['draft_name'],
                'cart_items' => $validated['cart_items'],
                'customer_name' => $validated['customer_name'] ?? null,
                'customer_id' => $validated['customer_id'] ?? null,
                'discount' => $validated['discount'] ?? 0,
                'technician_commission' => $validated['technician_commission'] ?? 0,
                'operator_commission' => $validated['operator_commission'] ?? 0,
                'notes' => $validated['notes'] ?? null,
                'subtotal' => $validated['subtotal'],
                'total' => $validated['total'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Borrador guardado exitosamente',
                'draft' => $draft
            ]);
        } catch (\Exception $e) {
            \Log::error('Error creating draft: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar el borrador: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific draft
     */
    public function show($id)
    {
        $user = Auth::user();
        
        $draft = PosDraft::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$draft) {
            return response()->json([
                'success' => false,
                'message' => 'Borrador no encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'draft' => $draft
        ]);
    }

    /**
     * Delete a draft
     */
    public function destroy($id)
    {
        $user = Auth::user();
        
        $draft = PosDraft::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$draft) {
            return response()->json([
                'success' => false,
                'message' => 'Borrador no encontrado'
            ], 404);
        }

        $draft->delete();

        return response()->json([
            'success' => true,
            'message' => 'Borrador eliminado exitosamente'
        ]);
    }
}
