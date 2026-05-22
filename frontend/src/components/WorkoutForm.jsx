import { useRef, useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const inputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const workout = { title, load, reps };

      const res = await fetch(`${API_URL}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields ?? []);
        return;
      }

      // reset states
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);

      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      inputRef.current.focus();
    } catch (error) {
      console.error('Failed to add workout.', error);
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={inputRef}
        className={
          emptyFields.includes('title') && title.trim() === '' ? 'error' : ''
        }
      />
      <label>Load (in kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={
          emptyFields.includes('load') && load.trim() === '' ? 'error' : ''
        }
      />
      <label>Reps:</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={
          emptyFields.includes('reps') && reps.trim() === '' ? 'error' : ''
        }
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
