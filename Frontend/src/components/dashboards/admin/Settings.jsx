import React from "react";

export default function Settings() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    return (
        <div className="bg-white rounded-3xl shadow p-8">

            <h1 className="text-3xl font-bold mb-8">
                Admin Settings
            </h1>

            <div className="space-y-6">

                <div>
                    <label className="font-semibold">
                        Name
                    </label>

                    <input
                        value={user?.name}
                        readOnly
                        className="w-full mt-2 border rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="font-semibold">
                        Email
                    </label>

                    <input
                        value={user?.email}
                        readOnly
                        className="w-full mt-2 border rounded-xl p-3"
                    />
                </div>

                <div>
                    <label className="font-semibold">
                        Role
                    </label>

                    <input
                        value={user?.role}
                        readOnly
                        className="w-full mt-2 border rounded-xl p-3"
                    />
                </div>

            </div>

        </div>
    );
}