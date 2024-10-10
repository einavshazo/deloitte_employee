const express = require('express');
const app = express();
const port = 3001;

// Sample autocomplete data
const data = [
  { ImageUrl: '/images/doctor.jpg', WorkTitle: 'Doctor', Name: 'Moshe Cohen' },
  { ImageUrl: '/images/nurse.jpg', WorkTitle: 'Nurse', Name: 'Tamar Levi' },
  { ImageUrl: '/images/engineer.jpg', WorkTitle: 'Engineer', Name: 'Einav Ben Shimshon' },
  { ImageUrl: '/images/engineer.jpg', WorkTitle: 'Engineer', Name: 'Adam Ben Shimshon' },
];

// Autocomplete endpoint
app.get('/api/autocomplete', (req, res) => {
  const query = req.query.q;
  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Query too short' });
  }

  const filteredData = data.filter(item =>
    item.WorkTitle.toLowerCase().includes(query.toLowerCase()) ||
    item.Name.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});