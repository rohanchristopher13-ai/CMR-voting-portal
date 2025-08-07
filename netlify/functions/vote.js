import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const { studentId, candidate, position } = JSON.parse(event.body);

  // Check if the student has already voted
  const { data: existingVote, error: fetchError } = await supabase
    .from('votes')
    .select('*')
    .eq('student_id', studentId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error checking existing vote' }),
    };
  }

  if (existingVote) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'You have already voted.' }),
    };
  }

  // Insert the new vote
  const { error: insertError } = await supabase.from('votes').insert([
    { student_id: studentId, candidate, position },
  ]);

  if (insertError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving your vote.' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Vote submitted successfully!' }),
  };
};
