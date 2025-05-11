'use client';

import { useEffect, useState } from 'react';
import { Advocate } from '@/types/advocate';
import AdvocateTable from '@/components/AdvocateTable/AdvocateTable';
import SearchForm from '@/components/SearchForm/SearchForm';

export default function Home() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const fetchAdvocates = async () => {
        const url = searchTerm
            ? `/api/advocates?q=${encodeURIComponent(searchTerm)}`
            : '/api/advocates';

        const response = await fetch(url);
        response.json().then((jsonResponse) => {
            console.log('total advocates', jsonResponse.meta.total);
            setAdvocates(jsonResponse.data);
        });
    };

    useEffect(() => {
        console.log('fetching advocates...');

        fetchAdvocates();
    }, [searchTerm]);

    const onChange = (searchStr: string) => {
        setSearchTerm(searchStr);
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
