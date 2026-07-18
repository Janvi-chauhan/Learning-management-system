<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Store Contact Form Data
     */
    public function store(Request $request)
    {
        $request->validate([

            'name' => 'required|string|max:255',

            'phone' => 'required|string|max:20',

            'email' => 'required|email',

            'message' => 'required|string'
        ]);

        $contact = Contact::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'message' => $request->message
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully',
            'data' => $contact
        ]);
    }

    /**
     * Fetch all contact queries for Admin
     */
   public function index(Request $request)
{
    $contacts = Contact::latest()
                       ->paginate(5);

    return response()->json($contacts);
}

    /**
     * Delete a contact query
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);

        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Query deleted successfully'
        ]);
    }
}

