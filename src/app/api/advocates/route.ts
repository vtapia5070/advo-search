import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

export async function GET(request: NextRequest) {
    try {
        // Uncomment this line to use a database
        // const data = await db.select().from(advocates);

        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('q')?.toLowerCase() || '';

        // For now, using mock data
        let data = advocateData;

        // Apply search filter if search term is provided
        if (searchTerm) {
            data = data.filter(
                (advocate) =>
                    advocate.firstName.toLowerCase().includes(searchTerm) ||
                    advocate.lastName.toLowerCase().includes(searchTerm) ||
                    advocate.city.toLowerCase().includes(searchTerm) ||
                    advocate.degree.toLowerCase().includes(searchTerm) ||
                    advocate.specialties.some((s) =>
                        s.toLowerCase().includes(searchTerm)
                    ) ||
                    advocate.yearsOfExperience.toString().includes(searchTerm)
            );
        }

        return NextResponse.json(
            {
                success: true,
                data,
                meta: {
                    total: data.length,
                    ...(searchTerm && { searchTerm }),
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching advocates:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch advocates',
            },
            { status: 500 }
        );
    }
}
