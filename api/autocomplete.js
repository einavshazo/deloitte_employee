export default function handler(req, res) {
    const data = [
      { ImageUrl: '/images/doctor.jpg', WorkTitle: 'Doctor', Name: 'Moshe Cohen' },
      { ImageUrl: '/images/nurse.jpg', WorkTitle: 'Nurse', Name: 'Tamar Levi' },
      { ImageUrl: '/images/engineer.jpg', WorkTitle: 'Engineer', Name: 'Einav Ben Shimshon' },
      { ImageUrl: '/images/engineer.jpg', WorkTitle: 'Engineer', Name: 'Adam Ben Shimshon' },
    ];
  
    const query = req.query.q;
    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Query too short' });
    }
  
    const filteredData = data.filter(item =>
      item.WorkTitle.toLowerCase().includes(query.toLowerCase()) ||
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
  
    res.status(200).json(filteredData);
  }