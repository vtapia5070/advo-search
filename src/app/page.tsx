'use client';

import { useEffect, useState } from 'react';
import { Advocate } from '@/types/advocate';
import AdvocateTable from '@/components/AdvocateTable/AdvocateTable';
import SearchForm from '@/components/SearchForm/SearchForm';

export default function Home() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

    useEffect(() => {
        console.log('fetching advocates...');
        fetch('/api/advocates').then((response) => {
            response.json().then((jsonResponse) => {
                setAdvocates(jsonResponse.data);
                setFilteredAdvocates(jsonResponse.data);
            });
        });
    }, []);

    const onChange = (searchStr: string) => {
        setSearchTerm(searchStr);
        // todo: fix reset on empty string
        console.log('filtering advocates...');
        const filteredAdvocates = advocates.filter((advocate) => {
            return (
                advocate.firstName.includes(searchTerm) ||
                advocate.lastName.includes(searchTerm) ||
                advocate.city.includes(searchTerm) ||
                advocate.degree.includes(searchTerm) ||
                advocate.specialties.includes(searchTerm) ||
                advocate.yearsOfExperience.toString().includes(searchTerm) ||
                advocate.phoneNumber.toString().includes(searchTerm)
            );
        });

        setFilteredAdvocates(filteredAdvocates);
    };

    const onClick = () => {
        console.log(advocates);
        setFilteredAdvocates(advocates);
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
                <SearchForm onReset={onClick} onSearch={onChange} />
            </div>
            <br />
            <br />
            <AdvocateTable advocates={filteredAdvocates} />
        </main>
    );
}
