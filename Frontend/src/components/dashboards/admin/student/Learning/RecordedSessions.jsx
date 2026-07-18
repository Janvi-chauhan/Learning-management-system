export default function RecordedSessions(){
    const deleteLesson=async(id)=>{

await api.delete(
`/teacher/lesson/${id}`
);

fetchCourse();

};

return(

<div className="bg-white rounded-xl shadow p-5 mt-6">

<h2 className="font-bold mb-4">

Recorded Sessions

</h2>

<div className="space-y-4">

<div className="border rounded-xl p-4">

<h3>

Python Basics Live Class

</h3>

<p>

Duration :

1 hr

</p>

<button

className="mt-3 bg-blue-600 text-white px-5 py-2 rounded"

>

Watch Recording

</button>
<button
onClick={()=>deleteLesson(lesson.id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>

Delete

</button>

</div>

</div>

</div>

);

}