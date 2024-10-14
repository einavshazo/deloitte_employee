export async function fetchAutocompleteResults(query) {
    const response = await fetch(`deloitte-employee-lz5ifbhbi-einavs-projects.vercel.app/api/autocomplete?q=${query}`);
    if (!response.ok) {
      throw new Error('Error fetching autocomplete results');
    }
    return response.json();
  }