import express from 'express';
import csvParser from 'csv-parser';
import { createReadStream } from 'fs';

const app = express();


app.get('/api/csv-data', (req, res) => {
    const csvFilePath = 'user_data.csv'; 
    const results = [];

    createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => {
            results.push(data);
        })
        .on('end', () => {
            res.json(results); 
        })
        .on('error', (error) => {
            console.error('Error parsing CSV:', error);
            res.status(500).send('Internal Server Error');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
