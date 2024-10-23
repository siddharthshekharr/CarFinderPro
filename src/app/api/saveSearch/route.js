import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const searchData = await req.json();
        const filePath = 'public/searches.csv';
        const headers = Object.keys(searchData).join(',') + '\n';
        const csvLine = Object.values(searchData).join(',') + '\n';

        let fileContent = '';
        try {
            // Try to read the existing file content
            fileContent = await readFile(filePath, 'utf8');
        } catch (error) {
            // If the file doesn't exist, fileContent will remain an empty string
        }

        // If the file is empty or doesn't exist, add headers
        if (!fileContent.trim()) {
            fileContent = headers;
        }

        // Append the new data
        fileContent += csvLine;

        // Write the updated content back to the file
        await writeFile(filePath, fileContent);

        return NextResponse.json({ message: 'Search data saved successfully' });
    } catch (error) {
        console.error('Error saving search data:', error);
        return NextResponse.json({ error: 'Failed to save search data' }, { status: 500 });
    }
}