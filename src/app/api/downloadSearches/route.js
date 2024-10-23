import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const filePath = 'public/searches.csv';
        const fileContent = await readFile(filePath, 'utf8');

        return new NextResponse(fileContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=searches.csv'
            }
        });
    } catch (error) {
        console.error('Error downloading CSV:', error);
        return NextResponse.json({ error: 'Failed to download CSV file' }, { status: 500 });
    }
}
