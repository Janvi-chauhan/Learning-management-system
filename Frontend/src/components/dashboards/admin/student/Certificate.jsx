import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../../../services/api";

export default function Certificate() {

    const { id } = useParams();

    const [certificate, setCertificate] = useState(null);

    useEffect(() => {

        fetchCertificate();

    }, []);

    const fetchCertificate = async () => {

        try {

            const res = await api.get(

                `/certificate/${id}`

            );

            setCertificate(

                res.data.data

            );

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!certificate)

        return (

            <div className="text-center mt-20">

                Loading...

            </div>

        );

    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

            <div className="bg-white shadow-xl rounded-xl p-16 w-full max-w-5xl border-8 border-indigo-600">

                <h1 className="text-5xl font-bold text-center">

                    Certificate of Completion

                </h1>

                <p className="text-center mt-10 text-xl">

                    This is proudly presented to

                </p>

                <h2 className="text-4xl font-bold text-center mt-5 text-indigo-700">

                    {certificate.student.user.name}

                </h2>

                <p className="text-center mt-10 text-xl">

                    For successfully completing

                </p>

                <h2 className="text-3xl font-bold text-center mt-5">

                    {certificate.course.title}

                </h2>

                <div className="flex justify-between mt-20">

                    <div>

                        <p className="font-semibold">

                            Certificate No.

                        </p>

                        <p>

                            {certificate.certificate_no}

                        </p>

                    </div>

                    <div>

                        <p className="font-semibold">

                            Date

                        </p>

                        <p>

                            {certificate.issued_at}

                        </p>

                    </div>

                </div>

                <div className="text-center mt-16">

                    <button

                        onClick={() => window.print()}

                        className="bg-indigo-600 text-white px-8 py-3 rounded-lg"

                    >

                        Download PDF

                    </button>

                </div>

            </div>

        </div>

    );

}