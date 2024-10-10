export async function fetchAutocompleteResults(query) {
    const response = await fetch(`/api/autocomplete?q=${query}`);
    if (!response.ok) {
      throw new Error('Error fetching autocomplete results');
    }
    return response.json();
  }