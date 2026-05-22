import { formatDistanceToNow } from 'date-fns';

export default function WorkoutDetails({ workout }) {
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>

      <p>
        <strong>Load (in kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className='material-symbols-outlined'>delete</span>
    </div>
  );
}
