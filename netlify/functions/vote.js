const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function(event) {
  const { studentId, candidate } = JSON.parse(event.body);

  if (!studentId || !candidate) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing student ID or candidate.' }),
    };
  }

  const { data: existing } = await supabase
    .from('votes')
    .select('id')
    .eq('student_id', studentId);

  if (existing.length > 0) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'You have already voted.' }),
    };
  }

  const { error } = await supabase
    .from('votes')
    .insert([{ student_id: studentId, candidate }]);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Voting failed.' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Vote successfully submitted.' }),
  };
};