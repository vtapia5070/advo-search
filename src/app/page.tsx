'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AdvocateTable from '@/components/AdvocateTable/AdvocateTable';
import SearchForm from '@/components/SearchForm/SearchForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFetchAdvocates } from '@/hooks/useFetchAdvocates';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { advocates, isLoading, error, fetchAdvocates } =
        useFetchAdvocates(searchTerm);

    const onChange = (searchStr: string) => {
        setSearchTerm(searchStr);
        fetchAdvocates();
        console.log('filtering advocates...');
    };

    const onClick = () => {
        setSearchTerm('');
    };

    return (
        <main style={{ margin: '24px' }}>
            <SearchForm
                onReset={onClick}
                onSearch={onChange}
                searchTerm={searchTerm}
            />
            {error ? (
                <Alert variant='destructive'>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <Card>
                    <CardContent className='pt-6'>
                        <AdvocateTable
                            advocates={advocates}
                            isLoading={isLoading}
                        />
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
