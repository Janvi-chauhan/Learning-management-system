<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ChatBotService;

class ChatBotController extends Controller
{
    protected ChatBotService $chatBot;

    public function __construct(ChatBotService $chatBot)
    {
        $this->chatBot = $chatBot;
    }

    /**
     * Chat API
     */
    public function chat(Request $request)
    {
        $validated = $request->validate([

            'message' => [
                'required',
                'string',
                'max:1000'
            ]

        ]);

        try {

            $reply = $this->chatBot->reply(
                $validated['message']
            );

            return response()->json([

                'success' => true,

                'reply' => $reply

            ]);

        }

        catch (\Throwable $e) {

            report($e);

            return response()->json([

                'success' => false,

                'reply' =>
                    'Sorry, something went wrong. Please try again.'

            ],500);

        }
    }
}