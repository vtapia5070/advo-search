'use client';

import { useState } from 'react';
import AdvocateTable from '@/components/AdvocateTable/AdvocateTable';
import SearchForm from '@/components/SearchForm/SearchForm';
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
            <h1>Solace Advocates</h1>
            <br />
            <br />
            <div>
                <p>Search</p>
                <p>
                    Searching for: <span id='search-term'>{searchTerm}</span>
                </p>
                <SearchForm
                    onReset={onClick}
                    onSearch={onChange}
                    searchTerm={searchTerm}
                />
            </div>
            <br />
            <br />
            <AdvocateTable advocates={advocates} />
        </main>
    );
}
