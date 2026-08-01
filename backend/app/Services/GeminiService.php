<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class GeminiService
{
    /**
     * Gemini Model
     */
    private string $model = 'gemini-2.5-flash';

    /**
     * Generate AI Response
     */
    public function generateResponse(string $prompt): string
    {
        $apiKey = env('GEMINI_API_KEY');

        if (!$apiKey) {
            throw new Exception("Gemini API Key not found.");
        }

        $url =
            "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent?key={$apiKey}";

        $response = Http::timeout(60)
            ->acceptJson()
            ->post($url, [

                "contents" => [
                    [
                        "parts" => [
                            [
                                "text" => $prompt
                            ]
                        ]
                    ]
                ]

            ]);

        if (!$response->successful()) {

            throw new Exception(
                "Gemini API Error : " . $response->body()
            );
        }

        return data_get(
            $response->json(),
            "candidates.0.content.parts.0.text",
            "Sorry, I couldn't generate a response."
        );
    }
}