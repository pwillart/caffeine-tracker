<?php

namespace App\Http\Controllers;

use App\Models\Drink;
use Illuminate\Http\JsonResponse;

class DrinkController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved drinks',
            'drinks' => Drink::all()
        ]);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved drink',
            'drink' => Drink::find($id)
        ]);
    }

}
