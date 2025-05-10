'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Advocate {
    id: string;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: string;
    phoneNumber: string;
}

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

    const onChange = (e: any) => {
        setSearchTerm(e.target.value);

        console.log('filtering advocates...');
        const filteredAdvocates = advocates.filter((advocate) => {
            return (
                advocate.firstName.includes(searchTerm) ||
                advocate.lastName.includes(searchTerm) ||
                advocate.city.includes(searchTerm) ||
                advocate.degree.includes(searchTerm) ||
                advocate.specialties.includes(searchTerm) ||
                advocate.yearsOfExperience.includes(searchTerm) ||
                advocate.phoneNumber.includes(searchTerm)
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
                <form className='grid grid-cols-12 gap-4'>
                    <Input
                        type='text'
                        className='col-span-10'
                        placeholder='Search for advocate'
                    />
                    <Button
                        variant='secondary'
                        className='col-span-2'
                        onClick={onClick}
                    >
                        Reset Search
                    </Button>
                </form>
            </div>
            <br />
            <br />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Degree</TableHead>
                        <TableHead>Specialties</TableHead>
                        <TableHead>Years of Experience</TableHead>
                        <TableHead>Phone Number</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAdvocates.map((advocate, index) => {
                        // TODO make sure id is set and unique
                        return (
                            <TableRow key={`${advocate.id}_${index}`}>
                                <TableCell>{advocate.firstName}</TableCell>
                                <TableCell>{advocate.lastName}</TableCell>
                                <TableCell>{advocate.city}</TableCell>
                                <TableCell>{advocate.degree}</TableCell>
                                <TableCell>
                                    {advocate.specialties.map((s) => (
                                        <div>{s}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {advocate.yearsOfExperience}
                                </TableCell>
                                <TableCell>{advocate.phoneNumber}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </main>
    );
}
