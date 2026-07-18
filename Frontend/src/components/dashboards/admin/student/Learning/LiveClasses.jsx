import { Video } from "lucide-react";

export default function LiveClasses(){

return(

<div className="bg-white rounded-xl shadow p-5 mt-6">

<div className="flex justify-between">

<h2 className="font-bold">

Upcoming Live Classes

</h2>

<Video/>

</div>

<div className="mt-4">

<div className="border rounded-xl p-4">

<h3>

Python Live Revision

</h3>

<p>

Date :

12 July

</p>

<p>

Time :

6:00 PM

</p>

<button

className="mt-3 bg-red-600 text-white px-5 py-2 rounded"

>

Join Live

</button>

</div>

</div>

</div>

);

}