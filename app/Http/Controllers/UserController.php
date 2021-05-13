<?php

namespace App\Http\Controllers;

use App\Models\Drink;
use App\Models\ConsumedDrink;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
     * Return the logged on user
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved user',
            'user' => auth()->user()
        ]);
    }

    public function consume(Request $request): JsonResponse
    {
        // Find user
        $user = auth()->user();

        // Find drink
        $drink = Drink::find($request->drink_id);
        if (is_null($drink))
            return response()->json([
                'status' => 'error',
                'message' => 'Could not find drink with id '.$request->drink_id
            ]);


        // Test is consumption doesn't exceed safe level
        $safeLevel = 500;
        $caffeineConsumed = $user->getCaffeineConsumed();
        if ($caffeineConsumed + ($request->servings * $drink->caffeine_per_serving) > $safeLevel) {
            return response()->json([
                'status' => 'error',
                'message' => 'This drink would exceed the safe limit of '.$safeLevel.' mg'
            ]);
        }

        // Register drink consumption
        try {
            $consumedDrink = new ConsumedDrink();
            $consumedDrink->user()->associate($user);
            $consumedDrink->drink()->associate($drink);
            $consumedDrink->servings = $request->servings;
            $consumedDrink->save();

            // Return updated consumedDrinks
            return $this->consumedDrinks();
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not consume drink ('.$e->getMessage().')'
            ]);
        }

    }

    public function consumedDrinks(): JsonResponse
    {
        // Find user
        $user = auth()->user();

        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved consumed drinks',
            'consumedDrinks' => $user->consumedDrinks()->with('drink')->get()
        ]);
    }

    public function reset(): JsonResponse
    {
        // Find user
        $user = auth()->user();
        try {
            $user->consumedDrinks()->delete();
            // Return updated consumedDrinks
            return $this->consumedDrinks();
        }
        catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not reset consumption ('.$e->getMessage().')'
            ]);
        }
    }

}
