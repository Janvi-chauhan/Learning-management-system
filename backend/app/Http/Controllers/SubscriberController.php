<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SubscriberService;

class SubscriberController extends Controller
{
    protected $subscriberService;

    public function __construct(SubscriberService $subscriberService)
    {
        $this->subscriberService = $subscriberService;
    }

    /**
     * Save new subscriber
     */
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        if (
            $this->subscriberService
                ->alreadySubscribed($request->email)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Email is already subscribed.'
            ], 409);
        }

        $subscriber = $this->subscriberService
            ->subscribe($request->email);

        return response()->json([
            'success' => true,
            'message' => 'Subscribed successfully.',
            'subscriber' => $subscriber
        ]);
    }

    /**
     * Get all subscribers
     */
    public function index()
    {
        return response()->json(
            $this->subscriberService
                ->getAllSubscribers()
        );
    }

    /**
     * Delete subscriber
     */
    public function destroy($id)
    {
        $deleted = $this->subscriberService
            ->deleteSubscriber($id);

        if (!$deleted) {

            return response()->json([
                'success' => false,
                'message' => 'Subscriber not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Subscriber deleted successfully.'
        ]);
    }
}