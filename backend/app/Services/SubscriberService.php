<?php

namespace App\Services;

use App\Models\Subscriber;

class SubscriberService
{
    /**
     * Get all subscribers
     */
    public function getAllSubscribers()
    {
        return Subscriber::latest()->get();
    }

    /**
     * Add new subscriber
     */
    public function subscribe(string $email)
    {
        return Subscriber::firstOrCreate([
            'email' => strtolower(trim($email))
        ]);
    }

    /**
     * Check if already subscribed
     */
    public function alreadySubscribed(string $email): bool
    {
        return Subscriber::where(
            'email',
            strtolower(trim($email))
        )->exists();
    }

    /**
     * Delete subscriber
     */
    public function deleteSubscriber(int $id): bool
    {
        $subscriber = Subscriber::find($id);

        if (!$subscriber) {
            return false;
        }

        $subscriber->delete();

        return true;
    }

    /**
     * Total subscribers
     */
    public function totalSubscribers(): int
    {
        return Subscriber::count();
    }
}