import { NextRequest, NextResponse } from 'next/server';
import { ilike, or } from 'drizzle-orm';
import db from '../../../db';
import { advocates } from '../../../db/schema';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('q')?.toLowerCase() || '';

        let query = db.select().from(advocates);
        const data = searchTerm
            ? await query.where(
                  or(
                      ilike(advocates.firstName, `%${searchTerm}%`),
                      ilike(advocates.lastName, `%${searchTerm}%`),
                      ilike(advocates.city, `%${searchTerm}%`),
                      ilike(advocates.degree, `%${searchTerm}%`)
                  )
              )
            : await query;

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
